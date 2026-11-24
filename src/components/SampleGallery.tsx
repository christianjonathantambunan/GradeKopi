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
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: 'Biji kopi utuh tanpa retak/lubang, warna seragam.',
  },
  {
    id: 'rusak-1',
    name: 'Biji Pecah / Rusak',
    category: 'rusak',
    image: '/samples/rusak_1.jpg',
    badge: 'Broken Defect',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: 'Kerusakan mekanis kulit & pecahan biji saat hulling.',
  },
  {
    id: 'jamur-1',
    name: 'Biji Berjamur',
    category: 'jamur',
    image: '/samples/jamur_1.jpg',
    badge: 'Mold / Fungi',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: 'Tercemar miselium jamur akibat lembap berlebih.',
  },
  {
    id: 'asam-1',
    name: 'Biji Asam (Fermentasi)',
    category: 'asam',
    image: '/samples/asam_1.jpg',
    badge: 'Sour / Fermented',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    desc: 'Oksidasi fermentasi asam cuka berlebih / stinker bean.',
  },
  {
    id: 'bukan-kopi',
    name: 'Uji Luar Domain',
    category: 'out_of_domain',
    image: '/samples/bukan_kopi.jpg',
    badge: 'Slide 4 Test',
    badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
    desc: 'Objek non-kopi untuk menguji penanganan ketidakpastian AI.',
  },
];

interface SampleGalleryProps {
  onSelectSample: (imageSrc: string) => void;
  isLoading: boolean;
}

export const SampleGallery: React.FC<SampleGalleryProps> = ({ onSelectSample, isLoading }) => {
  return (
    <div className="w-full mt-6 bg-stone-50 border border-stone-200/80 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <h4 className="text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wider">
            Coba Cepat Sampel Dataset Asli (1-Klik Uji Coba Demo)
          </h4>
        </div>
        <span className="text-[11px] text-stone-500 hidden sm:inline">
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
            className="group text-left bg-white rounded-xl p-2.5 border border-stone-200 hover:border-amber-600 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-stone-100 mb-2 border border-stone-100 relative">
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
              <h5 className="text-xs font-bold text-stone-900 group-hover:text-amber-800 line-clamp-1">
                {sample.name}
              </h5>
              <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">
                {sample.desc}
              </p>
            </div>
            <div className="mt-2 pt-1 border-t border-stone-100 flex items-center justify-between text-[10px] font-semibold text-amber-700">
              <span>Uji foto ini</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
