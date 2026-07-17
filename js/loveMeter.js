(function (App) {
  let progress = 0;
  let holdTimer = null;

  App.LoveMeter = {
    /** Sets up either the standalone meter or the restored Journey dashboard. */
    init() {
      const holdButton = document.getElementById('love-meter-hold-button');
      const isJourneyDashboard = Boolean(document.querySelector('.journey'));

      if (isJourneyDashboard && App.Storage.get('progressPage') === 'dashboard') {
        App.Router.unlock('dashboard-step');
        this.addJourneyChoiceButton();
        const loader = document.getElementById('journey-loader');
        loader?.classList.add('is-visible');
        setTimeout(() => {
          loader?.classList.remove('is-visible');
          document.documentElement.classList.remove('is-dashboard-restore');
          App.Router.scrollToStep('dashboard-step');
        }, 1500);
      }

      if (!holdButton) return;
      this.reset();
      holdButton.addEventListener('pointerdown', event => {
        if (App.state.loveMeterFinished) return;
        holdButton.setPointerCapture(event.pointerId);
        this.startHolding();
      });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(eventName => {
        holdButton.addEventListener(eventName, () => {
          this.stopHolding();
          if (progress < 100) document.getElementById('meter-error').textContent = 'parah sekali nafii ngga 100%, ckp tw. ';
        });
      });
    },

    /** Adds a return control only after the Journey dashboard is unlocked. */
    addJourneyChoiceButton() {
      const journey = document.querySelector('.journey');
      if (!journey || document.querySelector('.journey-choice-link')) return;
      const button = document.createElement('button');
      button.className = 'journey-choice-link';
      button.type = 'button';
      button.textContent = 'Kembali';
      button.addEventListener('click', () => App.Router.navigate('surprise-choice'));
      document.body.append(button);
    },

    /** Resets the standalone challenge whenever its page is opened. */
    reset() {
      progress = 0;
      App.state.loveMeterFinished = false;
      App.Storage.save();
      document.getElementById('love-meter-fill').style.height = '0%';
      document.getElementById('love-meter-value').textContent = '0%';
      document.getElementById('love-meter-control').setAttribute('aria-valuenow', '0');
      document.getElementById('love-meter-hold-button').classList.remove('is-hidden');
      document.getElementById('meter-error').textContent = '';
    },

    /** Starts filling while the visitor holds the button. */
    startHolding() {
      if (holdTimer) return;
      holdTimer = setInterval(() => this.setProgress(progress + 1), 35);
    },

    /** Stops the active fill timer. */
    stopHolding() {
      clearInterval(holdTimer);
      holdTimer = null;
    },

    /** Updates the filled heart and continues at 100 percent. */
    setProgress(value) {
      progress = Math.max(progress, Math.min(100, Math.round(value)));
      const meter = document.getElementById('love-meter-control');
      document.getElementById('love-meter-fill').style.height = `${progress}%`;
      document.getElementById('love-meter-value').textContent = `${progress}%`;
      meter.setAttribute('aria-valuenow', progress);
      document.getElementById('meter-error').textContent = '';
      if (progress !== 100) return;
      this.stopHolding();
      App.state.loveMeterFinished = true;
      App.Storage.save();
      App.Storage.set('progressPage', 'surprise-choice');
      document.getElementById('love-meter-hold-button').classList.add('is-hidden');
      meter.classList.add('is-bursting');
      this.playLoveBurst();
      setTimeout(() => {
        const goToChoice = () => { window.location.href = App.Router.pages['surprise-choice']; };
        if (App.Animation?.closeWithNightSky) App.Animation.closeWithNightSky(goToChoice);
        else goToChoice();
      }, 2300);
    },

    /** Creates the short pink heart-rain celebration. */
    playLoveBurst() {
      const burst = document.createElement('div');
      burst.className = 'love-meter-burst';
      Array.from({ length: 32 }, (_, index) => {
        const heart = document.createElement('span');
        heart.textContent = '\u2665';
        heart.style.setProperty('--x', `${(index % 8 - 3.5) * 12}vw`);
        heart.style.setProperty('--delay', `${(index % 6) * .08}s`);
        heart.style.setProperty('--rotate', `${index * 23}deg`);
        burst.append(heart);
      });
      document.body.append(burst);
      setTimeout(() => burst.remove(), 2200);
    },
  };
}(window.BirthdayApp));
