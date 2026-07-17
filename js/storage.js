(function (App) {
  const prefix = 'birthday-surprise:';
  /** Reads a value from localStorage safely. */
  App.Storage = { get(key) { try { return JSON.parse(localStorage.getItem(prefix + key)); } catch { return null; } }, set(key, value) { localStorage.setItem(prefix + key, JSON.stringify(value)); }, load() { const saved = this.get('state'); if (saved) Object.assign(App.state, saved); App.state.wishList = this.get('wishes') || []; }, save() { this.set('state', { isLoggedIn: App.state.isLoggedIn, loveMeterFinished: App.state.loveMeterFinished, music: App.state.music }); }, saveWishes() { this.set('wishes', App.state.wishList); } };
}(window.BirthdayApp));
