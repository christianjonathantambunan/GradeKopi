import React from 'react';
import { BookOpen, ShieldCheck, Scale, Award, Info, Lock, CheckCircle2 } from 'lucide-react';

export const AboutStandards: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
        <span className="text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
          Pedoman & Regulasi
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
          Standar SNI 01-2907 & Tata Kelola AI Kopi
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
          Pelajari bagaimana sistem nilai cacat SNI dihitung dan komitmen privasi serta tata kelola AI pada GradeKopi.
        </p>
      </div>

      {/* SNI Table & Explanations */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 transition-colors">
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-4">
          <Scale className="w-5 h-5 text-amber-800 dark:text-amber-400" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Klasifikasi Mutu Kopi Biji Berdasarkan Standar SNI 01-2907
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Tingkat Mutu (Grade)</th>
                <th className="p-3">Batas Nilai Cacat (Sampel 300g)</th>
                <th className="p-3">Karakteristik & Segmen Pasar</th>
                <th className="p-3">Kisaran Harga Pasar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
              <tr className="bg-emerald-50/30 dark:bg-emerald-950/20">
                <td className="p-3 font-bold text-emerald-800 dark:text-emerald-400">Grade 1 (Mutu 1)</td>
                <td className="p-3 font-mono font-bold">Maksimal 11 Cacat</td>
                <td className="p-3">Kopi spesialti ekspor, rasa bersih (clean cup), diminati roastery internasional.</td>
                <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">Rp 95.000 – Rp 130.000 / kg</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-800 dark:text-blue-400">Grade 2 (Mutu 2)</td>
                <td className="p-3 font-mono font-bold">12 – 25 Cacat</td>
                <td className="p-3">Mutu baik untuk kafe modern dan roastery komersial premium.</td>
                <td className="p-3 font-bold text-blue-700 dark:text-blue-400">Rp 75.000 – Rp 94.000 / kg</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-800 dark:text-amber-400">Grade 3 (Mutu 3)</td>
                <td className="p-3 font-mono font-bold">26 – 44 Cacat</td>
                <td className="p-3">Mutu sedang untuk konsumsi reguler dan industri kopi bubuk kemasan.</td>
                <td className="p-3 font-bold text-amber-700 dark:text-amber-400">Rp 60.000 – Rp 74.000 / kg</td>
              </tr>
              <tr className="bg-rose-50/30 dark:bg-rose-950/20">
                <td className="p-3 font-bold text-rose-800 dark:text-rose-400">Grade 4 (Mutu 4)</td>
                <td className="p-3 font-mono font-bold">45 – 80 Cacat</td>
                <td className="p-3">Mutu rendah dengan persentase cacat tinggi, rawan ditolak pembeli atau dikenai penalti harga berat.</td>
                <td className="p-3 font-bold text-rose-700 dark:text-rose-400">Rp 40.000 – Rp 58.000 / kg</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Defect Point Weights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 block">Cacat Primer</span>
            <h5 className="font-bold text-stone-900 dark:text-stone-100 mt-1">Biji Berjamur</h5>
            <span className="text-sm font-black text-rose-700 dark:text-rose-400 block mt-1">1.0 Poin / Biji</span>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">Mengandung mikotoksin, merusak kesehatan dan rasa.</p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 block">Cacat Primer</span>
            <h5 className="font-bold text-stone-900 dark:text-stone-100 mt-1">Biji Asam / Stinker</h5>
            <span className="text-sm font-black text-orange-700 dark:text-orange-400 block mt-1">1.0 Poin / Biji</span>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">Fermentasi berlebih, menghasilkan aroma cuka tajam.</p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 block">Cacat Sekunder</span>
            <h5 className="font-bold text-stone-900 dark:text-stone-100 mt-1">Biji Pecah / Rusak</h5>
            <span className="text-sm font-black text-amber-700 dark:text-amber-400 block mt-1">0.2 Poin / Biji</span>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">5 biji pecah dihitung bernilai 1 poin cacat.</p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 block">Mutu Ideal</span>
            <h5 className="font-bold text-stone-900 dark:text-stone-100 mt-1">Biji Bagus</h5>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-400 block mt-1">0.0 Poin</span>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">Struktur seluler utuh tanpa kerusakan.</p>
          </div>
        </div>
      </div>

      {/* Governance & Privacy Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Tata Kelola, Etika AI, & Kebijakan Privasi
          </h3>
        </div>

        <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
          <p>
            <strong>1. Pemrosesan Data di Sisi Klien (Client-Side Privacy):</strong> Seluruh proses inferensi visi komputer untuk klasifikasi dan deteksi dilakukan langsung di memori browser lokal perangkat Anda menggunakan HTML5 Canvas. Foto biji kopi Anda tidak dikirim atau disimpan secara permanen di server luar tanpa persetujuan eksplisit Anda.
          </p>
          <p>
            <strong>2. Batasan & Guardrail AI (Uncertainty Handling):</strong> Model AI dilatih dengan guardrail ketat. Jika kualitas foto buram, pencahayaan kurang, atau objek di luar domain biji kopi, sistem secara otomatis menolak memberikan penilaian (*Status DI LUAR DOMAIN / RAGU*).
          </p>
          <p>
            <strong>3. Disclaimer Hukum & Komersial:</strong> GradeKopi berfungsi sebagai alat bantu skrining awal (*pre-sorting aid*) bagi petani dan pelaku usaha. Hasil penilaian aplikasi ini tidak menggantikan sertifikat resmi uji fisik dan organoleptik laboratorium terakreditasi (*cupping test SCAA / Puslitkoka*).
          </p>
        </div>
      </div>
    </div>
  );
};
