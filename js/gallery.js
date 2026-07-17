(function (App) {
  App.Gallery = {
    /** Renders the gallery automatically from the image array. */
    init() { const grid = document.getElementById('gallery-grid'); if (grid) { grid.innerHTML = App.galleryItems.map((item, index) => `<button class="gallery-item" type="button" data-gallery-index="${index}"><img src="${item.src}" alt="${item.alt}"><span>${item.caption}</span></button>`).join(''); grid.addEventListener('click', event => { const item = event.target.closest('[data-gallery-index]'); if (item) this.open(+item.dataset.galleryIndex); }); } if (document.getElementById('music-slideshow')) this.initSlideshow(); },
    /** Builds an automatically moving photo strip for the music stage. */
    initSlideshow() { const track = document.getElementById('music-slideshow'); const photos = Array.from({ length: 6 }, () => App.dashboardSlideshowItems).flat(); track.innerHTML = photos.map(item => `<img src="${item.src}" alt="${item.alt}">`).join(''); },
    /** Opens a selected image in the modal viewer. */
    open(index) { App.state.galleryIndex = index; this.renderModal(); },
    /** Renders previous/next navigation in the gallery modal. */
    renderModal() { const item = App.galleryItems[App.state.galleryIndex]; App.Modal.open(`<img src="${item.src}" alt="${item.alt}"><h2>${item.caption}</h2><div class="music-player__controls"><button type="button" data-gallery-move="-1">Previous</button><button type="button" data-gallery-move="1">Next</button></div>`); document.querySelectorAll('[data-gallery-move]').forEach(button => button.addEventListener('click', () => { App.state.galleryIndex = (App.state.galleryIndex + +button.dataset.galleryMove + App.galleryItems.length) % App.galleryItems.length; this.renderModal(); })); }
  };
}(window.BirthdayApp));
