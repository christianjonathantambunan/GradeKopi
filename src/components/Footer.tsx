import React from 'react';
import { Coffee, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center">
              <Coffee className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                Grade<span className="text-amber-700 dark:text-amber-500">Kopi</span>
              </span>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Platform AI Deteksi & Grading Biji Kopi Indonesia Berdasarkan Standar SNI 01-2907
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-stone-500 dark:text-stone-400 space-y-1">
            <p>
              KEB1322 Grand Demo Day · Perancangan Produk AI untuk Pertanian
            </p>
            <p className="flex items-center justify-center md:justify-end gap-1 text-[11px] text-stone-400 dark:text-stone-500">
              Dibuat untuk petani & industri kopi Indonesia
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 dark:text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} GradeKopi. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span>Standar SNI 01-2907-2008</span>
            <span>•</span>
            <span>Client-side AI Zero-Cost</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
