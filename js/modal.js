(function (App) {
  const modal = () => document.getElementById('app-modal');
  App.Modal = {
    /** Binds universal close interactions. */
    init() { if (!modal()) return; document.addEventListener('click', event => { if (event.target.closest('[data-modal-close]')) this.close(); }); document.addEventListener('keydown', event => { if (event.key === 'Escape') this.close(); }); },
    /** Opens any supplied HTML inside the universal modal. */
    open(content) { document.getElementById('modal-body').innerHTML = content; modal().classList.add('is-open'); modal().setAttribute('aria-hidden', 'false'); },
    /** Closes and clears the universal modal. */
    close() { modal().classList.remove('is-open'); modal().setAttribute('aria-hidden', 'true'); }
  };
}(window.BirthdayApp));
