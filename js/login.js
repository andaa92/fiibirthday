(function (App) {
  App.Login = {
    /** Sets up keypad input and PIN form validation. */
    init() { const input = document.getElementById('pin-input'); if (!input) return; const error = document.getElementById('login-error'); const validate = () => { if (input.value !== App.config.pin) { error.textContent = 'Tetott.. Coba lagi fii!'; input.value = ''; return; } App.state.isLoggedIn = true; App.Storage.save(); App.Router.navigate('invitation'); }; document.querySelector('.pin-keypad').addEventListener('click', event => { const digit = event.target.dataset.pinDigit; const action = event.target.dataset.pinAction; if (digit && input.value.length < input.maxLength) input.value += digit; if (action === 'clear') input.value = input.value.slice(0, -1); if (action === 'clear-all') input.value = ''; error.textContent = ''; if (input.value.length === App.config.pin.length) validate(); }); document.getElementById('login-form').addEventListener('submit', event => { event.preventDefault(); validate(); }); }
  };
}(window.BirthdayApp));
