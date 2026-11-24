import React, { useState } from 'react';
import { Calculator, Award, TrendingUp, Sparkles, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';
import { calculateBatchSNIGrade, SNI_DEFECT_WEIGHTS } from '../services/coffeeAnalyzer';
import confetti from 'canvas-confetti';

export const BatchCalculator: React.FC = () => {
  const [bagusCount, setBagusCount] = useState(240);
  const [rusakCount, setRusakCount] = useState(30);
  const [jamurCount, setJamurCount] = useState(5);
  const [asamCount, setAsamCount] = useState(5);
  const [lotWeightKg, setLotWeightKg] = useState(100); // 100 kg lot

  const totalBeans = bagusCount + rusakCount + jamurCount + asamCount;

  // Calculate total defect score according to SNI 01-2907
  // - Jamur = 1.0
  // - Asam = 1.0
  // - Rusak / Pecah = 0.2 (5 biji pecah bernilai 1)
  // - Bagus = 0
  const defectRusak = Math.round(rusakCount * SNI_DEFECT_WEIGHTS.rusak * 10) / 10;
  const defectJamur = jamurCount * SNI_DEFECT_WEIGHTS.jamur;
  const defectAsam = asamCount * SNI_DEFECT_WEIGHTS.asam;
  const totalDefects = Math.round((defectRusak + defectJamur + defectAsam) * 10) / 10;

  const batchGrade = calculateBatchSNIGrade(totalDefects);

  // Economic analysis
  const priceBeforeSort = 48000; // Rp/kg if sold as Grade 4 / unpicked mixed
  let currentPrice = 50000;
  if (batchGrade.grade === 'Grade 1') currentPrice = 110000;
  else if (batchGrade.grade === 'Grade 2') currentPrice = 85000;
  else if (batchGrade.grade === 'Grade 3') currentPrice = 68000;
  else currentPrice = 48000;

  const totalRevenue = lotWeightKg * currentPrice;
  const baseRevenue = lotWeightKg * priceBeforeSort;
  const addedValue = totalRevenue - baseRevenue;
  const percentageIncrease = Math.round((addedValue / (baseRevenue || 1)) * 100);

  const applyPreset = (preset: 'specialty' | 'good' | 'mixed' | 'moldy') => {
    if (preset === 'specialty') {
      setBagusCount(275);
      setRusakCount(5);
      setJamurCount(0);
      setAsamCount(0);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else if (preset === 'good') {
      setBagusCount(230);
      setRusakCount(40);
      setJamurCount(4);
      setAsamCount(4);
    } else if (preset === 'mixed') {
      setBagusCount(160);
      setRusakCount(80);
      setJamurCount(15);
      setAsamCount(15);
    } else if (preset === 'moldy') {
      setBagusCount(120);
      setRusakCount(60);
      setJamurCount(45);
      setAsamCount(25);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5 mb-3">
            <Calculator className="w-3.5 h-3.5" /> Standar Resmi SNI 01-2907-2008
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Kalkulator Lot Panen & Nilai Cacat SNI
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Hitung total nilai cacat sampel 300 gram untuk menentukan Grade resmi (Grade 1 - 4) dan estimasi kenaikan pendapatan petani setelah sortasi.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient opacity-10 pointer-events-none"></div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-2">
          Pilihan Simulasi Cepat:
        </span>
        <button
          onClick={() => applyPreset('specialty')}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-all"
        >
          🏆 Target Grade 1 (Spesialti)
        </button>
        <button
          onClick={() => applyPreset('good')}
          className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold transition-all"
        >
          ☕ Grade 2 (Komersial Baik)
        </button>
        <button
          onClick={() => applyPreset('mixed')}
          className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-all"
        >
          ⚠️ Lot Campuran Sebelum Sortasi
        </button>
        <button
          onClick={() => applyPreset('moldy')}
          className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold transition-all"
        >
          🛑 Lot Berjamur Tinggi (Ditolak)
        </button>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Sliders & Counters */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Input Sampel Biji Kopi
              </h3>
              <p className="text-xs text-stone-500">
                Total sampel saat ini: <strong>{totalBeans} biji</strong>
              </p>
            </div>
            <button
              onClick={() => {
                setBagusCount(200);
                setRusakCount(0);
                setJamurCount(0);
                setAsamCount(0);
              }}
              className="p-2 text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1 font-semibold"
              title="Reset ke Nol Cacat"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="space-y-5">
            {/* 1. Biji Bagus */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Biji Bagus / Utuh (Nilai Cacat: 0)
                </span>
                <span className="text-stone-800">{bagusCount} Biji</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                value={bagusCount}
                onChange={(e) => setBagusCount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* 2. Biji Rusak / Pecah */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-amber-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Biji Rusak / Pecah (Nilai Cacat: 0.2 / biji)
                </span>
                <span className="text-stone-800">
                  {rusakCount} Biji ({defectRusak} Cacat)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                value={rusakCount}
                onChange={(e) => setRusakCount(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* 3. Biji Berjamur */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-rose-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Biji Berjamur (Nilai Cacat: 1.0 / biji)
                </span>
                <span className="text-stone-800">
                  {jamurCount} Biji ({defectJamur} Cacat)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={jamurCount}
                onChange={(e) => setJamurCount(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* 4. Biji Asam / Fermentasi */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-orange-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Biji Asam / Stinker (Nilai Cacat: 1.0 / biji)
                </span>
                <span className="text-stone-800">
                  {asamCount} Biji ({defectAsam} Cacat)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={asamCount}
                onChange={(e) => setAsamCount(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Berat Lot Panen */}
            <div className="pt-3 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Estimasi Total Berat Lot Panen Petani (kg):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={lotWeightKg}
                  onChange={(e) => setLotWeightKg(Math.max(1, Number(e.target.value)))}
                  className="w-32 text-sm font-bold p-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <span className="text-xs text-stone-500">Kilogram (Green Bean)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Grade Result & Business Impact */}
        <div className="lg:col-span-5 space-y-6">
          {/* Grade Outcome Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm text-center relative overflow-hidden">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Hasil Mutu SNI 01-2907
            </span>

            <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase mb-3 ${batchGrade.badgeColor}`}>
              {batchGrade.title}
            </div>

            <div className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight mb-2">
              {batchGrade.grade}
            </div>

            <div className="text-xs font-bold text-stone-600 mb-4 bg-stone-100 py-1.5 px-3 rounded-xl inline-block">
              Total Nilai Cacat: <span className="text-amber-800 text-sm">{totalDefects} Poin</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              {batchGrade.description}
            </p>

            <div className="border-t border-stone-200 pt-4 text-left space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Standar Nilai Cacat</span>
                <span className="font-bold text-stone-800">
                  {batchGrade.grade === 'Grade 1' && '≤ 11 Poin'}
                  {batchGrade.grade === 'Grade 2' && '12 – 25 Poin'}
                  {batchGrade.grade === 'Grade 3' && '26 – 44 Poin'}
                  {batchGrade.grade === 'Grade 4' && '45 – 80 Poin'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Estimasi Harga Jual</span>
                <span className="font-bold text-emerald-700">{batchGrade.marketPriceEstimate}</span>
              </div>
            </div>
          </div>

          {/* Business Viability & Economic Gain Card (PPT Slide 2 & 6) */}
          <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-3xl p-6 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> Kriteria: Business Viability
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                +{percentageIncrease}% Pendapatan
              </span>
            </div>

            <h4 className="text-lg font-bold">
              Potensi Pendapatan Lot ({lotWeightKg} kg)
            </h4>

            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Jika lot disortir dengan bantuan AI GradeKopi hingga mencapai {batchGrade.grade}, petani berpotensi mendapatkan nilai tambah sebesar{' '}
              <strong className="text-white">Rp {addedValue.toLocaleString('id-ID')}</strong> dibanding menjual borongan tanpa sortasi (Grade 4).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
