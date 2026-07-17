// login-extra.js
// Menambahkan interaksi kecil di halaman login TANPA mengubah login.js:
// 1) toggle "Lupa PIN?"
// 2) sinkronisasi kotak-kotak PIN visual dengan #pin-input yang aslinya
//    (login.js tetap satu-satunya yang menulis ke #pin-input, kita cuma "mendengarkan")
// 3) shake + highlight otomatis saat #login-error terisi pesan

(function () {
  document.addEventListener('DOMContentLoaded', () => {

    // --- toggle "Lupa PIN?" ---
    const hintToggle = document.getElementById('pin-hint-toggle');
    const hintText = document.getElementById('pin-hint');

    if (hintToggle && hintText) {
      hintToggle.addEventListener('click', () => {
        const isHidden = hintText.hasAttribute('hidden');
        if (isHidden) {
          hintText.removeAttribute('hidden');
          hintToggle.textContent = 'Sembunyikan petunjuk';
        } else {
          hintText.setAttribute('hidden', '');
          hintToggle.textContent = 'Lupa PIN?';
        }
      });
    }

    // --- sinkronisasi kotak PIN ---
    const pinInput = document.getElementById('pin-input');
    const boxesWrap = document.getElementById('pin-boxes');
    const boxes = boxesWrap ? Array.from(boxesWrap.querySelectorAll('.pin-box')) : [];

    function renderBoxes(value) {
      const len = (value || '').length;
      boxes.forEach((box, i) => {
        box.classList.toggle('is-filled', i < len);
        box.classList.toggle('is-current', i === len);
      });
    }

    if (pinInput && boxes.length) {
      // login.js kemungkinan besar meng-assign pinInput.value langsung
      // (bukan lewat event 'input' asli), jadi kita intercept setter-nya
      // supaya kotak selalu ikut update, apa pun cara login.js menulisnya.
      const proto = window.HTMLInputElement.prototype;
      const nativeDescriptor = Object.getOwnPropertyDescriptor(proto, 'value');

      Object.defineProperty(pinInput, 'value', {
        configurable: true,
        get() {
          return nativeDescriptor.get.call(this);
        },
        set(v) {
          nativeDescriptor.set.call(this, v);
          renderBoxes(v);
        }
      });

      // Jaga-jaga kalau login.js malah pakai event 'input' biasa
      pinInput.addEventListener('input', (e) => renderBoxes(e.target.value));

      // render kondisi awal (misal ada value sisa)
      renderBoxes(pinInput.value);
    }

    // --- error state: shake + highlight merah pada kotak ---
    const errorEl = document.getElementById('login-error');

    if (errorEl) {
      const triggerErrorState = () => {
        if (boxesWrap) {
          boxesWrap.classList.add('pin-boxes--error');
          boxesWrap.classList.remove('pin-shake');
          void boxesWrap.offsetWidth; // reflow supaya animasi bisa retrigger
          boxesWrap.classList.add('pin-shake');
        }
      };

      const clearErrorState = () => {
        if (boxesWrap) boxesWrap.classList.remove('pin-boxes--error');
      };

      const observer = new MutationObserver(() => {
        const hasMessage = errorEl.textContent.trim().length > 0;
        if (hasMessage) {
          triggerErrorState();
        } else {
          clearErrorState();
        }
      });

      observer.observe(errorEl, { childList: true, characterData: true, subtree: true });

      document.querySelectorAll('[data-pin-digit], [data-pin-action]').forEach((btn) => {
        btn.addEventListener('click', clearErrorState);
      });
    }
  });
})();