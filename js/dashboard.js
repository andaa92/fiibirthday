(function (App) {
  App.Dashboard = {
    /** Sets up persistent dashboard controls and the active tab. */
    init() {
      const root = document.getElementById('dashboard-content');
      if (!root) return;
      this.initPlayer();
      document.querySelectorAll('[data-dashboard-view]').forEach(button => button.addEventListener('click', () => {
        document.querySelectorAll('[data-dashboard-view]').forEach(tab => tab.classList.toggle('is-active', tab === button));
        this.render(button.dataset.dashboardView);
      }));
      root.addEventListener('click', event => this.openCard(event));
      this.render('gallery');
    },
    /** Opens a gallery photo or a Fun Fact card in the shared modal. */
    openCard(event) {
      const photo = event.target.closest('[data-dashboard-photo]');
      const factCard = event.target.closest('[data-dashboard-fact]');
      if (photo) { const item = App.galleryItems[Number(photo.dataset.dashboardPhoto)]; App.Modal.open(`<img src="${item.src}" alt="${item.alt}"><h2>${item.caption}</h2>`); }
      if (factCard) { const fact = App.funFacts[Number(factCard.dataset.dashboardFact)]; App.Modal.open(`<img src="${fact.image}" alt="${fact.title}"><h2>${fact.title}</h2><p>${fact.description}</p>`); }
    },
    /** Initializes the compact playable music card in the dashboard header. */
    initPlayer() {
      const audio = document.getElementById('dashboard-audio');
      if (!audio) return;
      const savedResume = App.Storage.get('musicResume');
      let trackIndex = Math.min(Math.max(savedResume?.isPlaying ? savedResume.trackIndex : 0, 0), App.musicTracks.length - 1);
      let track = App.musicTracks[trackIndex];
      let lyrics = track.lyrics || App.songLyrics;
      const format = seconds => `${Math.floor(seconds / 60) || 0}:${String(Math.floor(seconds % 60) || 0).padStart(2, '0')}`;
      audio.src = track.src;
      document.getElementById('dashboard-album-cover').src = track.cover;
      document.getElementById('dashboard-track-title').textContent = track.title;
      document.getElementById('dashboard-track-artist').textContent = track.artist;
      const button = document.getElementById('dashboard-play-button');
      const progress = document.getElementById('dashboard-music-progress');
      const saveMusicPosition = () => App.Storage.set('musicResume', { trackIndex, currentTime: audio.currentTime || 0, isPlaying: !audio.paused });
      let resumeTime = savedResume?.isPlaying && savedResume.trackIndex === trackIndex ? savedResume.currentTime || 0 : 0;
      const lyricPanel = document.getElementById('dashboard-lyrics');
      const renderSpotifyLyrics = () => {
        if (!lyricPanel) return;
        const activeIndex = Math.max(0, lyrics.findIndex(line => audio.currentTime >= line.start && audio.currentTime < line.end));
        const groupStart = Math.min(Math.floor(activeIndex / 4) * 4, Math.max(0, lyrics.length - 4));
        const visibleLines = lyrics.slice(groupStart, groupStart + 4);
        lyricPanel.innerHTML = visibleLines.map((line, index) => `<p class="dashboard-lyrics__line ${groupStart + index === activeIndex ? 'is-current' : ''} ${line.text.includes('Instrumental') ? 'is-instrumental' : ''}">${line.text}</p>`).join('');
      };
      renderSpotifyLyrics();
      const controls = document.createElement('div');
      controls.className = 'dashboard-music-card__controls';
      const previousButton = document.createElement('button');
      previousButton.type = 'button';
      previousButton.className = 'dashboard-music-card__skip';
      previousButton.setAttribute('aria-label', 'Lagu sebelumnya');
      previousButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14M18 6 9 12l9 6V6Z"/></svg>';
      const nextButton = document.createElement('button');
      nextButton.type = 'button';
      nextButton.className = 'dashboard-music-card__skip';
      nextButton.setAttribute('aria-label', 'Lagu berikutnya');
      nextButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14M6 6l9 6-9 6V6Z"/></svg>';
      button.parentElement.insertBefore(controls, button);
      controls.append(previousButton, button, nextButton);
      const loadDashboardTrack = (offset, forcePlay = false) => {
        const shouldContinue = forcePlay || !audio.paused;
        trackIndex = (trackIndex + offset + App.musicTracks.length) % App.musicTracks.length;
        track = App.musicTracks[trackIndex];
        lyrics = track.lyrics || App.songLyrics;
        App.state.music.trackIndex = trackIndex;
        App.Storage.save();
        resumeTime = 0;
        audio.src = track.src;
        audio.currentTime = 0;
        audio.load();
        App.Storage.set('musicResume', { trackIndex, currentTime: 0, isPlaying: shouldContinue });
        document.getElementById('dashboard-album-cover').src = track.cover;
        document.getElementById('dashboard-track-title').textContent = track.title;
        document.getElementById('dashboard-track-artist').textContent = track.artist;
        progress.value = 0;
        renderSpotifyLyrics();
        if (shouldContinue) audio.play();
      };
      previousButton.addEventListener('click', () => loadDashboardTrack(-1));
      nextButton.addEventListener('click', () => loadDashboardTrack(1));
      button.addEventListener('click', () => {
        if (audio.paused) audio.play().then(() => { button.textContent = '❚❚'; button.setAttribute('aria-label', 'Pause'); }).catch(() => App.Modal.open('<h2>Musik belum tersedia</h2><p>Tambahkan file MP3 ke assets/music sesuai nama playlist.</p>'));
        else { audio.pause(); button.textContent = '▶'; button.setAttribute('aria-label', 'Play'); }
      });
      audio.addEventListener('timeupdate', () => { progress.value = audio.duration ? audio.currentTime / audio.duration * 100 : 0; document.getElementById('dashboard-music-current').textContent = format(audio.currentTime); document.getElementById('dashboard-music-duration').textContent = format(audio.duration); });
      audio.addEventListener('timeupdate', renderSpotifyLyrics);
      progress.addEventListener('input', () => { if (audio.duration) audio.currentTime = audio.duration * progress.value / 100; });
      progress.addEventListener('input', renderSpotifyLyrics);
      audio.addEventListener('loadedmetadata', () => { if (resumeTime > 0) audio.currentTime = Math.min(resumeTime, audio.duration || resumeTime); });
      audio.addEventListener('timeupdate', saveMusicPosition);
      audio.addEventListener('pause', saveMusicPosition);
      audio.addEventListener('play', saveMusicPosition);
      document.addEventListener('pagehide', saveMusicPosition, { once: true });
      audio.addEventListener('ended', () => loadDashboardTrack(1, true));
      audio.play().then(() => {
        App.state.musicPlaying = true;
        button.textContent = '❚❚';
        button.setAttribute('aria-label', 'Pause');
      }).catch(() => {
        /* Some browsers require one initial tap before allowing autoplay. */
      });
      audio.addEventListener('play', () => {
        App.state.musicPlaying = true;
        button.textContent = '❚❚';
        button.setAttribute('aria-label', 'Pause');
      });
      audio.addEventListener('ended', () => { button.textContent = '▶'; button.setAttribute('aria-label', 'Play'); });
    },
    /** Renders a selected menu beneath the persistent dashboard header. */
    render(view) {
      const root = document.getElementById('dashboard-content');
      if (!root) return;
      const templates = {
        gallery: () => `<div class="dashboard-content__heading"><h2>Photo Dump</h2><p>Beberapa potongan kenangan untukmu.</p></div><div class="gallery-grid">${App.galleryItems.map((item, index) => `<button class="gallery-item" type="button" data-dashboard-photo="${index}"><img src="${item.src}" alt="${item.alt}"><span>${item.caption}</span></button>`).join('')}</div>`,
        letter: () => '<div class="dashboard-content__heading"><h2>Love Letter</h2></div><article class="panel letter"><p id="dashboard-letter"></p></article><button class="letter-translate" id="letter-translate" type="button" aria-pressed="false" hidden>Translate to Indonesia</button>',
        facts: () => `<div class="dashboard-content__heading"><h2>Fun Facts</h2><p>Tekan kartu untuk membaca deskripsi lengkapnya.</p></div><div class="gallery-grid fact-gallery">${App.funFacts.map((fact, index) => `<button class="gallery-item fact-card" type="button" data-dashboard-fact="${index}"><img src="${fact.image}" alt="${fact.title}"><span><strong>${fact.title}</strong><small>${fact.description}</small></span></button>`).join('')}</div>`,
        wishes: () => '<div class="dashboard-content__heading"><h2>Wish Upon A Star</h2><p>Buka satu bintang untuk satu harapan. Bintang berikutnya akan menyala setelahnya.</p></div><section class="wish-orbit" id="wish-orbit" aria-label="Harapan dalam orbit"><div class="wish-orbit__ring wish-orbit__ring--one"></div><div class="wish-orbit__ring wish-orbit__ring--two"></div><div class="wish-orbit__moon" aria-hidden="true"><img src="assets/images/moon-realistic.png" alt=""><small>For you</small></div></section>'
      };
      root.innerHTML = templates[view]();
      if (view === 'letter') {
        const letter = document.getElementById('dashboard-letter');
        const translateButton = document.getElementById('letter-translate');
        let isTranslated = false;
        const renderLetter = (animate = false) => {
          const text = isTranslated ? App.config.letterTranslation : App.config.letter;
          translateButton.textContent = isTranslated ? 'Back to English' : 'Translate to Indonesia';
          translateButton.setAttribute('aria-pressed', String(isTranslated));
          translateButton.hidden = true;
          if (animate) App.Animation.typewriter(letter, text, 25, () => { translateButton.hidden = false; });
          else { letter.textContent = text; translateButton.hidden = false; }
        };
        translateButton.addEventListener('click', () => { isTranslated = !isTranslated; renderLetter(); });
        renderLetter(true);
      }
      if (view === 'wishes') this.bindStarWishes();
    },
    /** Handles wishes created inside the dashboard tab. */
    bindWishes() {
      const form = document.getElementById('dashboard-wish-form'); const sky = document.getElementById('dashboard-wish-sky');
      const render = () => { sky.innerHTML = App.state.wishList.map(wish => `<button class="wish-star" style="left:${wish.x}%;top:${wish.y}%" type="button" data-dashboard-wish="${wish.id}">★</button>`).join(''); sky.querySelectorAll('[data-dashboard-wish]').forEach(star => star.addEventListener('click', () => { const wish = App.state.wishList.find(item => item.id === Number(star.dataset.dashboardWish)); if (wish) App.Modal.open(`<h2>Wish Upon A Star</h2><p>${this.escape(wish.text)}</p>`); })); };
      form.addEventListener('submit', event => { event.preventDefault(); const input = document.getElementById('dashboard-wish-input'); const text = input.value.trim(); if (!text) return; App.state.wishList.push({ id: Date.now(), text, x: 8 + Math.random() * 80, y: 8 + Math.random() * 80 }); App.Storage.saveWishes(); input.value = ''; render(); }); render();
    },
    /** Places sender-written wishes in orbit and reveals them one by one. */
    bindStarWishes() {
      const orbit = document.getElementById('wish-orbit');
      const opened = App.Storage.get('openedStarWishes') || [];
      App.starWishes.forEach((wish, index) => {
        const available = index === 0 || opened.includes(index - 1);
        const isOpened = opened.includes(index);
        const star = document.createElement('button');
        star.type = 'button';
        star.className = `wish-orbit__star ${available ? 'is-available' : 'is-locked'} ${isOpened ? 'is-opened' : ''}`;
        star.style.setProperty('--orbit-delay', `${index * -4}s`);
        star.style.setProperty('--orbit-radius', index % 2 ? 'clamp(108px, 25vw, 210px)' : 'clamp(70px, 16vw, 135px)');
        star.style.setProperty('--star-angle', `${index * (360 / App.starWishes.length)}deg`);
        star.setAttribute('aria-label', isOpened ? wish.title : available ? `Buka ${wish.title}` : 'Bintang masih terkunci');
        star.textContent = '✦';
        star.addEventListener('click', () => {
          if (!available) return;
          if (!opened.includes(index)) { opened.push(index); App.Storage.set('openedStarWishes', opened); }
          App.Modal.open(`<p class="eyebrow">${wish.title}</p><h2>Untukmu</h2><p>${this.escape(wish.text)}</p>`);
          this.render('wishes');
        });
        orbit.append(star);
      });
    },
    /** Escapes user text before showing it in modal HTML. */
    escape(text) { const node = document.createElement('div'); node.textContent = text; return node.innerHTML; }
  };
}(window.BirthdayApp));
