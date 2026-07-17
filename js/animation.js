(function (App) {
  App.Animation = {
    /** Adds the full-screen lily and edelweiss transition to the current page. */
    initFlowerTransition() {
      const floralPages = ['invitation.html', 'love-meter.html', 'surprise-choice.html'];
      if (!floralPages.some(page => window.location.pathname.endsWith(page))) return;
      if (document.querySelector('.flower-transition')) return;
      const transition = document.createElement('div');
      transition.className = 'flower-transition is-opening';
      transition.setAttribute('aria-hidden', 'true');
      transition.innerHTML = '<span class="flower-transition__panel flower-transition__panel--top"></span><span class="flower-transition__panel flower-transition__panel--right"></span><span class="flower-transition__panel flower-transition__panel--bottom"></span><span class="flower-transition__panel flower-transition__panel--left"></span>';
      document.body.append(transition);
      requestAnimationFrame(() => requestAnimationFrame(() => transition.classList.add('is-revealing')));
      setTimeout(() => transition.remove(), 2800);
    },
    /** Covers the screen in flowers before changing to another page. */
    closeWithFlowers(onComplete) {
      const transition = document.querySelector('.flower-transition') || document.createElement('div');
      if (!transition.isConnected) {
        transition.className = 'flower-transition';
        transition.setAttribute('aria-hidden', 'true');
        transition.innerHTML = '<span class="flower-transition__panel flower-transition__panel--top"></span><span class="flower-transition__panel flower-transition__panel--right"></span><span class="flower-transition__panel flower-transition__panel--bottom"></span><span class="flower-transition__panel flower-transition__panel--left"></span>';
        document.body.append(transition);
      }
      transition.className = 'flower-transition';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        transition.classList.add('is-closing');
        setTimeout(onComplete, 2750);
      }));
    },
    /** Fades the current page through a small champagne glow before navigation. */
    closeWithGlow(onComplete) {
      const overlay = document.createElement('div');
      overlay.className = 'page-glow-transition';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.append(overlay);
      requestAnimationFrame(() => overlay.classList.add('is-active'));
      setTimeout(onComplete, 680);
    },
    /** Plays the gentle reveal on each newly loaded page. */
    initPageGlow() {
      document.body.classList.add('is-page-glow-enter');
      requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove('is-page-glow-enter')));
    },
    /** Covers navigation with a calm full-screen night sky. */
    closeWithNightSky(onComplete) {
      const overlay = document.createElement('div');
      overlay.className = 'night-sky-transition';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.append(overlay);
      sessionStorage.setItem('birthday-surprise:nightSkyTransition', '1');
      requestAnimationFrame(() => overlay.classList.add('is-covering'));
      setTimeout(onComplete, 1120);
    },
    /** Reveals eligible romantic flow pages from the night sky. */
    initNightSkyTransition() {
      const pages = ['invitation.html', 'birthday-memory.html', 'love-meter.html', 'surprise-choice.html'];
      if (!pages.some(page => window.location.pathname.endsWith(page))) return;
      const hadCover = sessionStorage.getItem('birthday-surprise:nightSkyTransition') === '1';
      sessionStorage.removeItem('birthday-surprise:nightSkyTransition');
      if (hadCover && document.documentElement.classList.contains('is-night-sky-loading')) {
        requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.remove('is-night-sky-loading')));
        return;
      }
      const overlay = document.createElement('div');
      overlay.className = 'night-sky-transition is-covering';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.append(overlay);
      requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('is-revealing')));
      setTimeout(() => overlay.remove(), 1150);
    },
    /** Animates a number from start to finish. */ animateNumber(from, to, duration, onUpdate, onComplete) { const start = performance.now(); const tick = now => { const p = Math.min((now - start) / duration, 1); onUpdate(Math.round(from + (to - from) * p)); if (p < 1) requestAnimationFrame(tick); else if (onComplete) onComplete(); }; requestAnimationFrame(tick); },
    /** Starts a numeric countdown using cards without time-unit labels. */ countdown(id, target) { const node = document.getElementById(id); const update = () => { const gap = Math.max(0, new Date(target) - new Date()); const hours = Math.floor(gap / 36e5); const minutes = Math.floor(gap / 6e4) % 60; const seconds = Math.floor(gap / 1e3) % 60; const values = [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')); node.innerHTML = `<span>${values[0]}</span><i>.</i><span>${values[1]}</span><i>.</i><span>${values[2]}</span>`; }; update(); setInterval(update, 1000); },
    /** Types text into an element and optionally runs a callback when complete. */ typewriter(node, text, speed = 25, onComplete) { clearInterval(node._typewriterTimer); node.textContent = ''; let index = 0; node._typewriterTimer = setInterval(() => { node.textContent += text[index++] || ''; if (index >= text.length) { clearInterval(node._typewriterTimer); node._typewriterTimer = null; if (onComplete) onComplete(); } }, speed); },
    /** Adds the login-style floating hearts to the romantic journey pages. */ addLoveFloaties() { const eligiblePage = document.querySelector('.invitation-envelope-scene') || document.querySelector('.invitation-card') || document.getElementById('love-meter-step') || document.querySelector('.choice-page') || document.querySelector('.memory-page'); if (!eligiblePage || document.querySelector('.love-floaties')) return; const container = document.createElement('div'); container.className = 'love-floaties'; container.setAttribute('aria-hidden', 'true'); Array.from({ length: 10 }, (_, index) => { const heart = document.createElement('span'); heart.className = 'love-floaty'; heart.textContent = '♥'; heart.style.setProperty('--left', `${4 + index * 10}%`); heart.style.setProperty('--delay', `${(index % 5) * 2.1}s`); heart.style.setProperty('--duration', `${10 + (index % 4) * 1.8}s`); heart.style.setProperty('--size', `${.7 + (index % 3) * .24}rem`); container.append(heart); }); document.body.append(container); }
  };
}(window.BirthdayApp));

document.addEventListener('DOMContentLoaded', () => window.BirthdayApp.Animation.initNightSkyTransition());
