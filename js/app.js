/* Shared application state and startup orchestration. */
window.BirthdayApp = window.BirthdayApp || {};
(function (App) {
  App.config = { pin: '170708 ', birthdayDate: '2026-07-17T19:00:00+07:00', testingMode: true, recipientName: 'Putri Nafisyah Ahmad', invitationMessage: 'Siapkan senyummu untuk malam spesial ini.', letter: 'My Dearest Nafisyah Ahmad,\n\nEvery day feels a little brighter because you are in it. From the small things you do to the way you make ordinary moments feel special, you have a place in my heart that words can never fully explain.\n\nI do not know what the future holds, but I hope it always finds us choosing each other. May every memory we create become something gentle to look back on, something that makes us smile even after a long day.\n\nWhen I look at the stars at night, I am reminded that even the quietest light can make the whole sky feel less lonely. You bring that kind of warmth into my life.\n\nI promise to cheer for you, respect you, and stand beside you through every season. No matter where life takes us, I hope your heart will always know how deeply you are appreciated.\n\nThank you for being the beautiful person that you are. You are not just my love; you are one of my favorite dreams come true.\n\nWith all my love, Muhammad Andra' };
  App.config.letterTranslation = 'Cinta Tersayangku,\n\nSetiap hari terasa sedikit lebih cerah karena ada kamu di dalamnya. Dari hal-hal kecil yang kamu lakukan sampai caramu membuat momen biasa terasa istimewa, kamu punya tempat di hatiku yang tidak akan pernah cukup dijelaskan oleh kata-kata.\n\nAku tidak tahu apa yang akan terjadi di masa depan, tetapi aku berharap kita selalu memilih satu sama lain. Semoga setiap kenangan yang kita buat menjadi sesuatu yang lembut untuk dikenang, sesuatu yang membuat kita tersenyum bahkan setelah hari yang panjang.\n\nSaat aku melihat bintang-bintang di malam hari, aku teringat bahwa cahaya sekecil apa pun dapat membuat langit terasa tidak terlalu sepi. Kamu membawa kehangatan seperti itu ke dalam hidupku.\n\nAku berjanji akan mendukungmu, menghargaimu, dan berada di sisimu dalam setiap musim kehidupan. Ke mana pun hidup membawa kita, semoga hatimu selalu tahu betapa berartinya dirimu.\n\nTerima kasih sudah menjadi pribadi seindah dirimu. Kamu bukan hanya cintaku; kamu adalah salah satu mimpi terindah yang menjadi nyata.\n\nDengan segenap cintaku, Muhammad Andra';
  App.config.letter = 'My Dearest Love,\n\nEvery day feels a little brighter because you are in it. From the smallest things you do to the way you make ordinary moments feel special, you hold a place in my heart that words could never fully describe.\n\nI do not know what the future holds, but I hope it will always find us choosing one another. May every memory we make become something gentle to look back on—something that makes us smile even after a long day.\n\nWhen I look at the stars at night, I am reminded that even the smallest light can make the whole sky feel less lonely. You bring that same warmth into my life.\n\nI promise to support you, respect you, and stand beside you through every season. Wherever life takes us, I hope you will always know how deeply you are appreciated.\n\nThank you for being the beautiful person you are. You are not only my love; you are one of my favourite dreams come true.\n\nWith all my love,\nMuhammad Andra';
  App.config.letterTranslation = 'Cinta Tersayangku,\n\nSetiap hari terasa sedikit lebih cerah karena ada kamu di dalamnya. Dari hal-hal kecil yang kamu lakukan hingga caramu membuat momen biasa terasa istimewa, kamu memiliki tempat di hatiku yang tidak akan pernah cukup dijelaskan dengan kata-kata.\n\nAku tidak tahu apa yang akan terjadi di masa depan, tetapi aku berharap masa depan selalu menemukan kita sedang memilih satu sama lain. Semoga setiap kenangan yang kita buat menjadi sesuatu yang lembut untuk dikenang—sesuatu yang membuat kita tersenyum bahkan setelah hari yang panjang.\n\nSaat aku melihat bintang-bintang di malam hari, aku teringat bahwa cahaya sekecil apa pun dapat membuat seluruh langit terasa tidak terlalu sepi. Kamu membawa kehangatan yang sama ke dalam hidupku.\n\nAku berjanji akan mendukungmu, menghargaimu, dan berada di sisimu dalam setiap musim kehidupan. Ke mana pun hidup membawa kita, aku berharap kamu akan selalu tahu betapa dalamnya penghargaan dan sayangku padamu.\n\nTerima kasih sudah menjadi pribadi seindah dirimu. Kamu bukan hanya cintaku; kamu adalah salah satu mimpi terindahku yang menjadi nyata.\n\nDengan segenap cintaku,\nMuhammad Andra';
  App.config.letter = 'My Dearest Love,\n\nEvery day I spend without talking to you feels incomplete. From the moment you came into my life, you brought a happiness I never knew existed. Your smile brightens my darkest days, and your kindness makes my heart feel at peace.\n\nI don\'t know what the future holds, but I know one thing for sure—I want you to be a part of it. You are the reason I wake up with hope and sleep with beautiful thoughts. Every memory we create becomes a treasure that I carry deep within my heart.\n\nWhen I look at the stars at night, I am reminded of how lucky I am to know someone as special as you. Your presence makes ordinary moments feel magical, and your love gives meaning to my life.\n\nI promise to cherish you, respect you, and stand beside you through every season of life. No matter how far apart we may be, my heart will always find its way back to you.\n\nThank you for being the beautiful person that you are. You are not just my love; you are my favorite dream come true.';
  App.config.letterTranslation = 'Cinta Tersayangku,\n\nSetiap hari yang kujalani tanpa berbicara denganmu terasa tidak lengkap. Sejak kamu hadir dalam hidupku, kamu membawa kebahagiaan yang sebelumnya tidak pernah kuketahui. Senyummu menerangi hari-hariku yang paling gelap, dan kebaikanmu membuat hatiku terasa tenang.\n\nAku tidak tahu apa yang akan terjadi di masa depan, tetapi ada satu hal yang pasti—aku ingin kamu menjadi bagian darinya. Kamu adalah alasan aku bangun dengan harapan dan tidur dengan pikiran-pikiran indah. Setiap kenangan yang kita buat menjadi harta yang kusimpan jauh di dalam hatiku.\n\nSaat aku melihat bintang-bintang di malam hari, aku teringat betapa beruntungnya aku mengenal seseorang seistimewa kamu. Kehadiranmu membuat momen biasa terasa ajaib, dan cintamu memberi makna pada hidupku.\n\nAku berjanji akan menyayangimu, menghargaimu, dan berada di sisimu dalam setiap musim kehidupan. Sejauh apa pun jarak yang memisahkan kita, hatiku akan selalu menemukan jalan untuk kembali kepadamu.\n\nTerima kasih sudah menjadi pribadi seindah dirimu. Kamu bukan hanya cintaku; kamu adalah mimpi terindahku yang menjadi nyata.';
  App.config.letter += '\n\nWith All My Heart\nMuhammad Andra.';
  App.config.letterTranslation += '\n\nDengan Sepenuh Hatiku\nMuhammad Andra.';
  App.state = { currentPage: 'login', isLoggedIn: false, loveMeterFinished: false, musicPlaying: false, galleryIndex: 0, wishList: [], music: { trackIndex: 0, volume: .7, repeat: false } };
  App.galleryItems = [
    { src: 'assets/images/photo1.png', alt: 'Placeholder foto kenangan 1', caption: 'Visss.pic 5 April 2025' },
    { src: 'assets/images/photo2.png', alt: 'Placeholder foto kenangan 2', caption: 'Meenie box 7 Juli 2025' },
    { src: 'assets/images/photo3.png', alt: 'Placeholder foto kenangan 3', caption: 'Meenie box 23 Agustus 2025' },
    { src: 'assets/images/photo4.png', alt: 'Placeholder foto kenangan 1', caption: 'Meenie box 30 September 2025' },
    { src: 'assets/images/photo5.png', alt: 'Placeholder foto kenangan 2', caption: 'Meenie box 6 November 2025' },
    { src: 'assets/images/photo6.png', alt: 'Placeholder foto kenangan 3', caption: 'Meenie box 20 Desember 2025' }
  ];
  // Khusus untuk foto bergerak di bagian atas dashboard. Tidak memengaruhi Photo Dump.
  App.dashboardSlideshowItems = [
    { src: 'assets/images/pic1.png', alt: 'Foto berjalan 1' },
    { src: 'assets/images/pic2.png', alt: 'Foto berjalan 2' },
    { src: 'assets/images/pic3.png', alt: 'Foto berjalan 3' },
    { src: 'assets/images/pic4.png', alt: 'Foto berjalan 4' },
    { src: 'assets/images/pic5.png', alt: 'Foto berjalan 5' },
    { src: 'assets/images/pic6.png', alt: 'Foto berjalan 6' }
  ];
  App.funFacts = [
    { title: 'DIMSUM LOVER 💞', description: 'Nafii tuu suka banget sama yang namanya DIMSUM MENTAI, pembalik mood dia, pokonya kalau dikasih dimsum mentai dia langsung jadi orang terhappy sedunia.', image: 'assets/images/dimsum.png' },
    { title: 'MOVIE TIME 🎬', description: 'Hobi diaa kayanya nonton dehh, dan akhir akhir ini dia lagi suka nonton kdrama, karena dia juga akuu jadi kecanduan nonton kdrama.', image: 'assets/images/kdrama.png' },
    { title: 'LISTENING 🎶', description: 'Yaa mendengarkan musik juga salah satu hobi nafii, selera musik dia bagus bagusss.', image: 'assets/images/playlist.png' },
    { title: 'NOODLE 🍜', description: 'Dia juga sukaa inii,, tapi dia kadang sering ngga mood karena ngga di bolehin sering sering makan mie sama bundaaa.', image: 'assets/images/mie.png' },
    { title: 'WANGIII! ✨', description: 'Inii orang emang wangi banget parahhh, sukaaa.', image: 'assets/images/wangi.png' },
    { title: 'GEMESSIN 😽', description: 'Gemesinnyaa ampunn sii, orangg terlucuu yang pernah aku temuiii', image: 'assets/images/gemesin.png' },
    { title: 'PRETTIES GIRL! 🥰', description: 'PAKET LENGKAP BANGET DIA TUHH. Udah cantik bangett, baikk, penyayangg, penyabarr dan lembutt, ngga pernah ngeselinn. akuu beruntungg sekalii.', image: 'assets/images/cantik.png' },
    { title: 'SUKAA SAMA AKU!! 😇', description: 'hehehehehehehehehehehehehe  ', image: 'assets/images/ganteng.png' }
  ];  

  App.starWishes = [
    { title: 'Wish 01', text: 'May you always be blessed with good health and stay far from any illness.' },
    { title: 'Wish 02', text: 'May your days be filled with little moments of happiness that make you smile.' },
    { title: 'Wish 03', text: 'May your fortune flow smoothly and always be blessed.' },
    { title: 'Wish 04', text: 'May every dream and goal of yours slowly come true.' },
    { title: 'Wish 05', text: 'May you always be surrounded by people who love you sincerely.' },
    { title: 'Wish 06', text: 'May your heart always stay calm, even when the world feels chaotic.' },
    { title: 'Wish 07', text: 'May you grow more confident in all your strengths.' },
    { title: 'Wish 08', text: 'May every effort you make be made easy by God.' },
    { title: 'Wish 09', text: 'May we keep growing together, supporting each other along the way.' },
    { title: 'Wish 10', text: 'May you never doubt that you are worthy and loved.' },
    { title: 'Wish 11', text: 'May your patience always bear sweet fruit.' },
    { title: 'Wish 12', text: 'May you always find time to rest and love yourself.' },
    { title: 'Wish 13', text: 'May our laughter together never run out, no matter how much time passes.' },
    { title: 'Wish 14', text: 'May every problem that comes our way become a lesson that makes us stronger.' },
    { title: 'Wish 15', text: 'May our love always stay sincere, honest, and full of trust.' },
    { title: 'Wish 16', text: 'May you always become the best version of yourself.' },
    { title: 'Wish 17', text: 'May every step you take be blessed, wherever you go.' },
    { title: 'Wish 18', text: 'May we keep being together, through joy and hardship, far into the future.' }
  ];
  App.musicTracks = [
    { title: 'My Everything', artist: 'Ariana Grande', src: 'assets/music/my-everything.mp3', cover: 'assets/images/pretty.png' },
    { title: 'Slipping Through My Fingers', artist: 'Meryl Streep', src: 'assets/music/slipping-through-my-fingers.mp3', cover: 'assets/images/little.png' },
    { title: 'Foto Kita Blur', artist: 'Sal Priadi', src: 'assets/music/foto-kita-blur.mp3', cover: 'assets/images/blur.png' }
  ];
  App.songLyrics = [
    { start: 0, end: 5, text: 'School bag in hand, she leaves home in' },
    { start: 5, end: 11, text: 'the early morning, waving goodbye with an' },
    { start: 11, end: 16, text: 'absent-minded smile' },
    { start: 16, end: 23, text: 'I watch her go with a surge of that well-known sadness' },
    { start: 22, end: 29, text: 'I have to sit down for a while' },
    { start: 29, end: 35, text: 'The feeling that i\'m losing her forever' },
    { start: 35, end: 43, text: 'and without really entering her world' },
    { start: 43, end: 48, text: 'I\'m glad whenever I can share her laughter' },
    { start: 46, end: 52, text: 'That funny little girl' },
    { start: 52, end: 56, text: 'Slipping through my fingers all the time' },
    { start: 56, end: 61, text: 'I try to capture every minute' },
    { start: 61, end: 63, text: 'the feeling in it' },
    { start: 63, end: 69, text: 'Slipping through my fingers all the time' },
    { start: 69, end: 71, text: 'Do I really see what\'s in her mind?' },
    { start: 71, end: 75, text: 'Each time I think I\'m close to knowing' },
    { start: 75, end: 77, text: 'She keeps on growing' },
    { start: 77, end: 82, text: 'Slipping through my fingers all the time' },
    { start: 82, end: 88, text: 'Sleep in our eyes, her and me at the' },
    { start: 88, end: 90, text: 'breakfast table' },
    { start: 90, end: 92, text: 'barely awake' },
    { start: 92, end: 98, text: 'I let precious time go by' },
    { start: 98, end: 101, text: "Then when she's gone" },
    { start: 101, end: 105, text: 'There\'s that odd melancholy feeling' },
    { start: 105, end: 112, text: 'And a sense of guilt I can\'t deny' },
    { start: 112, end: 118, text: 'What happened to the wonderful adventures?' },
    { start: 118, end: 124, text: 'The places I had planned for us to go?'},
    { start: 124, end: 126, text: '(Slipping through my fingers all the time) Well, ' },
    { start: 126, end: 131, text: 'some of that we did, but most we didn\'t' },
    { start: 131, end: 135, text: 'And why, I just don\'t know' },
    { start: 135, end: 138, text: 'Slipping through my fingers all the time' },
    { start: 138, end: 143, text: 'I try to capture every minute' },
    { start: 142, end: 145, text: 'the feeling in it' },
    { start: 145, end: 149, text: 'Slipping through my fingers all the time' },
    { start: 149, end: 152, text: 'Do I really see what\'s in her mind?' },
    { start: 152, end: 157, text: 'Each time I think I\'m close to knowing' },
    { start: 157, end: 159, text: 'She keeps on growing' },
    { start: 159, end: 163, text: 'Slipping through my fingers all the time' },
    { start: 163, end: 170, text: 'Sometimes I wish that I could freeze the picture' },
    { start: 170, end: 175, text: 'and save it from the funny tricks of time' },
    { start: 175, end: 180, text: 'Slipping through my fingers' },
    { start: 180, end: 210, text: '♫ Instrumental ♫' },
    { start: 210, end: 215, text: 'School bag in hand, she leaves home in the' },
    { start: 215, end: 220, text: 'early morning, waving goodbye with an' },
    { start: 220, end: 250, text: 'absent-minded smile' },
    
  ];
  App.myEverythingLyrics = [
    { start: 0, end: 8, text: '♫ Instrumental ♫' },
    { start: 8, end: 13, text: 'I cried enough tears to see my own reflection in them' },
    { start: 13, end: 18, text: 'And then it was clear' },
    { start: 18, end: 22, text: 'I can’t deny I really miss it' },
    { start: 22, end: 26, text: 'To think that I was wrong' },
    { start: 26, end: 31, text: 'I guess you don’t know what you got ’til it’s gone' },
    { start: 31, end: 34, text: 'Pain is just a consequence of love' },
    { start: 34, end: 39, text: 'I’m saying sorry for the sake of us' },
    { start: 39, end: 44, text: 'He wasn’t my everything ’til we were nothing' },
    { start: 44, end: 48, text: 'And it’s taking me a lot to say' },
    { start: 48, end: 53, text: 'Now that he’s gone, my heart is missing something' },
    { start: 53, end: 57, text: 'So it’s time I push my pride away' },
    { start: 57, end: 60, text: '’Cause you are, you are' },
    { start: 60, end: 63, text: 'You are my everything' },
    { start: 63, end: 66, text: 'You are, you are' },
    { start: 66, end: 69, text: 'You are my everything' },
    { start: 69, end: 70, text: '♫ Instrumental ♫' },
    { start: 70, end: 76, text: 'I know you’re not far, but I still can’t handle all the distance' },
    { start: 76, end: 80, text: 'You’re traveling with my heart' },
    { start: 80, end: 84, text: 'I hope this is a temporary feeling' },
    { start: 84, end: 87, text: '’Cause it’s too much to bear without you' },
    { start: 87, end: 90, text: 'And I know sorry ain’t the cure' },
    { start: 90, end: 94, text: 'If I cross your mind, just know I’m yours' },
    { start: 94, end: 97, text: '’Cause what we got is worth fighting for' },
    { start: 97, end: 99, text: '’Cause you are' },
    { start: 99, end: 103, text: 'You weren’t my everything ’til we were nothing' },
    { start: 103, end: 107, text: 'And it’s taking me a lot to say' },
    { start: 107, end: 112, text: 'Now that you’re gone, my heart is missing something' },
    { start: 112, end: 116, text: 'So it’s time I push my pride away' },
    { start: 116, end: 119, text: 'You are, you are' },
    { start: 119, end: 122, text: 'You are my everything' },
    { start: 122, end: 126, text: 'You are, you are' },
    { start: 126, end: 129, text: 'You are my everything' },
    { start: 129, end: 133, text: '♫ Instrumental ♫' },
    { start: 133, end: 140, text: 'Ooh, hmm, ha, yeah' },
    { start: 140, end: 147, text: 'You are, you are, you are, ooh' },
    { start: 147, end: 161, text: 'You are, you are, you are' },
    { start: 161, end: 164, text: '♫ Instrumental ♫' },
    { start: 164, end: 180, text: 'My everything' }
  ];
  App.photoKitaBlurLyrics = [
    { start: 0, end: 9, text: '♫ Instrumental ♫' },
    { start: 9, end: 13, text: 'Shh' },
    { start: 13, end: 25, text: '♫ Instrumental ♫' },
    { start: 25, end: 30, text: 'Foto kita blur, tak banyak yang kulihat' },
    { start: 30, end: 32, text: '♫ Instrumental ♫' },
    { start: 32, end: 35, text: 'Foto kita blur' },
    { start: 35, end: 42, text: 'Tapi banyak yang aku ingat' },
    { start: 42, end: 49, text: 'Foto kita blur, kita pernah begitu dekat' },
    { start: 49, end: 54, text: 'Foto kita blur, kini memorinya ku dekat' },
    { start: 54, end: 59, text: 'Pernah ada hati merah muda terbang-terbang di atas kepala' },
    { start: 59, end: 67, text: 'Lompat-lompat kegirangan lalu duduk-duduk manis di pipimu' },
    { start: 67, end: 73, text: 'Juga titik dua tanda bintang dengan banyak tanda-tanda seru' },
    { start: 73, end: 80, text: 'Tanpa banyak tanda tanya sering kita saling kirim cium jauh' },
    { start: 80, end: 84, text: 'Memilih nama panggilan mesra' },
    { start: 84, end: 87, text: 'Kamu Blueberry dan aku Pastry' },
    { start: 87, end: 94, text: 'Nama depanmu, nama belakangku jadi nama toko roti' },
    { start: 94, end: 97, text: 'Tertutup dengan satu trik sulap' },
    { start: 97, end: 101, text: 'Kau bisa hilang secepat kilat' },
    { start: 101, end: 107, text: 'Ingin aku tepuk tangan, tapi belum juga melihatmu kembali' },
    { start: 107, end: 113, text: 'Foto kita blur, tak banyak yang kulihat' },
    { start: 113, end: 120, text: 'Foto kita blur, tapi banyak yang aku ingat' },
    { start: 120, end: 127, text: 'Foto kita blur, kita pernah begitu dekat' },
    { start: 127, end: 134, text: 'Foto kita blur, kini memorinya ku dekat' },
    { start: 134, end: 162, text: '♫ Instrumental ♫' },
    { start: 162, end: 165, text: 'Foto kita blur, tak banyak yang aku lihat' },
    { start: 165, end: 169, text: 'Foto kita blur, tapi banyak yang aku ingat' },
    { start: 169, end: 176, text: 'Foto kita blur, kita pernah begitu dekat, dekat' },
    { start: 176, end: 179, text: 'Foto kita blur, tak banyak yang aku lihat' },
    { start: 179, end: 182, text: 'Foto kita blur, tapi banyak yang aku ingat' },
    { start: 182, end: 190, text: 'Foto kita blur, kini memorinya ku dekat, dekat' },
    { start: 190, end: 196, text: 'Tangisan jelas aku lihat' },
    { start: 196, end: 203, text: 'Senyum yang pernah hiasi duniaku' },
    { start: 203, end: 209, text: 'Masih jelas aku teringat' },
    { start: 209, end: 216, text: 'Bagaimana hariku pernah kelabu' },
    { start: 216, end: 223, text: 'Foto kita blur, tak banyak yang aku lihat' },
    { start: 223, end: 230, text: 'Foto kita blur, tapi banyak yang aku ingat' },
    { start: 230, end: 237, text: 'Foto kita blur, kita pernah begitu dekat' },
    { start: 237, end: 244, text: 'Foto kita blur, kini memorinya ku dekat' },
    { start: 244, end: 280, text: '♫ Instrumental ♫' },
  ];
  App.musicTracks[0].lyrics = App.myEverythingLyrics;
  App.musicTracks[1].lyrics = App.songLyrics;
  App.musicTracks[2].lyrics = App.photoKitaBlurLyrics;
  /** Initializes only the features present on the current standalone page. */
  App.init = function () { App.Storage.load(); App.Router.init(); App.Modal.init(); App.Login.init(); App.LoveMeter.init(); App.Music.init(); App.Gallery.init(); App.Wishes.init(); App.Dashboard?.init(); App.Invitation?.init(); App.SurpriseChoice?.init(); App.Flower?.init(); App.Gift?.init(); App.Animation.addLoveFloaties(); App.renderInvitation(); App.renderFacts(); const letter = document.getElementById('letter-content'); if (letter) App.Animation.typewriter(letter, App.config.letter); };
  /** Renders static invitation content. */
  App.renderInvitation = function () { const name = document.getElementById('invitation-name'); if (name) { name.textContent = App.config.recipientName; const message = document.getElementById('invitation-message'); if (message) message.textContent = App.config.invitationMessage; const date = document.getElementById('invitation-date'); if (date) { date.textContent = new Date(App.config.birthdayDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); if (!document.getElementById('invitation-signature')) { const signature = document.createElement('p'); signature.id = 'invitation-signature'; signature.className = 'invitation-signature'; signature.textContent = '-andaa'; date.insertAdjacentElement('afterend', signature); } } } if (document.getElementById('birthday-countdown')) App.Animation.countdown('birthday-countdown', App.config.birthdayDate); };
  /** Renders the fact data collection. */
  App.renderFacts = function () { const list = document.getElementById('fact-list'); if (!list) return; list.className = 'gallery-grid fact-gallery'; list.innerHTML = App.funFacts.map((fact, i) => `<button class="gallery-item fact-card" type="button" data-fact-index="${i}"><img src="${fact.image}" alt="${fact.title}"><span><strong>Fact ${i + 1}: ${fact.title}</strong><small>${fact.description}</small></span></button>`).join(''); list.addEventListener('click', event => { const card = event.target.closest('[data-fact-index]'); if (!card) return; const fact = App.funFacts[Number(card.dataset.factIndex)]; App.Modal.open(`<img src="${fact.image}" alt="${fact.title}"><h2>${fact.title}</h2><p>${fact.description}</p>`); }); };
  document.addEventListener('DOMContentLoaded', App.init);
}(window.BirthdayApp));
