/* ===========================================================================
   D & G — Alignment Day: satu-satunya sumber isi.

   Semua yang halaman ini dan versi teksnya ucapkan ada di sini. Edit file ini
   saja; `js/render.js` mengubahnya jadi halaman, dan `tools/` mengubahnya jadi
   `alignmentday.md`.

   Isi ditulis dalam Bahasa Indonesia (boleh ada kata Inggris di mana wajar).

   Bentuk
   ------
   ALIGNMENT_DAY = {
     meta:  { docTitle, kicker, title, subtitle, dName, gName, intro[], legend[] },
     pause: { title, desc, steps[], lineIntro, line, reassurance },
     parts: [ Part, ... ]
   }

   Part = {
     id,                          // slug tetap — kunci progress bagian ini.
                                  //   Jangan dipakai ulang / diganti maknanya.
     open?,                       // true => terbuka saat dibuka (hanya "start")
     title, meta, lead, why,
     body: [ Item, ... ]          // dirender urut dari atas ke bawah
   }

   Nomor bagian yang tampil (00, 01, …) = posisi di array `parts`. Ubah urutan
   array untuk mengubah urutan halaman; tidak ada yang lain yang perlu diubah.

   Item.kind salah satu dari:
     "section"    { title, intro?, items:[Item,...] }   -> .block + <h3>
     "do"         { tag?, text?:[], list?:{ordered?,items:[]}, twocol?:[{who,text}], scale?:[{n,text}] }
     "note"       { tag?, text?:[], list?:[], textAfter?:[] }
     "questions"  { list:[{ tense?, text, hint?, shape? }] }   tense: "six" | "now" | "ahead"
     "models"     { list:[{ name, desc, worksWhen, strainsWhen }] }
     "map"        { intro?, scale:[{n,text}], outro?, list:[ string, ... ] }
     "sort"       { list:[{ name, text }] }
     "text"       { html }                              -> <p class="hint">
     "closeNote"  { html }
     "sig"        { text }

   HTML inline yang boleh dipakai di teks: <strong>, <em>, <br>. Selain itu tidak.
   =========================================================================== */

(typeof window !== "undefined" ? window : globalThis).ALIGNMENT_DAY = {

  meta: {
    docTitle: "D & G — Alignment Day",
    kicker: "Privat · Cuma buat kita berdua",
    title: "Yang aku mau, yang kamu mau, yang kita mau",
    subtitle: "Biar kita benar-benar saling tahu — bukan cuma menebak",
    dName: "D",
    gName: "G",
    intro: [
      `Kita udah punya enam bulan bukti nyata soal siapa kita saat bersama — bukan tebakan, bukan harapan, tapi yang benar-benar terjadi. Hari ini kita duduk dan melihatnya baik-baik, bareng.`,
      `<strong>Ini bukan ujian yang bisa gagal.</strong> Ini cara buat ganti asumsi kita satu sama lain dengan hal yang benar-benar diucapkan. Tujuannya sederhana: aku jadi tahu apa yang aku mau, kamu tahu apa yang kamu mau, dan kita berdua tahu apa yang kita mau sebagai partner. Tiap pertanyaan di sini buat kita berdua.`
    ],
    legendTitle: "Cara baca halaman ini",
    legend: [
      { type: "tick",         text: `<strong>Pertanyaan.</strong> Kartu putih dengan kotak. Kita berdua jawab — ketuk kotaknya kalau sudah dua-duanya.` },
      { type: "do",           text: `<strong>Instruksi.</strong> Kotak garis putus-putus. Biasanya: tulis sendiri-sendiri dulu, baru dibandingkan.` },
      { type: "note",         text: `<strong>Cara menjaga bagian ini tetap aman.</strong> Kotak hijau. Bacakan keras-keras sebelum mulai.` },
      { type: "tense", tense: "six",   label: "Enam bulan", text: `Pertanyaannya soal apa yang sudah terjadi di antara kita.` },
      { type: "tense", tense: "now",   label: "Sekarang",   text: `Soal kondisi kita hari ini.` },
      { type: "tense", tense: "ahead", label: "Ke depan",   text: `Soal kehidupan yang kita bayangkan bareng.` },
      { type: "tense-dashed", label: "Coba bilang begini", text: `Contoh kalimat, di beberapa pertanyaan, biar hal yang sulit lebih gampang dimulai.` }
    ]
  },

  pause: {
    title: "Kita jeda dulu",
    desc: "Nggak perlu alasan. Berhenti di sini nggak ngerusak apa-apa.",
    steps: [
      `Hentikan topiknya di titik itu. Nggak usah selesaikan kalimatnya.`,
      `Minimal sepuluh menit, terpisah. Minum air.`,
      `Yang minta jeda yang bilang kapan siap lanjut — bukan yang satunya.`,
      `Balik lagi, dan ceritakan apa yang kamu rasakan, bukan apa yang dia lakukan.`,
      `Kalau masih terlalu berat, tunda topiknya ke lain hari dan lanjut ke bagian berikutnya. Itu boleh, dan bukan kegagalan.`
    ],
    lineIntro: "Kalimat yang bisa dipakai siapa pun, kapan pun:",
    line: `“Itu vonis, bukan pertanyaan. Bisa kita ulang?”`,
    reassurance: `Dan yang kita janjikan di awal: kejujuran dihargai, bukan dihukum. Apa pun yang diomongin hari ini nggak dipakai buat nyerang nanti.`
  },

  parts: [

    /* ——— Sebelum kita mulai ——— */
    {
      id: "start", open: true,
      title: "Sebelum kita mulai",
      meta: "Bacakan keras-keras",
      lead: "Aturannya lebih penting daripada pertanyaannya.",
      why: `Obrolan kayak gini nggak gagal karena isinya. Gagalnya kalau buru-buru, atau kalau salah satu dari kita nggak cukup aman buat ngomong versi yang jujur. Kalau bagian ini beres, sisanya jalan. Kalau dilewatin, kita cuma dapat obrolan buru-buru dengan pertanyaan yang lebih bagus.`,
      body: [
        {
          kind: "section", title: "Cara hari ini berjalan",
          items: [
            { kind: "do", list: { ordered: false, items: [
              `Dua buku catatan dan dua pulpen. Beberapa bagian minta kita nulis sendiri-sendiri dulu — itu cuma jalan di kertas.`,
              `HP disingkirkan kecuali halaman ini. Kita berdua, bukan cuma satu.`,
              `Istirahat beneran kalau butuh. Nggak ada yang harus selesai hari ini, dan kita boleh berhenti di tengah lalu lanjut lain hari.`,
              `Bacakan kotak hijau di awal tiap bagian keras-keras sebelum mulai.`
            ] } }
          ]
        },
        {
          kind: "section", title: "Lima aturan",
          items: [
            { kind: "questions", list: [
              { text: `Kita berdua menjawab semuanya.`, hint: `Kalau satu orang cuma nanya, ini bukan obrolan lagi — jadi wawancara.` },
              { text: `Penasaran dulu, baru penilaian.`, hint: `Respons pertama atas apa pun yang kita dengar adalah pertanyaan, bukan reaksi. "Cerita lebih banyak dong" sebelum "Aku nggak suka itu."` },
              { text: `Siapa pun boleh minta jeda, tanpa alasan.`, hint: `Tombol Jeda di bawah layar. Jeda itu bukan menghindar.` },
              { text: `Nggak ada yang diputuskan karena capek.`, hint: `Kalau salah satu ngalah cuma biar cepat selesai, kita nggak sepakat soal apa pun — cuma nunda sambil nambah kesal.` },
              { text: `Kejujuran diberi terima kasih, bukan dihukum.`, hint: `Cukup penting sampai dapat kotaknya sendiri, di bawah.` }
            ] }
          ]
        },
        {
          kind: "note", tag: "Catatan — ucapkan ini keras-keras, bareng",
          text: [ `<strong>Klausul amnesti.</strong> Semua yang kita ucapkan hari ini — soal masa lalu, ketakutan, hal yang belum pernah dibilang — diberikan secara sukarela. Ini hadiah, bukan pengakuan dosa. Jadi sebelum Bagian 01 kita sepakat:` ],
          list: [
            `Apa yang diceritakan hari ini nggak dilempar balik nanti, pas berantem atau di mana pun.`,
            `Jujur soal sesuatu nggak pernah bikin masalahnya lebih besar dibanding kalau disembunyiin. Kalau kejujuran dihukum di sini, kita cuma ngajarin satu sama lain buat berhenti jujur.`,
            `Nanya buat paham itu boleh. Menuntut nggak. Siapa pun boleh bilang <em>"itu vonis, bukan pertanyaan"</em> dan yang lain mengulang tanpa berdebat soal adil atau nggak.`,
            `Nggak ada yang perlu membela diri soal siapa kita sebelum kenal.`,
            `Nggak boleh ada yang pulang hari ini sambil menyesal udah ngomong terlalu banyak. Kalau itu terjadi, hari ini gagal — apa pun hasilnya.`
          ]
        },
        {
          kind: "section", title: "Satu-satu, sebelum kita mulai",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Sebutkan satu kebiasaanmu sendiri, waktu lagi ngobrol serius, yang bikin pasanganmu jadi malas lanjut cerita atau memilih diam.`, hint: `Yang <em>kamu</em> lakukan, bukan yang dia lakukan. Contoh: kamu jadi diam, jadi defensif, jadi terlalu logis, kelihatan tersinggung sampai dia berhenti cerita biar nggak nyakitin kamu, sibuk menjelaskan bukan mendengar, atau melempar candaan buat menghindar. Sebutkan sendiri sekarang biar nanti kita berdua bisa saling mengingatkan tanpa terasa seperti serangan.`, shape: `“Kalau aku merasa ___, aku cenderung ___, dan aku tahu itu bikin kamu jadi nggak mau lanjut cerita.”` },
              { tense: "now", text: `Apa yang paling kamu harapkan dari hari ini, dan apa yang paling kamu takutkan?` }
            ] }
          ]
        }
      ]
    },

    /* ——— Enam bulan kita ——— */
    {
      id: "six-months",
      title: "Enam bulan kita",
      meta: "Menengok ke belakang · dengan jujur",
      lead: "Sebelum ngomongin hidup yang kita mau, kita lihat dulu hidup yang sudah kita jalani.",
      why: `Enam bulan itu data nyata, dan sebagian besar yang perlu kita tahu sudah ada di dalamnya. Semua yang kita ucapkan soal masa depan itu tebakan; ini satu-satunya bagian hari ini yang kerja pakai bukti. Kalau di sini kita jujur, sisa harinya jauh lebih gampang.`,
      body: [
        {
          kind: "section", title: "Garis waktu",
          items: [
            { kind: "do", text: [ `Sendiri-sendiri, tanpa ngobrol, masing-masing nulis <strong>tiga momen terbaik</strong> dan <strong>dua momen tersulit</strong> dari enam bulan ini. Momennya aja — belum pakai penjelasan. Baru dibandingkan.` ] },
            { kind: "questions", list: [
              { tense: "six", text: `Apakah daftar kita berdua beririsan?`, hint: `Momen yang satu tandai sebagai terbaik tapi satunya nggak ingat sama sekali itu lebih berharga daripada sejam berteori.` },
              { tense: "six", text: `Apa kesamaan momen-momen terbaik? Apa kesamaan momen-momen sulit?`, hint: `Cari bahannya, bukan kejadiannya. Waktu berdua? Merasa dipilih? Lagi ditekan dari luar?` },
              { tense: "now", text: `Momen sulit yang mana yang kita berdua anggap selesai, dan yang mana yang diam-diam masih terbuka?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Apa yang kita salah kira soal satu sama lain",
          items: [
            { kind: "questions", list: [
              { tense: "six", text: `Apa yang kamu asumsikan tentang aku di awal yang ternyata nggak benar?` },
              { tense: "now", text: `Apa yang akhirnya kamu suka dari aku yang awalnya nggak kamu sadari?` },
              { tense: "now", text: `Apa yang sekarang kamu tahu tentang aku yang masih kamu sesuaikan?`, hint: `Bukan keluhan — penyesuaian. Ada bedanya dan kita berdua harus mendengarnya begitu.`, shape: `“Aku nggak menyangka ___. Aku nggak kesal soal itu, aku masih cari cara buat ___.”` }
            ] }
          ]
        },
        {
          kind: "section", title: "Yang nggak terucap",
          items: [
            { kind: "note", tag: "Catatan — aturan khusus blok ini",
              text: [ `Kalau salah satu dari kita cerita sesuatu yang selama ini ditelan, satu menit pertama yang dengar <strong>cuma</strong> boleh merespons dengan: satu pertanyaan klarifikasi, dan "makasih udah cerita." Nggak boleh membela diri, nggak nambah konteks, nggak "tapi kamu juga…". Kita balik dan merespons dengan benar setelah kita berdua sama-sama selesai.` ] },
            { kind: "questions", list: [
              { tense: "six", text: `Sesuatu yang aku telan daripada aku bilang.`, shape: `“Waktu ___ terjadi, aku merasa ___, dan aku nggak bilang karena ___.”` },
              { tense: "six", text: `Momen aku bilang "nggak apa-apa" padahal apa-apa.` },
              { tense: "now", text: `Sesuatu yang aku pengin lebih banyak tapi nggak pernah aku minta.`, shape: `“Yang aku mau lebih banyak adalah ___, dan bentuknya kira-kira ___.”` },
              { tense: "now", text: `Apa yang bikin diam terasa lebih aman?`, hint: `Ini yang penting. Apa pun jawabannya, itu sesuatu yang kita bangun bareng — bukan kekurangan orang yang milih diam.` }
            ] }
          ]
        },
        {
          kind: "section", title: "Polanya",
          items: [
            { kind: "questions", list: [
              { tense: "six", text: `Pertengkaran apa yang terus kita ulang cuma dengan baju berbeda?`, hint: `Topiknya beda tiap kali, tapi rasanya sama di bawahnya. Sebutkan perasaannya.` },
              { tense: "now", text: `Apa yang hampir selalu memicunya — situasinya, bukan orangnya?`, hint: `Capek, jarak, lagi rame orang, rencana berubah mendadak, salah satu lagi sibuk.` },
              { tense: "now", text: `Siapa yang biasanya gerak duluan buat benerin, dan apa itu terasa adil buat kita berdua?`, hint: `Kalau orang yang sama terus yang memperbaiki, orang itu sedang mengeluarkan sesuatu. Sebutkan apa harganya buat dia.` },
              { tense: "ahead", text: `Selama enam bulan, polanya membaik, memburuk, atau tetap — dan arahnya ke mana?`, hint: `Arah lebih penting daripada posisi sekarang. Hal sulit yang pelan-pelan membaik itu beda banget sama yang stabil.` }
            ] }
          ]
        }
      ]
    },

    /* ——— Waktu bersama, waktu terpisah ——— */
    {
      id: "time",
      title: "Waktu bersama, waktu terpisah",
      meta: "Quality time · online dan tatap muka",
      lead: "Kita nggak tinggal bareng. Hampir tiap jam yang kita dapat itu jam yang seseorang sengaja luangkan.",
      why: `Pasangan yang tinggal bareng dapat waktu tanpa sengaja — mereka di dapur yang sama. Kita nggak. Tiap telepon, tiap perjalanan, tiap malam yang dijaga itu ada karena salah satu dari kita membangunnya. Itu bikin bagian ini jadi area di mana kita paling gampang menjauh tanpa sadar, dan di mana kebiasaan kecil yang diulang setahun diam-diam jadi keseluruhan hubungan. Bagian ini soal seberapa banyak kita dapat satu sama lain dan rasanya gimana. Bagian 03 soal apa yang terjadi di dalam waktu itu waktu lagi kacau — itu pertanyaan yang berbeda.`,
      body: [
        { kind: "note", tag: "Catatan — jebakan di bagian ini",
          text: [ `Gampang banget bagian ini berubah jadi satu orang membela jadwalnya sementara satunya menyebut daftar kekesalan. Kita berdua punya kerjaan, kita berdua punya orang yang butuh kita, dan kita berdua pernah jadi yang nggak fokus. Tiap pertanyaan di sini dijawab kita berdua, bahkan kalau kelihatannya jelas soal salah satu aja.` ] },
        {
          kind: "section", title: "Seperti apa sebenarnya waktu kita",
          items: [
            { kind: "do", text: [ `Sendiri-sendiri, masing-masing menjumlah <strong>minggu lalu</strong>, bukan minggu ideal: jam ketemu langsung · jam telepon atau video · jam chat · dan rentang terlama tanpa kontak beneran. Baru dibandingkan.` ] },
            { kind: "questions", list: [
              { tense: "now", text: `Dari jam-jam itu, mana yang terasa benar-benar bareng, dan mana yang terasa kayak nelepon sambil ngerjain hal lain?`, hint: `Ini inti pembeda yang jadi poros bagian ini. Kuantitas dan kualitas itu ukuran yang berbeda dan kita harus berhenti menyamakannya.` },
              { tense: "now", text: `Apa yang bikin satu jam bareng terasa penuh buat kamu? Apa yang bikin terasa kosong?`, shape: `“Terasa penuh kalau kita ___. Terasa kosong kalau ___.”` }
            ] }
          ]
        },
        {
          kind: "section", title: "Apa yang masing-masing butuhkan",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Seberapa sering kamu butuh ketemu aku langsung biar merasa oke? Jujur, jangan sok murah hati.` },
              { tense: "now", text: `Sebenarnya seberapa banyak kontak harian yang kamu mau? Kalau lebih sedikit, itu masalah atau justru lega?`, hint: `Mau kontak lebih sedikit bukan berarti mau lebih sedikit satu sama lain. Tapi kalau salah satu mengartikannya begitu, kita perlu tahu itu sekarang.` },
              { tense: "now", text: `Jenis kontak apa yang mengisi kamu — telepon panjang, tanya kabar singkat, voice note, ngerjain sesuatu bareng lewat video, dichat di tengah hari?` },
              { tense: "now", text: `Setelah hari yang berat, kamu mau ditemani atau mau ruang? Gimana yang satunya tahu yang mana?` },
              { tense: "six", text: `Dalam enam bulan terakhir, kapan kamu merasa paling jauh dari aku — bahkan di hari kita ngobrol?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Waktu kita bareng tapi nggak benar-benar bareng",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Apa yang menarik kamu menjauh waktu kita bareng — HP, kerjaan, capek, orang lain, pikiranmu sendiri?`, hint: `Dua-duanya jawab. Nggak ada jawaban yang berupa pengakuan dosa; itu cuma masalah berbeda dengan solusi berbeda.` },
              { tense: "now", text: `Waktu aku nggak fokus pas kita bareng, apa yang kamu rasakan — dan apa yang mulai kamu bilang ke diri sendiri soal artinya?`, hint: `Sebutkan perasaan dan ceritanya terpisah. Ceritanya biasanya bagian yang menyakitkan, dan biasanya bukan itu maksud orang satunya.`, shape: `“Kalau ___ terjadi, aku merasa ___, dan aku mulai percaya itu artinya ___. Yang aku perlu tahu dari kamu adalah ___.”` },
              { tense: "now", text: `Apa bedanya "aku beneran lagi sibuk sekarang" dan "kamu bukan prioritas" — dan gimana kita saling kasih tahu yang mana?`, hint: `Sepakati satu frasa yang nyata. Sinyal yang punya nama mengubah luka jadi urusan logistik.` },
              { tense: "six", text: `Apa yang masing-masing dari kita korbankan buat menyediakan waktu buat yang satunya — dan apa yang satunya tahu soal itu?` },
              { tense: "now", text: `Apakah salah satu dari kita pernah merasa yang satunya nggak menganggap serius komitmen kita?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Menjaganya",
          intro: `Salah satu dari sedikit tempat hari ini di mana kesepakatan nyata memang tersedia. Ambil.`,
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Jam-jam mana tiap minggu yang jadi milik kita dan nggak boleh diganggu? Sebutkan jam yang nyata, bukan angka.` },
              { tense: "ahead", text: `Apa yang dihitung sebagai alasan nyata buat melanggarnya?`, hint: `Tetapkan sekarang, selagi nggak ada yang kesal.` },
              { tense: "ahead", text: `Apa sinyal yang kita kasih waktu terpaksa melanggarnya, dan yang satunya harus ngapain dengan sinyal itu?` },
              { tense: "ahead", text: `Kalau waktu yang dijaga terus dilanggar, kita harus ngapain — sebelum jadi pertengkaran?` },
              { tense: "now", text: `Gimana kita mengakhiri telepon atau kunjungan dengan baik? Apa yang bikin perpisahan lebih berat dari yang seharusnya?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Jaraknya itu sendiri",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Apa bagian tersulit dari berjauhan, buat masing-masing dari kita sekarang?` },
              { tense: "ahead", text: `Berapa lama kita perkirakan hidup terpisah, dan apa rencananya — siapa yang pindah, dan kapan?`, hint: `Tanggal akhir yang nggak disebut itu punya tekanannya sendiri. Perkiraan kasar pun membantu.` },
              { tense: "ahead", text: `Apa yang berubah kalau tinggal di kota yang sama — yang <em>lebih baik</em> maupun yang lebih buruk?`, hint: `Jarak menyembunyikan sebagian masalah dan menciptakan yang lain. Sebagian hal yang kita suka dari kita mungkin produk dari jarak, dan penting tahu bagian yang mana.` },
              { tense: "ahead", text: `Waktu kita akhirnya tinggal bareng, kamu mau minggu biasa itu kelihatan gimana?` },
              { tense: "ahead", text: `Berapa banyak waktu sendiri yang masing-masing butuh biar tetap waras, dan seberapa ramai kita mau hidup kita?` }
            ] }
          ]
        }
      ]
    },

    /* ——— Cara kita memperlakukan satu sama lain ——— */
    {
      id: "conflict",
      title: "Cara kita memperlakukan satu sama lain",
      meta: "Konflik · perbaikan · rasa hormat",
      lead: "Hampir nggak ada yang pergi karena satu perbedaan pendapat. Mereka pergi karena cara perbedaan pendapat itu ditangani, seribu kali.",
      why: `Bagian 02 soal seberapa banyak kita dapat satu sama lain. Yang ini soal apa yang terjadi <em>di dalam</em> waktu itu — apalagi waktu lagi kacau. Semua topik lain di halaman ini pada dasarnya bisa dihindari. Yang ini nggak bisa: apa pun yang kita sepakati soal uang atau keluarga atau tempat tinggal, kita menjalaninya dengan dua temperamen ini, dalam dua bahasa ini, selamanya.`,
      body: [
        {
          kind: "section", title: "Apa yang masing-masing lakukan waktu terluka",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Waktu kamu terluka, apa insting pertamamu — jadi diam, jadi keras, jadi logis, pergi, langsung mau benerin, bercanda?` },
              { tense: "six", text: `Dalam enam bulan terakhir, apa cara terburuk kamu menghadapi rasa terluka karena aku?`, hint: `Momen terburukmu sendiri, bukan punya dia. Mulai duluan dengan ini mengubah keseluruhan blok.` },
              { tense: "now", text: `Berapa lama kamu butuh sebelum bisa ngobrol dengan benar lagi, dan apa yang kamu butuhkan selama waktu itu?` },
              { tense: "now", text: `Apa yang aku lakukan yang bantu kamu lebih cepat tenang? Apa yang bikin lebih parah?` },
              { tense: "now", text: `Apakah berantem lewat chat atau telepon mengubah cara salah satu dari kita bersikap?`, hint: `Perlu disebut: di jarak ini, sebagian besar konflik kita terjadi lewat layar. Itu medium yang berbeda dengan mode gagal yang berbeda — diam terbaca sebagai hukuman, nada hilang, dan salah satu dari kita bisa saja berhenti bales.` }
            ] }
          ]
        },
        {
          kind: "section", title: "Akui punyamu dulu",
          items: [
            { kind: "do", text: [
              `Sendiri-sendiri, masing-masing nulis <strong>dua hal yang aku lakukan pas berantem yang mengakhiri obrolan</strong> — punyaku sendiri. Lalu di bawahnya, <strong>dua hal yang orang satunya lakukan</strong> yang bikin aku menutup diri.`,
              `Kita berdua baca daftar <em>sendiri</em> dulu, dua-duanya, sebelum salah satu baca daftar kedua. Urutannya itu seluruh intinya.`
            ] },
            { kind: "questions", list: [
              { tense: "now", text: `Ada nggak hal di daftar dia soal aku yang aku beneran nggak sadar aku lakukan?` },
              { tense: "ahead", text: `Satu hal apa, kalau aku berhenti melakukannya, yang paling mengubah pertengkaran kita?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Perbaikan",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Gimana kamu tahu kita udah baik lagi? Apa momen nyatanya buat kamu?` },
              { tense: "six", text: `Siapa yang biasanya gerak duluan? Apa itu peran yang diam-diam diterima salah satu dari kita?` },
              { tense: "now", text: `Jenis permintaan maaf apa yang benar-benar nyampe buat kamu — kata-kata, perilaku yang berubah, kedekatan, waktu, ditanyai lagi soal itu nanti?` },
              { tense: "six", text: `Ada nggak sesuatu dari enam bulan terakhir yang nggak pernah benar-benar diperbaiki — cuma dilewati waktu?`, shape: `“Kita nggak pernah benar-benar menutup ___. Yang aku masih butuh dari itu adalah ___.”` }
            ] }
          ]
        },
        {
          kind: "section", title: "Batas dasar",
          items: [
            { kind: "do",
              text: [ `Bukan cita-cita — garis yang nggak dilewati salah satu dari kita semarah apa pun. Telusuri daftarnya, sepakati, tambahkan, dan tulis versi finalnya di kedua buku catatan dengan tanggal hari ini.` ],
              list: { ordered: false, items: [
                `Penghinaan — mengolok, memutar mata, bicara ke satu sama lain seolah kita bodoh.`,
                `Memanggil dengan sebutan buruk, dan apa pun yang diucapkan buat melukai bukan buat menjelaskan.`,
                `Mengancam pergi atau mengakhiri hubungan demi memenangkan pertengkaran.`,
                `Membawa keluarga kita ke dalam pertengkaran antara kita berdua.`,
                `Diam melewati durasi yang disepakati — tentukan durasinya hari ini.`,
                `Menghilang di tengah pertengkaran tanpa bilang kita butuh jeda.`,
                `Memakai sesuatu yang diceritakan secara pribadi, termasuk apa pun yang diucapkan hari ini, sebagai senjata.`,
                `Apa pun yang bersifat fisik, selamanya.`
              ] } },
            { kind: "questions", list: [
              { tense: "ahead", text: `Apa lagi yang masing-masing mau ada di daftar ini?` },
              { tense: "ahead", text: `Kita ngapain kalau salah satu dari kita melewatinya?`, hint: `Tentukan jawabannya sekarang, dengan tenang. Harusnya jadi obrolan, bukan bencana.` }
            ] }
          ]
        },
        {
          kind: "section", title: "Rasa hormat, dalam tindakan",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Sebutkan tiga hal spesifik yang bikin kamu merasa dihormati oleh aku.`, hint: `Tindakan, bukan kata sifat. "Suportif" nggak kepakai. "Nanyain soal hal yang aku gugupkan, keesokan harinya" kepakai.` },
              { tense: "six", text: `Apa hal yang aku lakukan di depan orang lain yang kamu suka? Hal yang bikin kamu malu?` },
              { tense: "ahead", text: `Kita mau ngomongin satu sama lain gimana waktu yang satunya nggak ada di ruangan?` },
              { tense: "ahead", text: `Apa yang nilai-nilai kita minta dari kita dalam cara kita bicara ke satu sama lain — dan apa kita menjalaninya, atau cuma meyakininya?` }
            ] }
          ]
        }
      ]
    },

    /* ——— Batasan dengan orang lain ——— */
    {
      id: "boundaries",
      title: "Batasan dengan orang lain",
      meta: "Paham dulu, sepakat kemudian",
      lead: "Alasan dulu, kesepakatan kemudian — bukan sebaliknya.",
      why: `Aturan yang kamu nggak yakini itu aturan yang harus terus kamu ingat, bukan sekadar dijalani, dan mengingat pada akhirnya gagal — bukan karena tidak jujur, cuma karena manusia. Kalau kita bisa nemu alasan bersama di bawahnya, kita nggak perlu mengawasi apa pun. Kalau nggak nemu, itu hal paling penting yang bisa hari ini beri tahu kita, dan kita berdua lebih baik tahu sekarang daripada di tahun ketiga.`,
      body: [
        { kind: "note", tag: "Catatan — bacakan keras-keras sebelum mulai",
          text: [
            `Nggak ada dari kita yang sedang diadili. Kita berdua bawa sejarah, sekumpulan insting soal pertemanan, dan tingkat kenyamanan yang belum pernah benar-benar kita jelaskan ke satu sama lain.`,
            `Dua hal tetap benar buat seluruh bagian ini. <strong>Satu:</strong> nggak ada yang perlu minta maaf soal siapa teman-temannya sebelum kita kenal, atau soal apa pun yang terjadi sebelum ada kesepakatan di antara kita. <strong>Dua:</strong> kalau salah satu dari kita cemas soal ini, kecemasan itu buat <em>diucapkan</em>, bukan dipaksakan diam-diam. Mengawasi diam-diam merugikan hubungan lebih besar daripada pertemanan mana pun.`
          ] },
        {
          kind: "section", title: "Apa yang sebenarnya masing-masing lindungi",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Apa yang pertemananmu beri ke kamu yang bakal beneran kamu kangeni?`, hint: `Jawab jujur, atau kesepakatan yang kita tulis nanti bakal soal sesuatu yang kita berdua nggak paham.` },
              { tense: "now", text: `Sebenarnya kamu takut apa di sini? Sebutkan ketakutannya, bukan aturan yang lahir darinya.`, hint: `"Aku takut dipermalukan." "Aku takut dikendalikan." "Aku takut pelan-pelan kehilangan teman-temanku." "Aku takut nggak dipercaya apa pun yang aku lakukan." Semua ini nyata, dan nggak ada yang masalahnya sama.`, shape: `“Yang aku takutkan adalah ___. Yang aku butuhkan biar merasa oke adalah ___.”` },
              { tense: "now", text: `Batasan itu pagar yang melindungi sesuatu, atau kandang yang membatasi seseorang? Kapan batasan pernah terasa seperti masing-masing itu buat kamu?` },
              { tense: "six", text: `Ada nggak aturan di antara kita yang kamu patuhi tapi sebenarnya nggak pernah kamu setujui?`, hint: `Klausul amnesti berlaku keras di sini. Mengucapkan ini keras-keras adalah hal paling berguna yang bisa terjadi di bagian ini.` },
              { tense: "now", text: `Apa bedanya, buat kamu, antara batasan yang kamu patuhi karena kamu menyetujuinya dan batasan yang kamu patuhi karena kamu meyakininya?`, hint: `Jenis yang kedua bertahan tanpa ada yang mengecek. Jenis yang pertama nggak — dan itu bukan cacat karakter, cuma begitu cara kerja aturan pinjaman.` }
            ] }
          ]
        },
        {
          kind: "section", title: "Petanya",
          items: [
            { kind: "map",
              intro: `Sendiri-sendiri, di buku catatan, tulis <strong>1 sampai 12</strong> dan taruh angka di sebelah tiap poin:`,
              scale: [
                { n: "1", text: `Oke seperti apa adanya.` },
                { n: "2", text: `Oke, tapi bilang aku dulu.` },
                { n: "3", text: `Nggak nyaman.` }
              ],
              outro: `Nggak ada yang lihat daftar yang lain sampai dua-duanya selesai.`,
              list: [
                `Makan atau ngopi berdua dengan teman lawan jenis`,
                `Jadi satu-satunya orang dari gendermu di acara kumpul kelompok`,
                `Chat yang nggak akan ditunjukkan ke yang satunya`,
                `Chat larut malam`,
                `Tetap dekat dengan seseorang yang pernah punya perasaan ke kamu`,
                `Tetap dekat dengan seseorang yang pernah kamu sukai`,
                `Acara kantor, perjalanan dinas, dan nongkrong dengan rekan kerja`,
                `Kedekatan fisik dalam pertemanan — pelukan, duduk berdekatan`,
                `Cerita soal masalah hubungan kita ke teman itu`,
                `Media sosial — follow, like, pesan pribadi`,
                `Kenalan sama teman baru lawan jenis tanpa menyebutkannya`,
                `Pergi ke tempat yang kamu tahu bikin yang satunya nggak enak`
              ] },
            { kind: "questions", list: [
              { tense: "now", text: `Di mana dua daftar kita paling berjauhan?` },
              { tense: "now", text: `Buat tiap perbedaan: yang menandai lebih rendah bilang apa yang bakal dia korbankan kalau bergeser. Yang menandai lebih tinggi bilang apa yang dia lindungi.`, hint: `Kedua sisi diucapkan sebelum salah satu dari kita mengalah soal apa pun. Mengalah sebelum orang satunya paham harganya bukan kesepakatan — itu utang.`, shape: `“Buat aku ini ___ karena ___. Yang aku korbankan / yang aku lindungi adalah ___.”` },
              { tense: "now", text: `Ada nggak poin di mana jawaban kita menunjukkan kita membayangkan situasi yang benar-benar berbeda?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Preferensi atau keyakinan",
          items: [
            { kind: "note", tag: "Catatan — pertanyaan jujur di bagian ini",
              text: [ `Setelah kita masing-masing menjelaskan diri, kemungkinan masih ada jarak yang tersisa. Ada dua jenis yang sangat berbeda:` ],
              list: [
                `Jarak <strong>preferensi</strong> — kita mau jumlah yang berbeda dari hal yang sama. Ini bisa dirundingkan, dan kita berdua bisa bergeser tanpa kehilangan diri sendiri.`,
                `Jarak <strong>keyakinan</strong> — kita sebenarnya menganggap hal yang berbeda itu benar. Ini nggak bisa dirundingkan sampai hilang. Cuma bisa dibagi, atau diterima secara sadar dengan mata terbuka.`
              ],
              textAfter: [ `Masing-masing bilang jenis yang mana menurut kita ini <strong>soal diri sendiri</strong>, bukan soal yang lain. "Buat aku ini keyakinan." "Buat aku ini preferensi." Nggak ada yang mendiagnosis orang lain.` ] },
            { kind: "questions", list: [
              { tense: "ahead", text: `Kalau ini jarak keyakinan: apa masing-masing dari kita bisa hidup dengan yang satunya memegang keyakinan itu, jujur?`, hint: `Bukan "bisa nggak aku bikin dia berubah." Bisa nggak aku hidup dengan itu kalau dia nggak berubah.` },
              { tense: "ahead", text: `Kalau ini jarak preferensi: apa versi yang kita berdua bisa tinggali — bukan versi yang salah satu dari kita cuma bertahan di dalamnya?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Arah sebaliknya",
          intro: `Batasan itu kesepakatan dua arah atau jadi tali kekang. Blok ini soal apa yang harus diberikan balik oleh yang lebih cemas.`,
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Apa yang masing-masing butuhkan biar merasa <em>dipercaya</em>, bukan diatur?` },
              { tense: "ahead", text: `Apa harga dari mengecek, menguji, atau curiga diam-diam buat kita selama sepuluh tahun?`, hint: `Jawab serius. Itu harga yang nyata, dan jatuhnya ke hubungan — bukan cuma ke orang yang diawasi.` },
              { tense: "ahead", text: `Kalau salah satu dari kita menepati kesepakatan, apa yang harus yang satunya beri balik? Sebutkan sebagai komitmen yang spesifik.`, hint: `Contohnya: menyampaikan kekhawatiran lebih awal dan langsung, bukan menyimpannya; nggak mengungkit lagi hal yang sudah selesai; nggak menempelkan pola lama ke momen baru.` },
              { tense: "ahead", text: `Gimana salah satu dari kita menyampaikan kekhawatiran soal ini di masa depan tanpa jadi tuduhan? Sepakati kalimat pembukanya hari ini.`, shape: `“Ada sesuatu yang mengganjal dan aku lebih baik mengucapkannya daripada memikulnya. Ini soal ___.”` }
            ] }
          ]
        },
        {
          kind: "section", title: "Yang kita tulis",
          items: [
            { kind: "do", text: [ `Tulis tiga sampai enam baris, dengan kata-kata kita sendiri, yang kita <em>berdua</em> benar-benar setujui. Kalau salah satu dari kita menandatangani sesuatu yang nggak kita yakini, kita berhenti dan mundur — kesepakatan yang cuma diyakini satu orang lebih buruk daripada nggak ada, karena itu juga merusak buktinya.` ] },
            { kind: "questions", list: [
              { tense: "ahead", text: `Apa yang terjadi kalau salah satu dari kita melanggarnya?`, hint: `Tetapkan hari ini, dengan tenang, bahwa jawabannya adalah obrolan. Menetapkannya selagi nggak ada yang terluka adalah satu-satunya waktu itu bisa ditetapkan dengan adil.` },
              { tense: "ahead", text: `Kapan kita lihat ini lagi?`, hint: `Tiga bulan itu masuk akal. Meninjau ulang itu perawatan, bukan tanda masalah.` }
            ] }
          ]
        }
      ]
    },

    /* ——— Keluarga — kita dan mereka ——— */
    {
      id: "family",
      title: "Keluarga — kita dan mereka",
      meta: "Orang tua · saudara · anak",
      lead: "Belum ada dari ini yang datang. Justru itu kenapa gampang sepakat secara prinsip sekarang dan nemu jarak yang nyata belakangan.",
      why: `Kita berdua memikul kewajiban ke orang tua dan saudara yang kita terima sebelum kita kenal satu sama lain. Kewajiban itu akan datang lewat satu telepon suatu hari, dan pada saat itu nggak ada waktu buat berunding. Kita menentukan bentuknya selagi masih murah dan nggak ada yang lagi krisis.`,
      body: [
        {
          kind: "section", title: "Apa yang akan datang",
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Realistis, siapa di keluarga masing-masing yang akan butuh dukungan, dan kira-kira kapan?` },
              { tense: "ahead", text: `Jenis dukungan apa — uang, waktu, perawatan, atau tinggal bareng kita?` },
              { tense: "now", text: `Apa yang orang tuamu lakukan buat orang tua mereka, dan apa itu standar yang kamu rasa kamu pikul?`, hint: `Kebanyakan dari kita mewarisi kewajiban tanpa pernah menyetujuinya. Menyebutnya bukan berarti menolaknya.` },
              { tense: "ahead", text: `Ada saudara yang situasinya mungkin jadi urusan kita — biaya sekolah, utang, tempat tinggal?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Janji yang sudah dibuat",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Apa yang masing-masing dari kita sudah janjikan ke keluarga — terucap atau tersirat — yang yang satunya nggak tahu?`, hint: `Klausul amnesti. Ini umum dan bukan pengkhianatan. Ini hasil biasa dari jadi anak yang baik sebelum kamu jadi partner seseorang.` },
              { tense: "now", text: `Apa yang keluarga masing-masing harapkan dari orang yang kita nikahi?` },
              { tense: "ahead", text: `Di mana harapan-harapan itu bentrok dengan yang kita mau buat diri kita sendiri?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Batasnya",
          intro: `Menghormati orang tua dan dilahap oleh kewajiban itu adalah dua hal berbeda. Ini garis di antara keduanya.`,
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Berapa maksimal yang masing-masing dari kita bisa beri — angka dan frekuensi — tanpa merugikan rumah tangga kita sendiri?` },
              { tense: "ahead", text: `Apa kita memutuskan dukungan keluarga bareng, atau masing-masing mengurus keluarganya sendiri?`, hint: `Dua-duanya bisa jalan. Yang nggak bisa jalan itu salah satu mengira yang satu dan satunya mengira yang lain.` },
              { tense: "ahead", text: `Siapa yang bicara ke orang tua siapa waktu ada yang sulit?` },
              { tense: "ahead", text: `Apa salah satu dari kita mau tinggal dengan orang tua, atau mengajak mereka tinggal bareng kita? Berapa lama?` },
              { tense: "ahead", text: `Apa kata nilai-nilai kita soal kewajiban ke orang tua — dan gimana kita menghormatinya tanpa membiarkannya menentukan pernikahan kita?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Anak",
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Apa kita mau punya anak? Berapa, dan kira-kira kapan?` },
              { tense: "ahead", text: `Apa yang terjadi kalau kita nggak bisa, atau butuh bertahun-tahun?` },
              { tense: "ahead", text: `Kerjaan siapa yang mengalah waktu ada bayi, dan berapa lama? Apa dampaknya ke kesepakatan uang dari Bagian 06?` },
              { tense: "ahead", text: `Gimana kita membesarkan mereka — disiplin, agama, sekolah, bahasa?` },
              { tense: "ahead", text: `Seberapa terlibat orang tua kita, dan siapa yang menentukan itu?` },
              { tense: "ahead", text: `Satu hal dari cara kamu dibesarkan yang mau kamu pertahankan, dan satu yang nggak akan pernah kamu ulangi.` }
            ] }
          ]
        }
      ]
    },

    /* ——— Uang dan cara kita hidup ——— */
    {
      id: "money",
      title: "Uang dan cara kita hidup",
      meta: "Filosofi finansial · standar",
      lead: "Pertengkaran soal uang hampir nggak pernah soal uang. Itu soal rasa aman, kebebasan, dan keadilan.",
      why: `Kita belum berbagi rumah tangga, jadi belum ada yang teruji. Justru itu kenapa sekarang murah dan nanti mahal: nggak ada biayanya hari ini buat nemu kalau kita membayangkan hal yang berbeda, dan mahal banget menemukannya di tahun ketiga dengan rekening bersama dan cicilan rumah. Sebelum kita pilih sistem, masing-masing bilang mana dari ketiganya — rasa aman, kebebasan, keadilan — yang sebenarnya kita lindungi.`,
      body: [
        {
          kind: "section", title: "Apa yang sudah kita lihat",
          items: [
            { kind: "questions", list: [
              { tense: "six", text: `Sejauh ini gimana sebenarnya kita mengatur uang bareng — siapa bayar apa, dan pernah nggak terasa canggung?` },
              { tense: "six", text: `Apa salah satu dari kita pernah berasumsi soal pengeluaran yang satunya yang nggak pernah kita cek?` },
              { tense: "now", text: `Situasi keuangan apa yang paling kamu takut berakhir di dalamnya?`, shape: `“Yang aku lindungi adalah ___. Yang aku takutkan adalah ___.”` }
            ] }
          ]
        },
        {
          kind: "section", title: "Tiga keputusan, bukan satu",
          items: [
            { kind: "do",
              text: [ `"Gimana kita mengatur uang" itu tiga pertanyaan terpisah yang dipadatkan jadi satu, dan itu kenapa pasangan sering ngomong nggak nyambung. Sendiri-sendiri, masing-masing nulis jawaban insting buat ketiganya — apa pun yang muncul pertama, bukan versi diplomatis:` ],
              list: { ordered: true, items: [
                `<strong>Menghasilkan</strong> — siapa yang membawa pemasukan, dan apa yang terjadi kalau itu berubah?`,
                `<strong>Mengelola</strong> — siapa yang menjalankan harian: tagihan, pencatatan, keputusan di bawah jumlah tertentu?`,
                `<strong>Memiliki</strong> — tabungan itu punya siapa, dan siapa yang berhak bersuara soal yang besar?`
              ] },
              twocol: [
                { who: "D nulis", text: `Ketiganya, sendiri, tanpa diskusi dulu.` },
                { who: "G nulis", text: `Ketiganya, sendiri, tanpa diskusi dulu.` }
              ] },
            { kind: "questions", list: [
              { tense: "ahead", text: `Di mana insting kita cocok, dan di mana berbeda?` },
              { tense: "ahead", text: `Buat masing-masing: insting itu sesuatu yang kamu aktif inginkan, atau cuma yang kamu lihat sejak kecil?` },
              { tense: "ahead", text: `Apa salah satu dari kita percaya bahwa yang menghasilkan itu yang harusnya memutuskan?`, hint: `Bilang terus terang kalau jawabannya sebagian iya. Itu keyakinan yang umum, dan yang nggak terucap jauh lebih merusak daripada yang diucapkan.` }
            ] }
          ]
        },
        {
          kind: "section", title: "Empat cara pasangan menjalaninya",
          intro: `Nggak ada yang paling benar. Baca semuanya, lalu bilang mana yang paling dekat dan apa yang mau kita ubah.`,
          items: [
            { kind: "models", list: [
              { name: "Satu kolam penuh", desc: `Semua pemasukan ke satu rekening. Dua-duanya ambil dari situ. Nggak ada "uangku."`, worksWhen: `kepercayaan tinggi dan pemasukan bakal naik-turun seumur hidup.`, strainsWhen: `gaya belanja berbeda, atau satu orang mulai merasa diawasi.` },
              { name: "Iuran proporsional", desc: `Dua-duanya menyetor <em>persentase</em> pemasukan yang sama buat biaya bersama. Sisanya pribadi.`, worksWhen: `pemasukan nggak setara tapi dua-duanya mau bebannya terasa setara.`, strainsWhen: `yang berpenghasilan lebih rendah tetap berakhir dengan kebebasan yang jauh lebih sedikit secara nominal.` },
              { name: "Punyamu, punyaku, punya kita", desc: `Rekening bersama buat biaya rumah tangga dan tujuan bersama. Rekening pribadi tetap pribadi, nggak perlu penjelasan.`, worksWhen: `dua-duanya menghargai kemandirian dan dua-duanya berpenghasilan.`, strainsWhen: `salah satu berhenti berpenghasilan, atau "pribadi" diam-diam membesar sampai menutupi hal yang harusnya bersama.` },
              { name: "Operator dan pengelola", desc: `Satu pemasukan menutupi biaya jalan; satunya ditabung dan diinvestasikan, bukan dibelanjakan.`, worksWhen: `dua-duanya sepakat bagian yang ditabung itu milik <em>kita berdua</em>, dan bagian operasional nggak dianggap pekerjaan yang lebih penting.`, strainsWhen: `yang menabung merasa nggak berhak atas yang nggak dia belanjakan, atau yang mengoperasikan merasa seluruh nilainya cuma slip gaji.` }
            ] },
            { kind: "questions", list: [
              { tense: "ahead", text: `Mana yang paling dekat dengan yang masing-masing bayangkan, dan apa yang mau kita ubah?` },
              { tense: "ahead", text: `Di model mana pun yang kita condong ke sana: nama siapa di apa, dan siapa yang bisa lihat semuanya?` },
              { tense: "ahead", text: `Berapa jumlah yang di atasnya kita selalu tanya satu sama lain dulu?`, hint: `Pilih angka yang nyata hari ini. "Pembelian besar" bukan angka.` }
            ] }
          ]
        },
        {
          kind: "section", title: "Uji tekanan",
          intro: `Sebuah model cuma nyata kalau lolos dari ini. Telusuri satu per satu keras-keras.`,
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Salah satu dari kita kehilangan pemasukan selama enam bulan.` },
              { tense: "ahead", text: `Salah satu dari kita berpenghasilan tiga kali lipat yang satunya, permanen.` },
              { tense: "ahead", text: `Orang tua atau saudara butuh uang besar mendadak.` },
              { tense: "ahead", text: `Salah satu dari kita mau potong gaji demi kerjaan yang lebih berarti.` },
              { tense: "ahead", text: `Salah satu dari kita mau berhenti kerja untuk sementara.` }
            ] }
          ]
        },
        {
          kind: "section", title: `Jarak soal "normal"`,
          items: [
            { kind: "do", text: [
              `Sendiri-sendiri, masing-masing nulis seperti apa <strong>normal</strong> itu — dengan angka nyata sebisanya:`,
              `makan malam hari kerja · sekali jalan malam · liburan · sebuah HP · baju dalam sebulan · rumah yang kita tinggali lima tahun dari sekarang · berapa yang masuk tabungan sebelum apa pun.`
            ] },
            { kind: "note", tag: "Catatan — sebelum membandingkan",
              text: [ `Jarak dalam standar bukan cacat karakter ke arah mana pun — bukan pada yang mau lebih, bukan pada yang mau lebih sedikit. Yang menghancurkan pasangan itu jarak yang <strong>nggak terucap</strong> yang berubah jadi penghakiman diam di satu sisi dan rasa malu diam di sisi lain. Jadi kita sebut angkanya, bukan feeling-nya.` ] },
            { kind: "questions", list: [
              { tense: "now", text: `Di mana dua "normal" kita paling berjauhan?` },
              { tense: "ahead", text: `Siapa yang lebih merasakan jarak itu sehari-hari, dan apa sebenarnya harganya buat masing-masing dari kita buat bergeser mendekati yang lain?` },
              { tense: "now", text: `Ada nggak sesuatu yang orang satunya belanjakan yang diam-diam kamu hakimi?`, hint: `Sebutkan dengan halus, sekali, biar bisa dibicarakan alih-alih dipikul.`, shape: `“Waktu kamu belanja buat ___, aku sadar aku merasa ___. Aku lebih baik nanya daripada terus memikirkannya.”` },
              { tense: "ahead", text: `Apa kata nilai atau keyakinan kita soal apa yang kita utang, apa yang kita berikan, dan apa yang kita simpan — dan apa kita membacanya dengan cara yang sama?` }
            ] }
          ]
        }
      ]
    },

    /* ——— Pertumbuhan, dan apa yang perubahan lakukan ke kita ——— */
    {
      id: "growth",
      title: "Pertumbuhan, dan apa yang perubahan lakukan ke kita",
      meta: "Yang bikin nggak nyaman",
      lead: "Kita berdua akan jadi orang yang sedikit berbeda. Pertanyaannya apakah masing-masing dari kita bisa bertahan waktu yang satunya berubah.",
      why: `Semua bagian lain di halaman ini menggambarkan dua orang yang kita hari ini. Bagian ini satu-satunya yang bertanya soal dua orang yang kita nanti dalam sepuluh tahun — dan merekalah yang benar-benar harus tetap menikah. Kebanyakan pasangan yang menjauh nggak berbeda pendapat soal apa pun di daftar seperti ini. Salah satu dari mereka berubah, dan nggak ada yang pernah mengucapkan apa yang dia butuhkan kalau itu terjadi.`,
      body: [
        {
          kind: "section", title: "Bukti, bukan teori",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Ceritakan satu momen belakangan waktu hidupmu berubah drastis. Apa yang sebenarnya kamu lakukan?`, hint: `Bukan yang kamu ingin percaya bakal kamu lakukan. Yang kamu lakukan.` },
              { tense: "now", text: `Kamu jadi siapa untuk sementara selama itu — dan apa yang kamu butuhkan dari aku di versi dirimu itu?` },
              { tense: "six", text: `Apa salah satu dari kita sudah berubah dalam enam bulan ini dengan cara yang disadari yang satunya tapi nggak disebut?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Ke mana masing-masing menuju",
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Lima tahun dari sekarang: kerjaan, rumah, uang, kesehatan, keyakinan. Ucapkan keras-keras meski terasa terlalu dini.` },
              { tense: "ahead", text: `Apa harga jawaban orang satunya buat kamu?` },
              { tense: "ahead", text: `Realistis, karier masing-masing dari kita kelihatan gimana — apa salah satu dari kita di bidang dengan kurva lambat atau langit-langit rendah?`, hint: `Sebutkan bentuk sebenarnya. Karier yang mentok bukan kegagalan pribadi, tapi pura-pura itu nggak akan terjadi adalah cara itu berubah jadi kekesalan.` },
              { tense: "ahead", text: `Kita ngapain kalau salah satu dari kita beneran mentok, bertahun-tahun?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Kalau salah satu dari kita melangkah lebih jauh",
          items: [
            { kind: "note", tag: "Catatan — jalankan dua arah",
              text: [ `Ini pertanyaan yang kebanyakan pasangan lewati karena mengangkatnya terasa nggak setia. Padahal nggak. Anggap selama sepuluh menit bahwa salah satu dari kita berakhir dengan pemasukan, status, atau otoritas yang jauh lebih besar dari yang lain — dan jawab <strong>kedua</strong> set pertanyaan di bawah, masing-masing dari kita, siapa pun nanti yang jadi. Lalu tukar dan ulangi dengan peran dibalik.` ] },
            { kind: "questions", list: [
              { tense: "ahead", text: `Sebagai yang tertinggal: sebenarnya kamu takut apa? Sebutkan versi yang spesifik, bukan "aku bakal merasa nggak enak."`, hint: `Diajak bicara dengan cara berbeda. Nggak dimintai pendapat. Dikenalkan sebagai pelengkap. Pendapatmu jadi kurang berbobot di rumah. Sebutkan momen nyata yang kamu bayangkan.`, shape: `“Yang aku bayangkan adalah ___. Yang bikin itu bisa ditahan adalah ___.”` },
              { tense: "ahead", text: `Sebagai yang tertinggal: apa yang bikin kamu merasa kecil, dan apa yang justru bikin kamu bangga sama dia?` },
              { tense: "ahead", text: `Sebagai yang lebih maju: kamu takut apa — dibenci, harus mengecilkannya, harus menjelaskannya?` },
              { tense: "now", text: `Kamu pernah nggak mengecilkan sebuah keberhasilan demi menjaga damai dengan seseorang? Apa harganya buat kamu?` },
              { tense: "ahead", text: `Sebutkan perilaku spesifik — bukan uangnya — yang akan memberi tahu masing-masing dari kita bahwa kita masih dihormati di skenario itu.` },
              { tense: "ahead", text: `Apa tanda peringatan dini bahwa ini lagi salah arah, dan kita ngapain saat itu alih-alih tiga tahun kemudian?` }
            ] }
          ]
        },
        {
          kind: "section", title: "Batas dari perubahan",
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Perubahan seperti apa dalam diriku yang bakal susah kamu terima?` },
              { tense: "now", text: `Ada nggak sesuatu yang kamu harap akan aku tinggalkan seiring waktu?`, hint: `Bilang. Menikahi seseorang dengan asumsi dia akan jadi orang yang berbeda adalah cara paling umum ini jadi salah, dan biasanya dilakukan dengan tulus.` },
              { tense: "six", text: `Ada nggak sesuatu tentang aku yang kamu mau berubah tapi aku nggak menunjukkan tanda berubah selama enam bulan?` }
            ] }
          ]
        }
      ]
    },

    /* ——— Yang nggak bisa ditawar ——— */
    {
      id: "non-negotiables",
      title: "Yang nggak bisa ditawar",
      meta: "Ditulis terpisah, dibaca bersama",
      lead: "Hal-hal yang, kalau berjalan sebaliknya, kita nggak bisa membangun hidup di sini.",
      why: `Semua sebelum ini bisa ditawar. Bagian ini lantai di bawahnya. Melakukannya menjelang akhir itu penting — setelah sehari penuh kejujuran kita jauh lebih tahu apa yang sebenarnya kita butuhkan dibanding tadi pagi, dan daftar yang kita tulis sekarang bakal lebih jujur daripada yang kita tulis sebelum sarapan.`,
      body: [
        { kind: "do",
          text: [
            `Sendiri-sendiri, di ruangan berbeda, tanpa diskusi. Masing-masing nulis <strong>maksimal lima</strong>, sebagai kalimat pendek dan polos.`,
            `<strong>Ujiannya:</strong> kalau ini berjalan sebaliknya, apa aku nggak akan bisa membangun hidup di sini? Kalau jawaban jujurnya "aku bakal benci tapi aku bakal tetap tinggal," itu preferensi dan tempatnya di bagian sebelumnya. Kalau kamu punya lebih dari lima, itu preferensi.`
          ],
          twocol: [
            { who: "Lima milik D", text: `Sendiri. Nggak ngintip.` },
            { who: "Lima milik G", text: `Sendiri. Nggak ngintip.` }
          ] },
        { kind: "note", tag: "Catatan — aturan saat membuka",
          list: [
            `Baca satu per satu, bergantian.`,
            `Setelah tiap poin, yang mendengar bertanya tepat satu pertanyaan: <em>"apa yang ada di bawah yang ini?"</em>`,
            `Nggak ada tawar-menawar, menyetujui, atau membantah selama pembukaan. Kedua daftar dibaca tuntas dulu.`,
            `Nggak ada di kedua daftar yang boleh diolok, termasuk berbulan-bulan dari sekarang.`
          ] },
        {
          kind: "section", title: "Setelah kedua daftar dibaca",
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Pilah tiap poin ke: sama · cocok · bentrok.` },
              { tense: "ahead", text: `Buat apa pun yang bentrok: apa itu benar-benar nggak bisa ditawar buat kita berdua, atau salah satu dari kita memegangnya lebih longgar daripada yang ditulis?` },
              { tense: "now", text: `Ada nggak di daftar dia yang mengejutkan? Ada yang kamu kira akan ada tapi nggak ada?` },
              { tense: "now", text: `Ada nggak sesuatu yang hampir kamu tulis tapi nggak jadi? Bilang sekarang.` }
            ] }
          ]
        },
        { kind: "note", tag: "Catatan — kalau ada yang jatuh di bentrok",
          text: [ `Jangan selesaikan hari ini, dan jangan panik soal itu hari ini. Bentrok sungguhan antara dua hal yang nggak bisa ditawar adalah hal paling penting yang bisa dimunculkan seharian ini — menemukannya berarti prosesnya berhasil, bukan hubungannya gagal. Tulis, endapkan sendiri-sendiri selama seminggu, dan beri obrolannya sendiri.` ] }
      ]
    },

    /* ——— Keraguan yang tersisa ——— */
    {
      id: "doubts",
      title: "Keraguan yang tersisa",
      meta: "Bagian yang orang lewati",
      lead: "Keraguan yang diucapkan mengecil. Keraguan yang disimpan jadi cerita yang kita bikin ke diri sendiri nanti soal kenapa nggak berhasil.",
      why: `Ini bagian yang biasanya obrolan seperti ini nggak sampai — dan nggak sampai ke sini adalah cara obrolan itu diam-diam berhenti bertahan. Semua hal lain hari ini bisa dijawab dengan tulus dan tetap menyisakan yang sebenarnya nggak terucap. Kalau kita cuma mengerjakan satu bagian dengan benar, harusnya yang ini.`,
      body: [
        { kind: "note", tag: "Catatan — cara mengucapkannya, dan cara mendengarnya",
          text: [
            `<strong>Mengucapkannya.</strong> Pakai contoh kalimat di bawah. Itu menjaga keraguan tetap soal situasi dan kebutuhan, bukan soal karakter orang satunya.`,
            `<strong>Mendengarnya.</strong> Tiga tugas, berurutan: jangan membela diri di enam puluh detik pertama; ajukan satu pertanyaan; ucapkan terima kasih. Merespons dengan benar setelahnya — tapi nggak di menit pertama itu, karena menit pertama itu yang mengajari kita apakah aman melakukan ini lagi.`
          ] },
        {
          kind: "section", title: "Masing-masing dari kita, bergantian",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Keraguan yang sudah lama aku pegang dan belum aku bilang.`, shape: `“Kalau ___ terjadi, aku khawatir bahwa ___, dan yang aku perlu tahu dari kamu adalah ___.”` },
              { tense: "six", text: `Hal yang aku takut adalah pola, bukan sekadar momen.`, hint: `Sebutkan apa yang akan memberi tahu kamu itu cuma momen. Memberi kekhawatiran cara buat dibantah adalah beda antara kekhawatiran dan vonis.` },
              { tense: "ahead", text: `Sesuatu yang aku takut harus kamu ubah dari dirimu supaya ini berhasil — dan apakah aku bahkan mau kamu mengubahnya.` },
              { tense: "now", text: `Sesuatu yang aku lakukan yang aku tahu nggak adil buat kamu.`, hint: `Yang ini soal diri sendiri, sengaja. Bagian ini cuma bisa dilewati kalau kita berdua sama-sama terbuka di dalamnya.` },
              { tense: "now", text: `Yang aku butuhkan dari kamu yang selama ini aku malu buat minta.` },
              { tense: "ahead", text: `Kalau kita nggak berhasil, apa kemungkinan besar alasannya?`, hint: `Jawab jujur. Ini pertanyaan paling berguna di sini, dan mendengarnya bukan pengumuman bahwa salah satu dari kita akan pergi.` }
            ] }
          ]
        },
        {
          kind: "section", title: "Setelahnya",
          items: [
            { kind: "questions", list: [
              { tense: "now", text: `Apa yang masing-masing dari kita dengar yang mau kita endapkan alih-alih dijawab hari ini?` },
              { tense: "now", text: `Ada nggak yang salah satu dari kita ucapkan hari ini yang mau kita pastikan nggak disalahartikan yang satunya? Ucapkan lagi, dengan kata berbeda.` },
              { tense: "now", text: `Ucapkan terima kasih, keras-keras dan sungguh-sungguh, buat hal tersulit yang orang satunya ucapkan hari ini.` }
            ] }
          ]
        }
      ]
    },

    /* ——— Di mana kita sebenarnya berdiri ——— */
    {
      id: "standing",
      title: "Di mana kita sebenarnya berdiri",
      meta: "Penutup",
      lead: "Nggak ada skor. Cuma pemilahan yang jujur, biar kita berdua pulang dengan gambaran yang sama.",
      why: `Obrolan panjang jadi kabur. Tanpa bagian ini, masing-masing dari kita pulang dengan ringkasan pribadi soal hari ini, dan dua ringkasan itu bakal beda lebih jauh dari yang kita duga. Dua puluh menit di sini yang bikin hari ini jadi sesuatu yang bisa kita rujuk lagi alih-alih sesuatu yang kita ingat setengah-setengah.`,
      body: [
        {
          kind: "section", title: "Pilah tujuh area",
          items: [
            { kind: "do", text: [ `Bareng, taruh tiap area ke salah satu dari tiga kolom: uang · waktu dan kehadiran · cara kita memperlakukan satu sama lain · batasan · keluarga kita · anak · pertumbuhan dan perubahan.` ] },
            { kind: "sort", list: [
              { name: "Sejalan", text: `Kita saling paham dan mau hal yang sama.` },
              { name: "Masih ada PR", text: `Belum sejalan, tapi kita bisa lihat jalannya dan dua-duanya mau menempuhnya.` },
              { name: "Benar-benar terbuka", text: `Kita belum tahu. Menyebutnya terbuka itu jujur, bukan pesimis.` }
            ] },
            { kind: "questions", list: [
              { tense: "now", text: `Ada nggak yang kita pilah beda satu sama lain?`, hint: `Ketidaksepakatan soal kolom mana sebuah hal masuk itu lebih penting daripada kolomnya.` }
            ] }
          ]
        },
        {
          kind: "section", title: "Tulis, sebelum kita menutup ini",
          items: [
            { kind: "questions", list: [
              { tense: "ahead", text: `Tiga hal yang kita benar-benar sepakati hari ini.`, hint: `Cukup spesifik sampai kita berdua bisa mengenali pelanggaran. Tulis di satu tempat, kita berdua membaca kata-katanya.` },
              { tense: "ahead", text: `Dua hal yang belum kita sepakati — dan apa yang akan kita lakukan buat masing-masing.` },
              { tense: "ahead", text: `Satu hal yang masing-masing dari kita akan lakukan berbeda mulai minggu ini.`, hint: `Kecil dan nyata. Janji besar yang dibuat di akhir hari yang panjang dan penuh emosi punya rekam jejak yang buruk.` },
              { tense: "ahead", text: `Tanggal kita duduk bareng lagi.`, hint: `Tiga bulan. Masukkan ke dua kalender sebelum kita menutup halaman ini. Hari seperti ini cuma bertahan kalau yang berikutnya sudah dijadwalkan.` }
            ] }
          ]
        },
        { kind: "note", tag: "Catatan — satu hal terakhir buat diucapkan ke satu sama lain",
          text: [ `Apa pun yang muncul hari ini, orang satunya memilih memberitahumu alih-alih menyimpannya. Itu pilihan yang lebih sulit, dan itu bentuk komitmen. Katakan begitu.` ] },
        { kind: "closeNote", html: `Hari ini bukan buat membuktikan kita cocok, dan bukan buat menjebak siapa pun. Ini buat mengganti apa yang kita <em>asumsikan</em> tentang satu sama lain dengan apa yang benar-benar diucapkan — biar aku tahu apa yang aku mau, kamu tahu apa yang kamu mau, dan kita berdua tahu apa yang kita mau sebagai partner.<br><br><strong>Kalau ada yang muncul dan nggak selesai, itu bukan hari ini gagal. Itu hari ini menjalankan tugasnya.</strong> Kejelasan dulu. Sisanya jadi lebih ringan setelahnya.` },
        { kind: "sig", text: `D & G · bulan keenam` }
      ]
    }

  ]
};

/* Akses dari Node / build-script (diabaikan di browser). */
if (typeof module !== "undefined" && module.exports) {
  module.exports = (typeof window !== "undefined" ? window : globalThis).ALIGNMENT_DAY;
}
