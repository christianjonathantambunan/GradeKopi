import React from 'react';
import { Sparkles, CheckCircle2, AlertOctagon, HelpCircle, AlertTriangle } from 'lucide-react';
import { CoffeeClass } from '../types';

interface SampleItem {
  id: string;
  name: string;
  category: CoffeeClass;
  image: string;
  badge: string;
  badgeColor: string;
  desc: string;
}

const SAMPLES: SampleItem[] = [
  {
    id: 'bagus-1',
    name: 'Biji Bagus (Utuh)',
    category: 'bagus',
    image: '/samples/bagus_1.jpg',
    badge: 'Normal / Sound',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    desc: 'Biji kopi utuh tanpa retak/lubang, warna seragam.',
  },
  {
    id: 'rusak-1',
    name: 'Biji Pecah / Rusak',
    category: 'rusak',
    image: '/samples/rusak_1.jpg',
    badge: 'Broken Defect',
    badgeColor: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    desc: 'Kerusakan mekanis kulit & pecahan biji saat hulling.',
  },
  {
    id: 'jamur-1',
    name: 'Biji Berjamur',
    category: 'jamur',
    image: '/samples/jamur_1.jpg',
    badge: 'Mold / Fungi',
    badgeColor: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700',
    desc: 'Tercemar miselium jamur akibat lembap berlebih.',
  },
  {
    id: 'asam-1',
    name: 'Biji Asam (Fermentasi)',
    category: 'asam',
    image: '/samples/asam_1.jpg',
    badge: 'Sour / Fermented',
    badgeColor: 'bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700',
    desc: 'Oksidasi fermentasi asam cuka berlebih / stinker bean.',
  },
  {
    id: 'bukan-kopi',
    name: 'Uji Luar Domain',
    category: 'out_of_domain',
    image: '/samples/bukan_kopi.jpg',
    badge: 'Slide 4 Test',
    badgeColor: 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-600',
    desc: 'Objek non-kopi untuk menguji penanganan ketidakpastian AI.',
  },
];

interface SampleGalleryProps {
  onSelectSample: (imageSrc: string) => void;
  isLoading: boolean;
}

export const SampleGallery: React.FC<SampleGalleryProps> = ({ onSelectSample, isLoading }) => {
  return (
    <div className="w-full mt-6 bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-5 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <h4 className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
            Coba Cepat Sampel Dataset Asli (1-Klik Uji Coba Demo)
          </h4>
        </div>
        <span className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:inline">
          Diambil langsung dari dataset pelatihan
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {SAMPLES.map((sample) => (
          <button
            key={sample.id}
            type="button"
            disabled={isLoading}
            onClick={() => onSelectSample(sample.image)}
            className="group text-left bg-white dark:bg-stone-850 rounded-xl p-2.5 border border-stone-200 dark:border-stone-750 hover:border-amber-600 dark:hover:border-amber-500 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2 border border-stone-100 dark:border-stone-800 relative">
                <img
                  src={sample.image}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span
                  className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${sample.badgeColor} backdrop-blur-sm`}
                >
                  {sample.badge}
                </span>
              </div>
              <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 line-clamp-1">
                {sample.name}
              </h5>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                {sample.desc}
              </p>
            </div>
            <div className="mt-2 pt-1 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] font-semibold text-amber-700 dark:text-amber-400">
              <span>Uji foto ini</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
