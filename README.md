# ☕ GradeKopi - Sistem AI Deteksi & Penilaian Mutu Biji Kopi Indonesia (SNI 01-2907)

Aplikasi berbasis web AI modern untuk memilah, mendeteksi cacat fisik, dan menilai mutu biji kopi (Grade 1 s/d Grade 4) sesuai standar **SNI 01-2907-2008**. Didesain khusus untuk memenuhi kriteria **KEB1322 · Grand Demo Day · Perancangan Produk AI untuk Pertanian** dan siap di-deploy secara langsung ke **Vercel**.

---

## 🌟 Fitur Utama

### 1. Klasifikasi 4 Kondisi Biji Kopi
- 🟢 **Biji Bagus (Normal / Sound Bean):** Fisik utuh, warna seragam, tanpa cacat fisik atau mikrobiologis.
- 🟡 **Biji Pecah / Rusak (Broken / Damaged):** Kerusakan mekanis pengupasan huller atau lubang serangga (bobot cacat 0.2).
- 🟣 **Biji Berjamur (Moldy / Fungi):** Tercemar spora jamur penyebab mikotoksin Ochratoxin A (bobot cacat 1.0).
- 🟠 **Biji Asam (Sour / Fermented / Stinker):** Fermentasi anaerobik berlebih dengan aroma asam busuk menyengat (bobot cacat 1.0).

### 2. Penilaian Mutu (Grade 1 – Grade 4 SNI)
- **Grade 1 (Spesialti):** Nilai cacat $\le 11$ (Clean cup, potensi harga tertinggi).
- **Grade 2 (Mutu Baik):** Nilai cacat $12 - 25$.
- **Grade 3 (Mutu Sedang):** Nilai cacat $26 - 44$.
- **Grade 4 (Mutu Rendah):** Nilai cacat $45 - 80$.

### 3. Pemenuhan Kriteria Presentasi (Slide 1 – 9 KEB1322)
- 📷 **Input Fleksibel:** Kamera langsung (dukungan ganti kamera depan/belakang smartphone) dan upload drag & drop.
- 🎯 **AI UX & Uncertainty Handling (Slide 4 Mandatori):**
  - **YAKIN ($\ge 80\%$):** Badge hijau, grade pasti, dan rekomendasi pasca-panen.
  - **RAGU ($50\% - 79\%$):** Peringatan kuning, petunjuk foto ulang dengan pencahayaan merata.
  - **DI LUAR DOMAIN / GAGAL (< 50% atau bukan biji kopi):** Penolakan otomatis gambar non-kopi atau gambar buram.
  - **Human-in-the-Loop:** Tombol *"Koreksi AI (Verifikasi Petani / Q-Grader)"* untuk mencatat feedback perbaikan model.
- 🧮 **Kalkulator Lot Panen (SNI Batch Calculator):** Menghitung nilai cacat sampel 300 gram dan memproyeksikan kenaikan pendapatan petani sebesar **35% - 50%** setelah sortasi.
- 📑 **Mode Presentasi Grand Demo Day:** Presentasi interaktif 9 slide lengkap dengan data persona, metrik MVQ, model ekonomi Rp 0, dan roadmap.
- 🗂️ **Koleksi & Tambah Dataset:** Pantau dataset saat ini (200 bagus, 200 rusak, 12 jamur) dan formulir untuk menambahkan foto biji asam dan berjamur baru.

---

## 🚀 Cara Menjalankan di Komputer Lokal

1. **Pastikan Node.js terpasang** (Rekomendasi Node.js 18+ atau 20+).
2. Buka terminal di folder `GradeKopi`:
   ```bash
   npm install
   npm run dev
   ```
3. Buka browser pada URL yang tampil (biasanya `http://localhost:5173`).

---

## ☁️ Panduan Deploy ke Vercel (100% Siap)

Proyek ini telah dikonfigurasi dengan file `vercel.json` dan bundling Vite yang sangat ringan:

### Cara 1: Deploy Lewat GitHub (Rekomendasi)
1. Inisialisasi Git dan commit file proyek:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi GradeKopi AI Web App"
   ```
2. Buat repository baru di [GitHub](https://github.com) bernama `GradeKopi`.
3. Push kode ke GitHub:
   ```bash
   git remote add origin https://github.com/USERNAME/GradeKopi.git
   git branch -M main
   git push -u origin main
   ```
4. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan klik **"Add New Project"**.
5. Impor repositori `GradeKopi` dari GitHub.
6. Vercel akan otomatis mengenali preset **Vite**, klik tombol **"Deploy"**.
7. Dalam ~1 menit, website Anda akan langsung aktif dengan domain `https://gradekopi.vercel.app`!

### Cara 2: Deploy Menggunakan Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 🏗️ Struktur Proyek

```
GradeKopi/
├── dataset/                  # Dataset foto biji kopi (train & test)
├── public/
│   ├── favicon.svg          # Ikon aplikasi
│   └── samples/             # Sampel foto demo untuk uji 1-klik di browser
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigasi & status Vercel
│   │   ├── CameraCapture.tsx    # Live camera scanner dengan reticle bidik
│   │   ├── DropzoneUpload.tsx   # Area upload foto drag & drop
│   │   ├── SampleGallery.tsx    # Galeri uji cepat sampel asli
│   │   ├── ResultCard.tsx       # Kartu hasil deteksi, grade, & human-in-the-loop
│   │   ├── BatchCalculator.tsx  # Kalkulator lot panen SNI & dampak ekonomi
│   │   ├── PresentationMode.tsx # Pitch deck interaktif 9 slide Grand Demo Day
│   │   ├── DatasetManager.tsx   # Manajemen dataset & form tambah foto asam/jamur
│   │   ├── AboutStandards.tsx   # Edukasi regulasi SNI 01-2907 & tata kelola AI
│   │   └── Footer.tsx           # Informasi hak cipta & disclaimer
│   ├── services/
│   │   └── coffeeAnalyzer.ts    # Engine computer vision & kalibrasi ketidakpastian
│   ├── types/
│   │   └── index.ts             # Definisi tipe data TypeScript
│   ├── App.tsx                  # Komponen utama
│   ├── main.tsx
│   └── index.css                # Konfigurasi Tailwind CSS
├── package.json
├── vite.config.ts
├── vercel.json                  # Konfigurasi deployment Vercel
└── README.md
```

---

## 🔒 Tata Kelola & Keamanan (Governance)
- **Privasi:** Foto dianalisis langsung di memori browser pengguna (*client-side*) tanpa retensi ke server eksternal.
- **Biaya Inferensi:** Rp 0 per kueri (Sangat hemat dan ramah bagi petani skala kecil).
- **Disclaimer:** Aplikasi ini adalah instrumen pendukung keputusan sortasi awal (*pre-sorting aid*), bukan pengganti uji laboratorium resmi ekspor.
