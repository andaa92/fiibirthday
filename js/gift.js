/* GSAP interaction for opening the birthday gift. */
(function (App) {
  App.Gift = {
    /** Opens the gift box and reveals the surprise cards one by one. */
    init() {
      const button = document.getElementById('gift-box-button');
      const giftImage = button?.querySelector('img');
      const cards = document.querySelectorAll('.gift-photo-item');
      if (!button || !giftImage) return;
      const storedPhotos = App.Storage.get('giftUploadedPhotos') || [];
      const savePhotos = () => App.Storage.set('giftUploadedPhotos', storedPhotos);
      const compressPhoto = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          const source = new Image();
          source.onerror = reject;
          source.onload = () => {
            const limit = 900;
            const scale = Math.min(1, limit / Math.max(source.width, source.height));
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(source.width * scale);
            canvas.height = Math.round(source.height * scale);
            canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', .82));
          };
          source.src = reader.result;
        };
        reader.readAsDataURL(file);
      });
      cards.forEach((card, index) => {
        const input = card.querySelector('.gift-photo-input');
        const image = card.querySelector('img');
        const viewButton = card.querySelector('[data-gift-view]');
        const deleteButton = card.querySelector('[data-gift-delete]');
        const showPhoto = source => {
          image.src = source;
          card.querySelector('.gift-photo-slot').classList.add('has-photo');
          viewButton.disabled = false;
          deleteButton.disabled = false;
        };
        if (storedPhotos[index]) showPhoto(storedPhotos[index]);
        input?.addEventListener('change', async () => {
          const file = input.files?.[0];
          if (!file || !image) return;
          try {
            storedPhotos[index] = await compressPhoto(file);
            savePhotos();
            showPhoto(storedPhotos[index]);
          } catch (error) {
            App.Modal.open('<h2>Foto belum tersimpan</h2><p>Coba pilih foto lain dengan ukuran lebih kecil.</p>');
          }
        });
        viewButton?.addEventListener('click', () => { if (image?.src) App.Modal.open(`<img src="${image.src}" alt="${image.alt}">`); });
        deleteButton?.addEventListener('click', () => { image.removeAttribute('src'); input.value = ''; storedPhotos[index] = null; savePhotos(); card.querySelector('.gift-photo-slot').classList.remove('has-photo'); viewButton.disabled = true; deleteButton.disabled = true; });
      });
      const alreadyOpened = App.Storage.get('openedGift');
      if (alreadyOpened) {
        button.dataset.opened = 'true';
        button.classList.add('is-opened');
        button.disabled = true;
        button.setAttribute('aria-label', 'Kotak hadiah sudah dibuka');
        giftImage.src = 'assets/images/gift-box-open.png';
        giftImage.alt = 'Kotak hadiah navy terbuka dengan tutup di samping';
        document.getElementById('gift-sparkles')?.classList.add('is-visible');
        cards.forEach(card => { card.style.opacity = '1'; card.style.visibility = 'visible'; card.style.transform = 'none'; });
        document.querySelector('.gift-intro h1').textContent = 'Your gift is here';
        document.querySelector('.gift-intro p:last-child').textContent = 'Your surprise has already been opened.';
      }
      if (!window.gsap) return;
      const ornamentArea = document.getElementById('gift-falling-ornaments');
      const animateOrnament = ornament => {
        gsap.to(ornament, { y: '115vh', x: () => gsap.utils.random(-55, 55), rotation: () => gsap.utils.random(280, 720), duration: () => gsap.utils.random(4, 7), delay: () => gsap.utils.random(0, 4), ease: 'none', onComplete: () => { gsap.set(ornament, { y: -45, x: 0, rotation: 0, left: `${gsap.utils.random(2, 97)}%` }); animateOrnament(ornament); } });
      };
      if (ornamentArea) Array.from({ length: 16 }, (_, index) => {
        const ornament = document.createElement('span');
        ornament.className = `gift-falling-ornament gift-falling-ornament--${index % 3}`;
        ornament.style.left = `${gsap.utils.random(2, 97)}%`;
        ornamentArea.append(ornament);
        animateOrnament(ornament);
      });
      button.addEventListener('click', () => {
        if (button.dataset.opened) return;
        button.dataset.opened = 'true';
        App.Storage.set('openedGift', true);
        button.classList.add('is-opened');
        giftImage.src = 'assets/images/gift-box-open.png';
        giftImage.alt = 'Kotak hadiah navy terbuka dengan tutup di samping';
        const timeline = gsap.timeline();
        timeline
          .fromTo(giftImage, { opacity: .45, scale: .92 }, { opacity: 1, scale: 1, duration: .75, ease: 'back.out(1.25)' })
          .to('#gift-sparkles', { opacity: 1, scale: 1.25, duration: .35, ease: 'power2.out' }, '-=.5')
          .to(cards, { autoAlpha: 1, y: 0, duration: .55, stagger: .18, ease: 'back.out(1.3)' }, '-=.05');
      });
    }
  };
}(window.BirthdayApp));
