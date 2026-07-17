(function (App) {
  let audio;

  // Helper untuk mengubah detik menjadi format "menit:detik" (contoh: 3:05)
  const time = seconds => {
    const mins = Math.floor(seconds / 60) || 0;
    const secs = String(Math.floor(seconds % 60) || 0).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  App.Music = {
    /** Initializes persistent player controls and playlist. */
    init() {
      audio = document.getElementById('audio-player');
      if (!audio) return;

      const saved = App.state.music;
      document.getElementById('music-volume').value = saved.volume;
      audio.volume = saved.volume;
      document.querySelector('[data-music-action="repeat"]').setAttribute('aria-pressed', saved.repeat);

      this.renderPlaylist();
      this.loadTrack(saved.trackIndex);

      // Event listener untuk tombol kontrol (Play, Next, Prev, Repeat)
      document.querySelector('.music-player__controls').addEventListener('click', event => {
        const action = event.target.dataset.musicAction;
        if (action === 'toggle') this.toggle();
        if (action === 'next') this.next();
        if (action === 'previous') this.previous();
        if (action === 'repeat') this.toggleRepeat();
      });

      // Event listener untuk slider progres lagu
      document.getElementById('music-progress').addEventListener('input', event => {
        if (audio.duration) {
          audio.currentTime = (audio.duration * event.target.value) / 100;
        }
      });

      // Event listener untuk slider volume
      document.getElementById('music-volume').addEventListener('input', event => {
        audio.volume = +event.target.value;
        App.state.music.volume = audio.volume;
        App.Storage.save();
      });

      // Event listener bawaan elemen audio HTML5
      audio.addEventListener('timeupdate', () => this.updateProgress());
      
      audio.addEventListener('loadedmetadata', () => {
        document.getElementById('music-duration').textContent = time(audio.duration);
      });
      
      audio.addEventListener('ended', () => {
        if (App.state.music.repeat) {
          audio.currentTime = 0;
          audio.play();
        } else {
          this.next();
        }
      });
    },

    /** Loads one playlist item without destroying player state. */
    loadTrack(index) {
      const track = App.musicTracks[index];
      if (!track) return;

      App.state.music.trackIndex = index;
      audio.src = track.src;
      document.getElementById('music-track-title').textContent = track.title;
      document.getElementById('music-track-artist').textContent = track.artist;
      
      this.renderPlaylist();
      App.Storage.save();
    },

    /** Toggles playback. */
    toggle() {
      if (audio.paused) {
        audio.play()
          .then(() => {
            App.state.musicPlaying = true;
            this.updateButton();
          })
          .catch(() => {
            App.Modal.open(
              '<h2>Musik belum tersedia</h2><p>Tambahkan file MP3 sesuai playlist di folder assets/music.</p>'
            );
          });
      } else {
        audio.pause();
        App.state.musicPlaying = false;
        this.updateButton();
      }
    },

    /** Attempts autoplay after the visitor reaches the music page. */
    autoplay() {
      if (!audio.paused || !App.musicTracks.length) return;
      
      audio.play()
        .then(() => {
          App.state.musicPlaying = true;
          this.updateButton();
        })
        .catch(() => {
          /* Browser membutuhkan gestur pengguna sebelum audio dapat berputar otomatis. */
        });
    },

    /** Moves to previous item. */
    previous() {
      const prevIndex = (App.state.music.trackIndex - 1 + App.musicTracks.length) % App.musicTracks.length;
      this.loadTrack(prevIndex);
      if (App.state.musicPlaying) this.toggle();
    },

    /** Moves to next item. */
    next() {
      const nextIndex = (App.state.music.trackIndex + 1) % App.musicTracks.length;
      this.loadTrack(nextIndex);
      if (App.state.musicPlaying) this.toggle();
    },

    /** Toggles track repeat preference. */
    toggleRepeat() {
      App.state.music.repeat = !App.state.music.repeat;
      document.querySelector('[data-music-action="repeat"]').setAttribute('aria-pressed', App.state.music.repeat);
      App.Storage.save();
    },

    /** Updates elapsed-time UI. */
    updateProgress() {
      document.getElementById('music-progress').value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      document.getElementById('music-current-time').textContent = time(audio.currentTime);
    },

    /** Renders playlist from data. */
    renderPlaylist() {
      const playlistContainer = document.getElementById('music-playlist');
      
      playlistContainer.innerHTML = App.musicTracks.map((track, index) => {
        const isCurrent = index === App.state.music.trackIndex ? 'is-current' : '';
        return `<li><button class="${isCurrent}" data-track="${index}" type="button">${track.title} — ${track.artist}</button></li>`;
      }).join('');

      document.querySelectorAll('[data-track]').forEach(button => {
        button.addEventListener('click', () => this.loadTrack(+button.dataset.track));
      });
    },

    /** Restores a hidden player on pages between dashboard visits. */
    resumeAcrossPages() {
      if (document.getElementById('dashboard-audio') || document.getElementById('audio-player')) return;
      const resume = App.Storage.get('musicResume');
      if (!resume?.isPlaying || !App.musicTracks[resume.trackIndex]) return;
      const backgroundAudio = document.createElement('audio');
      backgroundAudio.id = 'background-music-player';
      backgroundAudio.hidden = true;
      backgroundAudio.src = App.musicTracks[resume.trackIndex].src;
      backgroundAudio.volume = App.state.music.volume;
      const save = () => App.Storage.set('musicResume', { trackIndex: resume.trackIndex, currentTime: backgroundAudio.currentTime, isPlaying: !backgroundAudio.paused });
      backgroundAudio.addEventListener('loadedmetadata', () => { backgroundAudio.currentTime = resume.currentTime || 0; backgroundAudio.play().catch(() => {}); });
      backgroundAudio.addEventListener('timeupdate', save);
      backgroundAudio.addEventListener('play', save);
      backgroundAudio.addEventListener('pause', save);
      backgroundAudio.addEventListener('ended', () => { const next = (resume.trackIndex + 1) % App.musicTracks.length; App.Storage.set('musicResume', { trackIndex: next, currentTime: 0, isPlaying: true }); });
      document.addEventListener('pagehide', save, { once: true });
      document.body.append(backgroundAudio);
    },
    /** Synchronizes the play button label. */
    updateButton() {
      document.querySelector('[data-music-action="toggle"]').textContent = App.state.musicPlaying ? 'Pause' : 'Play';
    }
  };
})(window.BirthdayApp);

document.addEventListener('DOMContentLoaded', () => window.BirthdayApp.Music.resumeAcrossPages());
