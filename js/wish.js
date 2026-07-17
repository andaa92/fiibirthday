(function (App) {
  App.Wishes = {
    /** Sets up wish submission and restores saved wishes. */
    init() { const form = document.getElementById('wish-form'); if (!form) return; form.addEventListener('submit', event => { event.preventDefault(); const input = document.getElementById('wish-input'); const text = input.value.trim(); if (!text) return; App.state.wishList.push({ id: Date.now(), text, x: 8 + Math.random() * 80, y: 8 + Math.random() * 80 }); App.Storage.saveWishes(); input.value = ''; this.render(); }); this.render(); },
    /** Renders saved wishes as independently positioned interactive stars. */
    render() { const sky = document.getElementById('wish-sky'); sky.innerHTML = App.state.wishList.map(wish => `<button class="wish-star" type="button" data-wish-id="${wish.id}" style="left:${wish.x}%;top:${wish.y}%" aria-label="Buka harapan">★</button>`).join(''); sky.querySelectorAll('[data-wish-id]').forEach(star => star.addEventListener('click', () => { const wish = App.state.wishList.find(item => item.id === +star.dataset.wishId); if (wish) App.Modal.open(`<h2>Wish Upon A Star</h2><p>${this.escape(wish.text)}</p>`); })); },
    /** Escapes user-provided text before placing it in modal HTML. */
    escape(text) { const element = document.createElement('div'); element.textContent = text; return element.innerHTML; }
  };
}(window.BirthdayApp));
