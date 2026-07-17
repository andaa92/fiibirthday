/* Surprise selection page behavior. */
(function (App) {
  App.SurpriseChoice = {
    /** Reveals dashboard access only after both surprise types have been opened. */
    init() {
      const choices = document.querySelectorAll('[data-surprise-choice]');
      const continueButton = document.getElementById('choice-continue-button');
      if (!choices.length || !continueButton) return;

      const updateContinueButton = () => {
        const openedFlower = App.Storage.get('openedFlower');
        const openedGift = App.Storage.get('openedGift');
        choices.forEach(button => button.classList.toggle('is-revealed', (button.dataset.surpriseChoice === 'flower' && openedFlower) || (button.dataset.surpriseChoice === 'gift' && openedGift)));
        const allOpened = openedFlower && openedGift;
        continueButton.classList.toggle('is-hidden', !allOpened);
        continueButton.disabled = !allOpened;
      };
      const choose = choice => {
        choices.forEach(button => button.classList.toggle('is-selected', button.dataset.surpriseChoice === choice));
        App.Storage.set('surpriseChoice', choice);
      };

      const savedChoice = App.Storage.get('surpriseChoice');
      if (savedChoice) choose(savedChoice);
      updateContinueButton();
      choices.forEach(button => button.addEventListener('click', () => {
        const choice = button.dataset.surpriseChoice;
        choose(choice);
        if (choice === 'flower') App.Router.navigate('flower', false);
        if (choice === 'gift') App.Router.navigate('gift', false);
      }));
      continueButton.addEventListener('click', () => {
        App.Storage.set('progressPage', 'dashboard');
        App.Router.navigate('journey', false);
      });
    }
  };
}(window.BirthdayApp));
