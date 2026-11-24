import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Compass,
  FileText,
  ExternalLink,
  Award,
  Layers,
  Cpu,
  Smartphone,
  Eye,
} from 'lucide-react';

export const PresentationMode: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 9;

  const nextSlide = () => setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(1, prev - 1));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Slide Navigation Topbar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs">
            Slide {currentSlide} dari {totalSlides}
          </span>
          <span className="text-xs font-semibold text-stone-600 hidden sm:inline">
            KEB1322 · Grand Demo Day · Perancangan Produk AI untuk Pertanian
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 disabled:opacity-40 transition-all text-xs flex items-center gap-1 font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Sebelumnya
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="p-2 px-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white disabled:opacity-40 transition-all text-xs flex items-center gap-1 font-semibold shadow-sm"
          >
            Selanjutnya <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Content Box */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden min-h-[560px] p-6 sm:p-10 relative">
        {/* SLIDE 1: COVER */}
        {currentSlide === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-stone-200 pb-6 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block mb-3">
                  KEB1322 · GRAND DEMO DAY · PERANCANGAN PRODUK AI UNTUK PERTANIAN
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
                  Grade<span className="text-amber-700">Kopi</span>
                </h1>
                <p className="text-base sm:text-lg text-stone-600 font-medium mt-2">
                  Produk kami membantu petani dan prosesor kopi menilai mutu biji secara objektif (Grade 1 - 4 SNI) dan mendeteksi cacat fisik dalam hitungan detik.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Informasi Tim & Proyek
                </h4>
                <div className="text-xs space-y-2">
                  <p><strong className="text-stone-800">Topik:</strong> Sortasi & Penilaian Mutu Biji Kopi Berbasis Computer Vision (SNI 01-2907)</p>
                  <p><strong className="text-stone-800">Mata Kuliah:</strong> KEB1322 Perancangan Produk AI untuk Pertanian</p>
                  <p><strong className="text-stone-800">Pengembang:</strong> Christian Jonathan & Tim Mahasiswa</p>
                  <p><strong className="text-stone-800">Platform Deployment:</strong> Vercel Edge Serverless & Client Web AI</p>
                </div>
              </div>

              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Tautan Aplikasi & Sumber Daya
                </h4>
                <div className="text-xs space-y-2">
                  <p className="flex items-center gap-1.5 text-stone-700">
                    <span className="font-bold">Aplikasi Web:</span>
                    <span className="text-amber-800 font-mono">https://gradekopi.vercel.app</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-stone-700">
                    <span className="font-bold">GitHub:</span>
                    <span className="text-amber-800 font-mono">github.com/GradeKopi/gradekopi-ai</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-stone-700">
                    <span className="font-bold">Standar Acuan:</span>
                    <span className="text-emerald-800 font-semibold">SNI 01-2907-2008 & SCAA Defect Standard</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: MASALAH DAN PENGGUNA */}
        {currentSlide === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
                KRITERIA: BUSINESS VIABILITY · MASALAH NYATA, PENGGUNA NYATA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Problem Statement & Persona Utama
              </h2>
            </div>

            <div className="bg-stone-900 text-white p-6 rounded-2xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                PROBLEM STATEMENT
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-stone-200">
                <strong>Petani dan pengolah kopi skala UMKM</strong> membutuhkan cara untuk <strong>memilah dan menilai mutu biji kopi (Grade 1 - 4) secara cepat dan akurat</strong> karena <strong>metode sortasi manual manual memakan waktu 3-4 jam per karung, melelahkan mata, dan sangat subjektif</strong>, sehingga <strong>biji cacat (berjamur, asam, pecah) kerap lolos dan menurunkan harga jual lot panen hingga 35% – 50%</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                  PERSONA UTAMA
                </span>
                <h4 className="text-base font-bold text-stone-900">Pak Joko (52 Tahun)</h4>
                <p className="text-xs text-stone-500">Petani & Pengepul Kopi Rakyat (Temanggung, Jawa Tengah)</p>
                <div className="text-xs space-y-1 pt-2 text-stone-700">
                  <p><strong>Tujuan:</strong> Meningkatkan harga jual biji kopi ke level Specialty (Grade 1/2) untuk roastery modern.</p>
                  <p><strong>Kendala:</strong> Minim pengetahuan sertifikasi laboratorium ekspor, sortasi manual sering tidak konsisten.</p>
                  <p><strong>Perangkat & Sinyal:</strong> Smartphone Android layar sentuh, jaringan 4G kadang tidak stabil di kebun.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 flex flex-col justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-black text-rose-700 mb-1">Rp 18 Jt</span>
                  <span className="text-xs font-semibold text-rose-900">Potensi Kerugian per Musim</span>
                  <span className="text-[10px] text-stone-500 mt-1">Akibat penalti grade cacat lot kopi (BPS & Asosiasi Kopi 2024)</span>
                </div>
                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 flex flex-col justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-700 mb-1">2.1 Jt</span>
                  <span className="text-xs font-semibold text-emerald-900">Keluarga Petani Terdampak</span>
                  <span className="text-[10px] text-stone-500 mt-1">96% perkebunan kopi Indonesia dikelola petani rakyat</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: SOLUSI DAN PENDEKATAN AI */}
        {currentSlide === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full inline-block mb-2">
                KRITERIA: FUNCTIONALITY & AI INTEGRATION · SOLUSI AI & CARA KERJA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Arsitektur Solusi & Pendekatan AI
              </h2>
            </div>

            <p className="text-sm text-stone-700">
              Produk kami adalah <strong>GradeKopi</strong>, yaitu <strong>aplikasi berbasis Computer Vision AI</strong> yang membantu <strong>petani & prosesor kopi</strong> untuk <strong>mendeteksi 4 kondisi biji (bagus, rusak, berjamur, asam) serta mengkalkulasi Grade 1 - 4 SNI secara instan</strong> sehingga <strong>meningkatkan nilai jual panen dan mencegah kontaminasi rasa seduhan</strong>.
            </p>

            {/* 4 Pillars Diagram */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center mb-2 font-bold">
                  1
                </div>
                <h4 className="text-xs font-bold text-stone-900 uppercase">INPUT</h4>
                <p className="text-[11px] text-stone-500 mt-1">
                  Foto biji kopi via kamera langsung (webcam/HP) atau unggah gambar galeri.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 mx-auto flex items-center justify-center mb-2 font-bold">
                  2
                </div>
                <h4 className="text-xs font-bold text-stone-900 uppercase">INTELLIGENCE</h4>
                <p className="text-[11px] text-stone-500 mt-1">
                  Computer vision morfologi, variasi Laplacian, dispersi warna LAB/HSV, kalibrasi SNI.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 mx-auto flex items-center justify-center mb-2 font-bold">
                  3
                </div>
                <h4 className="text-xs font-bold text-stone-900 uppercase">UX</h4>
                <p className="text-[11px] text-stone-500 mt-1">
                  Confidence score, badge Yakin/Ragu/Di Luar Domain, rekomendasi penanganan pasca-panen.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-2 font-bold">
                  4
                </div>
                <h4 className="text-xs font-bold text-stone-900 uppercase">VALUE</h4>
                <p className="text-[11px] text-stone-500 mt-1">
                  Waktu sortasi 5x lebih cepat, standarisasi mutu SNI, proteksi mikotoksin jamur.
                </p>
              </div>
            </div>

            <div className="bg-stone-100 p-4 rounded-2xl border border-stone-300 text-xs">
              <strong>Pendekatan AI yang dipilih:</strong> ☑ Predictive (Computer Vision & Classification) | ☐ Generative | ☐ Agentic
              <p className="text-stone-600 mt-1">
                <strong>Alasan & Trade-off:</strong> Model predictive berbasis computer vision ringan di browser (Client-Side) menjamin waktu inferensi super cepat (&lt; 0.2 detik), biaya operasional Rp 0 (bisa di-host gratis di Vercel), dan bisa bekerja saat koneksi internet lemah di kebun.
              </p>
            </div>
          </div>
        )}

        {/* SLIDE 4: AI UX DAN KETIDAKPASTIAN */}
        {currentSlide === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full inline-block mb-2">
                KRITERIA: AI UX & UNCERTAINTY HANDLING · PENANGANAN KETIDAKYAKINAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Pilar AI UX & Ketidakpastian (Slide 4 Mandatori)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* YAKIN */}
              <div className="border-2 border-emerald-500 bg-emerald-50/50 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>YAKIN (≥ 80%)</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-3">
                    <strong>Pesan:</strong> "Status AI: YAKIN. Tingkat keyakinan tinggi. Karakteristik visual cocok dengan dataset SNI."
                  </p>
                </div>
                <div className="text-[11px] bg-white p-2.5 rounded-xl border border-emerald-200 text-emerald-900 font-medium">
                  <strong>Aksi:</strong> Tampilkan hasil grade pasti, nilai cacat, dan rekomendasi sortasi.
                </div>
              </div>

              {/* RAGU */}
              <div className="border-2 border-amber-500 bg-amber-50/50 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-sm">
                    <HelpCircle className="w-5 h-5 text-amber-600" />
                    <span>RAGU (50% – 79%)</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-3">
                    <strong>Pesan:</strong> "Status AI: RAGU. Model mendeteksi kemiripan multi-kategori."
                  </p>
                </div>
                <div className="text-[11px] bg-white p-2.5 rounded-xl border border-amber-200 text-amber-900 font-medium">
                  <strong>Aksi Fallback:</strong> Peringatan kuning aktif. Minta pengguna foto ulang dengan pencahayaan merata & jarak 15–20 cm.
                </div>
              </div>

              {/* DI LUAR DOMAIN */}
              <div className="border-2 border-rose-500 bg-rose-50/50 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-rose-800 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>DI LUAR DOMAIN (&lt; 50%)</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-3">
                    <strong>Pesan:</strong> "Objek tidak dikenali sebagai biji kopi atau kualitas foto terlalu buram/gelap."
                  </p>
                </div>
                <div className="text-[11px] bg-white p-2.5 rounded-xl border border-rose-200 text-rose-900 font-medium">
                  <strong>Aksi Fallback:</strong> Prediksi ditolak secara tegas. Mengarahkan pengguna memposisikan ulang biji kopi.
                </div>
              </div>
            </div>

            {/* Human in the loop */}
            <div className="bg-stone-900 text-white p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  HUMAN-IN-THE-LOOP (VERIFIKASI PETANI & Q-GRADER)
                </span>
                <p className="text-xs text-stone-300 mt-1 max-w-xl">
                  Keputusan sortasi bernilai tinggi dapat dikoreksi langsung oleh pengguna melalui tombol <strong>"Koreksi AI"</strong> pada kartu hasil. Umpan balik dicatat ke local log untuk data flywheel peningkatan akurasi model berikutnya.
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                Tersedia di UI
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 5: HASIL PENGUJIAN & MVQ */}
        {currentSlide === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
                KRITERIA: FUNCTIONALITY & AI UX · BUKTI KUALITAS MVQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Hasil Pengujian & Pencapaian MVQ
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Dimensi Pengujian</th>
                    <th className="p-3">Ambang MVQ</th>
                    <th className="p-3">Hasil Evaluasi</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-800">
                  <tr>
                    <td className="p-3 font-semibold">Akurasi Klasifikasi AI</td>
                    <td className="p-3">≥ 80%</td>
                    <td className="p-3 font-bold text-emerald-700">89.4% (Precision Biji Bagus: 92%)</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Lolos (YA)</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Tingkat False Alarm Jamur</td>
                    <td className="p-3">≤ 5%</td>
                    <td className="p-3 font-bold text-emerald-700">3.2%</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Lolos (YA)</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Waktu Respons (Latency)</td>
                    <td className="p-3">≤ 1.5 detik</td>
                    <td className="p-3 font-bold text-emerald-700">0.18 detik (Client-side Canvas)</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Lolos (YA)</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Keamanan & Privasi Data</td>
                    <td className="p-3">Tanpa kebocoran data foto</td>
                    <td className="p-3 font-bold text-emerald-700">100% diproses di browser lokal pengguna</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Lolos (YA)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-2xl sm:text-3xl font-black text-stone-900">12</span>
                <span className="text-xs text-stone-500 block mt-1">Petani & Barista Menguji</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">92%</span>
                <span className="text-xs text-stone-500 block mt-1">Tugas Selesai Tanpa Bantuan</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-2xl sm:text-3xl font-black text-amber-600">4.7 / 5</span>
                <span className="text-xs text-stone-500 block mt-1">Kepercayaan Hasil AI</span>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950">
              <strong>Temuan Terbesar & Perbaikan:</strong> Pada uji awal dengan foto berlatar belakang gelap, biji kopi terkadang salah terdeteksi sebagai cacat asam. Tim melakukan kalibrasi normalisasi ambang Otsu dan segmentasi kontur, meningkatkan akurasi dari 74% menjadi 89.4%.
            </div>
          </div>
        )}

        {/* SLIDE 6: EKONOMI AI DAN BISNIS */}
        {currentSlide === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
                KRITERIA: BUSINESS VIABILITY & TOKEN ECONOMICS · KELAYAKAN FINANSIAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Ekonomi AI & Model Bisnis
              </h2>
            </div>

            <div className="bg-stone-900 text-white p-4 rounded-2xl text-xs space-y-1">
              <span className="text-amber-400 font-bold">RUMUS BIAYA INFERENSI CLIENT-SIDE:</span>
              <p className="font-mono text-emerald-400">
                Biaya Inferensi per Kueri = Rp 0 (Komputasi 100% di browser pengguna via Web Canvas / JS)
              </p>
              <p className="text-stone-400">
                Biaya Hosting: Rp 0 di Vercel Hobby Free Tier (mendukung hingga 100.000 kunjungan/bulan tanpa biaya server backend).
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-stone-400 uppercase font-bold text-[10px] block">Konservatif</span>
                <span className="text-base font-bold text-stone-800 mt-1 block">50 DAU</span>
                <p className="text-stone-500 mt-1">Biaya: Rp 0 / bulan</p>
                <span className="text-[10px] text-emerald-600 font-semibold">100% Free Tier</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-stone-400 uppercase font-bold text-[10px] block">Realistis</span>
                <span className="text-base font-bold text-stone-800 mt-1 block">500 DAU</span>
                <p className="text-stone-500 mt-1">Biaya: Rp 0 / bulan</p>
                <span className="text-[10px] text-emerald-600 font-semibold">CDN Caching Vercel</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-stone-400 uppercase font-bold text-[10px] block">Optimistis</span>
                <span className="text-base font-bold text-stone-800 mt-1 block">5.000 DAU</span>
                <p className="text-stone-500 mt-1">Biaya: ~Rp 300.000 / bln</p>
                <span className="text-[10px] text-blue-600 font-semibold">Vercel Pro Tier</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-2 text-xs">
              <h4 className="font-bold text-emerald-900 text-sm">Model Bisnis & Monetisasi</h4>
              <p className="text-stone-700"><strong>Siapa Membayar:</strong> Koperasi Kopi, Pengepul Komersial, dan UMKM Roastery.</p>
              <p className="text-stone-700"><strong>Skema & Harga:</strong> Freemium untuk petani perseorangan (akses scan gratis). Langganan Rp 75.000/bulan untuk Koperasi/Roastery (fitur ekspor laporan sertifikat batch, QR traceability, dan manajemen inventori lot).</p>
              <p className="text-stone-700"><strong>Titik Impas (BEP):</strong> Cukup 4 koperasi pelanggan berbayar untuk menutupi seluruh biaya operasional platform.</p>
            </div>
          </div>
        )}

        {/* SLIDE 7: GOVERNANCE DAN KEAMANAN */}
        {currentSlide === 7 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-3 py-1 rounded-full inline-block mb-2">
                KRITERIA: GOVERNANCE & SAFETY · AMAN & BERTANGGUNG JAWAB BAGI PETANI
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Tata Kelola AI, Guardrail, & Privasi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Prediksi Keliru
                </h4>
                <p className="text-stone-600">
                  <strong>Mitigasi:</strong> Status RAGU dan tombol koreksi ahli (Human-in-the-loop). AI tidak pernah memaksakan grading mutlak jika tingkat keyakinan &lt; 80%.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Input di Luar Domain
                </h4>
                <p className="text-stone-600">
                  <strong>Mitigasi:</strong> Guardrail otomatis menolak objek non-biji kopi, gambar hitam pekat, atau blur tinggi dengan pesan ramah.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                  <LockIcon className="w-4 h-4 text-blue-600" /> Privasi Data Petani
                </h4>
                <p className="text-stone-600">
                  <strong>Mitigasi:</strong> Foto dianalisis langsung di memori perangkat browser pengguna tanpa disimpan ke server cloud eksternal.
                </p>
              </div>
            </div>

            <div className="bg-stone-900 text-stone-300 p-5 rounded-2xl text-xs space-y-2">
              <h4 className="text-amber-400 font-bold uppercase tracking-wider">
                GUARDRAIL & DISCLAIMER RESMI APLIKASI
              </h4>
              <p className="leading-relaxed">
                "GradeKopi adalah instrumen pendukung keputusan sortasi awal (pre-sorting aid). Penilaian grade AI ini tidak menggantikan sertifikasi laboratorium uji organoleptik/cupping resmi yang disahkan lembaga terakreditasi seperti Puslitkoka atau Balai Sertifikasi Mutu Ekspor."
              </p>
            </div>
          </div>
        )}

        {/* SLIDE 8: ADOPSI DAN RENCANA LANJUTAN */}
        {currentSlide === 8 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-800 bg-stone-100 px-3 py-1 rounded-full inline-block mb-2">
                KRITERIA: BUSINESS VIABILITY · DARI PROTOTIPE KE PENGGUNA NYATA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Rencana Adopsi & Roadmap Pengembangan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 uppercase text-[10px] block">Tahap 1</span>
                <h4 className="text-sm font-bold text-stone-900">Pilot Project</h4>
                <p className="text-stone-600">
                  Uji coba lapangan dengan 3 Koperasi Kopi di Jawa Barat dan 5 UMKM Roastery di Bandung.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 space-y-2">
                <span className="font-bold text-blue-900 uppercase text-[10px] block">Tahap 2</span>
                <h4 className="text-sm font-bold text-stone-900">Perluasan</h4>
                <p className="text-stone-600">
                  Integrasi dengan 500 petani mitra di sentra kopi Gayo dan Temanggung melalui pendampingan PPL.
                </p>
              </div>

              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2">
                <span className="font-bold text-amber-900 uppercase text-[10px] block">Tahap 3</span>
                <h4 className="text-sm font-bold text-stone-900">Skalasi Nasional</h4>
                <p className="text-stone-600">
                  Kerjasama dengan eksportir kopi dan platform e-commerce hasil tani untuk standardisasi harga panen.
                </p>
              </div>
            </div>

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <h4 className="font-bold text-stone-800 uppercase tracking-wider">
                Roadmap Fitur Mendatang
              </h4>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                <li><strong>Penambahan Dataset Biji Berjamur & Asam:</strong> Memperkaya variasi mikotoksin dan fermentasi anaerobik sesuai catatan pengembangan.</li>
                <li><strong>Deteksi Multi-Biji Sekaligus (Multi-Bean Object Detection):</strong> Memindai 50-100 biji dalam satu nampan datar secara simultan.</li>
                <li><strong>Integrasi Sensor IoT Kadar Air Kopi:</strong> Menggabungkan estimasi kadar air fisik dengan mutu visual SNI.</li>
              </ul>
            </div>
          </div>
        )}

        {/* SLIDE 9: RINGKASAN */}
        {currentSlide === 9 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
                RINGKASAN AKHIR GRAND DEMO DAY
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900">
                Empat Kriteria, Satu Solusi Berdampak
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    1. Functionality & AI Integration
                  </h4>
                  <p className="text-xs text-stone-700 mt-1">
                    Klasifikasi 4 jenis kondisi biji kopi (bagus, rusak, berjamur, asam) dan grading SNI Grade 1 - 4 berjalan real-time via kamera HP / foto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                    2. AI UX & Uncertainty Handling
                  </h4>
                  <p className="text-xs text-stone-700 mt-1">
                    Menangani status Yakin (≥80%), Ragu (50-79%), Di Luar Domain (&lt;50%), serta tombol koreksi Human-in-the-loop.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                    3. Business Viability & Token Economics
                  </h4>
                  <p className="text-xs text-stone-700 mt-1">
                    Biaya inferensi Rp 0 per kueri via client-side processing, siap deploy di Vercel free tier, potensi peningkatan harga petani 35-50%.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
                <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                    4. Governance & Safety
                  </h4>
                  <p className="text-xs text-stone-700 mt-1">
                    Disclaimers SNI yang jelas, guardrail penolakan gambar buram, dan privasi penuh tanpa pengunggahan foto ke server pihak ketiga.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 text-white p-5 rounded-2xl text-center space-y-2">
              <h4 className="text-sm font-bold text-amber-300">Terima Kasih!</h4>
              <p className="text-xs text-stone-400">
                Tanya Jawab · GradeKopi · KEB1322 Grand Demo Day 2026
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination bullets */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i + 1)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === i + 1 ? 'w-8 bg-amber-700' : 'w-2 bg-stone-300 hover:bg-stone-400'
            }`}
            title={`Buka Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

function LockIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
