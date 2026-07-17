/* Builds the flower reveal with the GSAP animation library. */
(function (App) {
  App.Flower = {
    /** Starts an endless petal rain and bouquet reveal using GSAP. */
    init() {
      const rain = document.getElementById('petal-rain');
      const bouquet = document.getElementById('flower-bouquet');
      const continueButton = document.getElementById('flower-continue-button');
      if (!rain || !bouquet || !continueButton || !window.gsap) return;

      const colors = ['#e68d9a', '#f2b6bc', '#e6c48e', '#b78bc7', '#92bdd3'];
      const animatePetal = petal => {
        gsap.to(petal, {
          y: '112vh',
          x: () => gsap.utils.random(-70, 70),
          rotation: () => gsap.utils.random(380, 760),
          duration: () => gsap.utils.random(3.3, 6.8),
          delay: () => gsap.utils.random(0, 3),
          ease: 'none',
          onComplete: () => {
            gsap.set(petal, { y: -45, x: 0, rotation: 0, left: `${gsap.utils.random(2, 96)}%` });
            animatePetal(petal);
          }
        });
      };

      Array.from({ length: 25 }, (_, index) => {
        const petal = document.createElement('span');
        petal.className = 'flower-petal';
        petal.style.setProperty('--x', `${4 + Math.random() * 92}%`);
        petal.style.setProperty('--size', `${12 + Math.random() * 16}px`);
        petal.style.backgroundColor = colors[index % colors.length];
        rain.append(petal);
        gsap.set(petal, { opacity: .82 });
        animatePetal(petal);
        return petal;
      });

      const timeline = gsap.timeline();
      timeline
        .from('.flower-message', { opacity: 0, y: -22, duration: .7, ease: 'power2.out' })
        .to('.flower-bouquet', { opacity: 1, scale: 1, duration: 1.15, ease: 'back.out(1.45)' }, .8)
        .to(continueButton, { autoAlpha: 1, y: 0, duration: .45, ease: 'power2.out' }, 2.6);

      gsap.to(bouquet, { y: -18, duration: 1.8, delay: 2.2, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      continueButton.addEventListener('click', () => {
        App.Storage.set('openedFlower', true);
        App.Modal.open(`
          <article class="flower-modal">
            <img src="assets/images/bouquet-lily-edelweiss.png" alt="Buket lily putih dan bunga edelweiss">
            <div>
              <p class="eyebrow">Bunga untuk kamu Nafii</p>
              <h2>Lily & Edelweiss</h2>
              <p>Lily putih melambangkan ketulusan dan harapan baik. Edelweiss adalah simbol cinta yang tulus, setia, dan tetap bertahan di setiap perjalanan.</p>
              <p>Semoga buket kecil ini bisa menjadi pengingat bahwa kamu sangat berharga.</p>
            </div>
          </article>
        `);
      });
    }
  };
}(window.BirthdayApp));
