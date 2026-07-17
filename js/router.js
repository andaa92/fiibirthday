(function (App) {
  App.Router = {
    pages: { login: 'login.html', journey: 'journey.html', 'love-meter': 'love-meter.html', invitation: 'invitation.html', 'birthday-memory': 'birthday-memory.html', 'surprise-choice': 'surprise-choice.html', flower: 'flower.html', gift: 'gift.html', dashboard: 'dashboard.html', gallery: 'gallery.html', letter: 'letter.html', facts: 'facts.html', wishes: 'wishes.html', music: 'music.html' },
    /** Binds declarative links to their standalone HTML pages. */
    init() { document.addEventListener('click', event => { const button = event.target.closest('[data-route]'); const scrollButton = event.target.closest('[data-scroll-to]'); if (button) this.navigate(button.dataset.route); if (scrollButton) { const target = scrollButton.dataset.scrollTo; if (scrollButton.dataset.unlock) this.unlock(scrollButton.dataset.unlock); this.scrollToStep(target); } }); },
    /** Navigates to a separate HTML page and remembers the current progress. */
    navigate(page, save = true) { if (!this.pages[page]) return; App.state.currentPage = page; if (save && page !== 'login') App.Storage.set('progressPage', page); const go = () => { window.location.href = this.pages[page]; }; const nightSkyPages = ['invitation', 'birthday-memory', 'love-meter', 'surprise-choice']; if (nightSkyPages.includes(page) && !window.location.pathname.endsWith('login.html')) App.Animation.closeWithNightSky(go); else go(); },
    /** Smoothly brings an unlocked journey stage into view. */
    scrollToStep(id) { const step = document.getElementById(id); if (step && !step.classList.contains('is-locked')) step.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
    /** Makes the next journey stage available. */
    unlock(id) { const step = document.getElementById(id); if (step) step.classList.remove('is-locked'); },
    /** Removes completed early stages once the music stage begins. */
    completeBefore(id) { if (id !== 'music-step') return; ['invitation-step', 'love-meter-step'].forEach(stepId => document.getElementById(stepId)?.classList.add('is-completed')); }
  };
}(window.BirthdayApp));
