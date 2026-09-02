# D & G — Alignment Day

Halaman web privat yang berdiri sendiri untuk satu obrolan panjang yang
terstruktur, plus versi teksnya dengan isi yang sama.

Dulunya satu file `alignmentday.html` sepanjang ~1.500 baris; sekarang dipecah
jadi file-file kecil dengan semua teks disimpan di satu tempat.

## Cara menjalankan

Buka **`index.html`** di browser apa pun — klik dua kali, atau seret ke jendela
browser. Nggak perlu server, nggak perlu install, nggak perlu internet (kecuali
web font, yang otomatis pakai font bawaan sistem kalau offline).

Progressmu (kotak yang dicentang dan bar di atas) tersimpan otomatis di browser
itu, di perangkat itu. Nggak diunggah ke mana pun.

## Isi folder

```
index.html              Halamannya. Buka ini.
css/
  tokens.css            Warna, font, mode gelap, aturan cetak
  base.css              Reset + tipografi dasar
  layout.css            Bar atas, blok judul, bagian yang bisa dilipat
  components.css        Kartu pertanyaan, kotak catatan/instruksi, sheet jeda
js/
  content.js            *** Semua teks — tiap bagian, pertanyaan, catatan ***
  render.js             Membangun halaman dari content.js
  progress.js           Kotak centang + bar progress (tersimpan di browser)
  pause.js              Tombol "Jeda" dan sheet-nya
  main.js               Menjalankan semuanya
tools/
  generate-markdown.html  Buka di browser untuk membuat ulang alignmentday.md
  build-md.mjs            Sama, dari command line (butuh Node)
  markdown.js             Bersama: content.js -> markdown
alignmentday.md         Versi teks — HASIL GENERATE, jangan diedit manual
reference/              Versi file-tunggal yang lama, disimpan buat pembanding.
                        Aman dihapus.
```

## Mengubah teks

Semua yang halaman ini ucapkan ada di **`js/content.js`**. Ubah pertanyaan,
tambah satu, tulis ulang catatan — semuanya di situ, sebagai daftar biasa. Muat
ulang `index.html` untuk melihat hasilnya.

Bentuk tiap entri didokumentasikan di bagian atas file itu.

**Mengubah urutan bagian:** pindahkan objek bagian di dalam array `parts: [ ... ]`.
Nomor yang tampil (00, 01, …) mengikuti posisi array secara otomatis, dan progress
yang tersimpan terikat ke `id` tiap bagian, jadi nggak ada yang lain yang perlu
disentuh.

## Memperbarui versi teks

`alignmentday.md` dibuat dari `js/content.js`, jadi keduanya nggak akan pernah
beda. Setelah mengubah isi, buat ulang dengan salah satu cara:

- **Tanpa tools:** buka `tools/generate-markdown.html` di browser, klik *Unduh*,
  lalu ganti `alignmentday.md` di folder ini dengan file hasil unduhan.
- **Dengan Node:** jalankan `node tools/build-md.mjs` dari folder ini.

Jangan edit `alignmentday.md` manual — akan ditimpa saat build berikutnya.
