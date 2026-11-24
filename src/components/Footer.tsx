import React from 'react';
import { Coffee, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center">
              <Coffee className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="text-base font-extrabold text-stone-900">
                Grade<span className="text-amber-700">Kopi</span>
              </span>
              <p className="text-xs text-stone-500">
                Platform AI Deteksi & Grading Biji Kopi Indonesia Berdasarkan Standar SNI 01-2907
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-stone-500 space-y-1">
            <p>
              KEB1322 Grand Demo Day · Perancangan Produk AI untuk Pertanian
            </p>
            <p className="flex items-center justify-center md:justify-end gap-1 text-[11px] text-stone-400">
              Dibuat untuk petani & industri kopi Indonesia · Siap dideploy di Vercel
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} GradeKopi. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span>Standar SNI 01-2907-2008</span>
            <span>•</span>
            <span>Client-side AI Zero-Cost</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">100% Vercel Edge Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
