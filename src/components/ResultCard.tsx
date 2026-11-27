import React, { useState } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Award,
  RefreshCw,
  Printer,
  UserCheck,
  TrendingUp,
  AlertOctagon,
  Sparkles,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DetectionResult, CoffeeClass, FeedbackLog } from '../types';
import { CLASS_METADATA } from '../services/coffeeAnalyzer';

interface ResultCardProps {
  result: DetectionResult;
  onReset: () => void;
  onFeedbackSaved?: (log: FeedbackLog) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset, onFeedbackSaved }) => {
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [selectedCorrection, setSelectedCorrection] = useState<CoffeeClass>(result.primaryClass);
  const [correctionNote, setCorrectionNote] = useState('');
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  // Trigger celebration confetti if Grade 1 Speciality with high confidence
  React.useEffect(() => {
    if (result.estimatedGrade === 'Grade 1' && result.uncertaintyStatus === 'YAKIN') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2e7d32', '#d4af37', '#ffffff'],
      });
    }
  }, [result]);

  const handleSaveCorrection = () => {
    const feedback: FeedbackLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      predictedClass: result.primaryClass,
      correctedClass: selectedCorrection,
      confidence: result.confidence,
      notes: correctionNote,
      imageUrl: result.imageUrl,
    };

    if (onFeedbackSaved) {
      onFeedbackSaved(feedback);
    }
    setIsSavedFeedback(true);
    setTimeout(() => {
      setShowCorrectionModal(false);
    }, 1200);
  };

  const getStatusBanner = () => {
    switch (result.uncertaintyStatus) {
      case 'YAKIN':
        return (
          <div className="bg-emerald-500 text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Status AI: YAKIN (Confidence {result.confidence}%)
                </span>
                <p className="text-xs text-emerald-100">
                  Tingkat keyakinan model tinggi (≥ 80%). Karakteristik visual cocok dengan dataset SNI.
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-600/60 font-semibold px-2 py-1 rounded-lg border border-emerald-400/40">
              Slide 4 Terpenuhi
            </span>
          </div>
        );

      case 'RAGU':
        return (
          <div className="bg-amber-500 text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Status AI: RAGU (Confidence {result.confidence}%)
                </span>
                <p className="text-xs text-amber-100">
                  Model mendeteksi kemiripan multi-kategori. Ambil foto ulang dengan pencahayaan merata dan jarak 15–20 cm.
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-amber-600/60 font-semibold px-2 py-1 rounded-lg border border-amber-400/40">
              Fallback Aktif
            </span>
          </div>
        );

      case 'DI_LUAR_DOMAIN':
      default:
        return (
          <div className="bg-rose-600 text-white px-5 py-3 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Status AI: DI LUAR DOMAIN / GAGAL DETEKSI
                </span>
                <p className="text-xs text-rose-100">
                  Objek tidak dikenali sebagai biji kopi atau kualitas foto terlalu buram/gelap. Penilaian tidak valid.
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-rose-700/60 font-semibold px-2 py-1 rounded-lg border border-rose-400/40">
              Guardrail Aktif
            </span>
          </div>
        );
    }
  };

  const meta = CLASS_METADATA[result.primaryClass];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6 transition-colors">
      {/* Top Uncertainty Status Banner */}
      {getStatusBanner()}

      {/* Main Result Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Preview + Morphological Metrics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-stone-200 dark:border-stone-700 shadow-inner bg-stone-900">
            <img
              src={result.imageUrl}
              alt="Hasil deteksi biji kopi"
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-stone-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-700 text-white text-[11px] flex justify-between items-center">
              <span>Waktu Pindai: {result.timestamp}</span>
              <span className="font-semibold text-amber-300">SNI 01-2907</span>
            </div>
          </div>

          {/* Morphological AI metrics */}
          <div className="bg-stone-50 dark:bg-stone-850 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
            <h5 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-stone-500" /> Metrik Morfologi & Tekstur
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white dark:bg-stone-800 p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700">
                <span className="text-stone-400 dark:text-stone-500 text-[10px] block">Integritas Tepi</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{result.metrics.edgeIntegrity}%</span>
              </div>
              <div className="bg-white dark:bg-stone-800 p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700">
                <span className="text-stone-400 dark:text-stone-500 text-[10px] block">Variasi Tekstur Permukaan</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{result.metrics.surfaceVariance}%</span>
              </div>
              <div className="bg-white dark:bg-stone-800 p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700">
                <span className="text-stone-400 dark:text-stone-500 text-[10px] block">Nilai Cacat SNI</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{result.defectScore} Poin</span>
              </div>
              <div className="bg-white dark:bg-stone-800 p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700">
                <span className="text-stone-400 dark:text-stone-500 text-[10px] block">Akurasi Visual</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{result.confidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Classification, Grade, and Actionable Insights */}
        <div className="lg:col-span-7 space-y-6">
          {/* Classification Title & Grade Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
            <div>
              <span className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider block mb-1">
                Hasil Klasifikasi Biji
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                {result.classNameIndo}
              </h2>
            </div>

            {/* Estimated Grade Card */}
            <div className="bg-gradient-to-br from-stone-900 to-amber-950 text-white px-5 py-3 rounded-2xl shadow-md text-right">
              <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold justify-end">
                <Award className="w-4 h-4" /> Mutu Kopi
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {result.estimatedGrade}
              </div>
            </div>
          </div>

          {/* Description & Impact */}
          <div className="space-y-3">
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {meta.description}
            </p>

            <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-700 dark:text-amber-400" /> Dampak Komersial & Mutu Rasa (Cupping)
              </h4>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-medium">
                {meta.impact}
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Rekomendasi Tindak Lanjut Pasca-Panen
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {meta.action}
              </p>
            </div>
          </div>

          {/* Probability Distribution Bar Graph */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Distribusi Probabilitas Model AI
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  <span>Biji Bagus (Utuh)</span>
                  <span>{result.probabilities.bagus}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.probabilities.bagus}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  <span>Biji Pecah / Rusak</span>
                  <span>{result.probabilities.rusak}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.probabilities.rusak}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  <span>Biji Berjamur</span>
                  <span>{result.probabilities.jamur}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.probabilities.jamur}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  <span>Biji Asam (Fermentasi)</span>
                  <span>{result.probabilities.asam}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.probabilities.asam}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Human-in-the-loop, Print, Retake */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
            {/* Human-in-the-loop button required by Slide 4 */}
            <button
              onClick={() => setShowCorrectionModal(true)}
              className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-2 border border-stone-300 dark:border-stone-700 transition-all"
            >
              <UserCheck className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              Koreksi AI (Human-in-the-Loop)
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-2 border border-stone-300 dark:border-stone-700 transition-all"
            >
              <Printer className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              Cetak Laporan
            </button>

            <button
              onClick={onReset}
              className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-amber-900/10 ml-auto transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Pindai Biji Lain
            </button>
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Correction Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Verifikasi Ahli / Koreksi Petani
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Sesuai Slide 4: AI UX & Human-in-the-loop
                </p>
              </div>
            </div>

            {isSavedFeedback ? (
              <div className="py-8 text-center text-emerald-600 dark:text-emerald-400 space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold">Koreksi Berhasil Disimpan!</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Data umpan balik Anda telah dicatat ke data flywheel untuk peningkatan model masa depan.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  AI memprediksi biji ini sebagai{' '}
                  <strong className="text-stone-900 dark:text-stone-100">{result.classNameIndo}</strong> ({result.confidence}%).
                  Jika hasil ini keliru menurut pengamatan Anda/Q-Grader, pilih kategori yang tepat:
                </p>

                <div className="space-y-2">
                  {(['bagus', 'rusak', 'jamur', 'asam'] as CoffeeClass[]).map((c) => (
                    <label
                      key={c}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedCorrection === c
                          ? 'border-amber-600 bg-amber-50/70 dark:bg-amber-950/40 font-bold text-stone-900 dark:text-stone-100'
                          : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span className="text-xs capitalize">{CLASS_METADATA[c].name}</span>
                      <input
                        type="radio"
                        name="correction"
                        checked={selectedCorrection === c}
                        onChange={() => setSelectedCorrection(c)}
                        className="text-amber-700 focus:ring-amber-500"
                      />
                    </label>
                  ))}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Biji ini sedikit berbau cuka tapi bentuk fisiknya masih utuh..."
                    value={correctionNote}
                    onChange={(e) => setCorrectionNote(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowCorrectionModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveCorrection}
                    className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-700 hover:bg-amber-800 text-white shadow-md shadow-amber-900/10"
                  >
                    Simpan Koreksi
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
