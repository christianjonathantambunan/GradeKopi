import React, { useState } from 'react';
import { Database, Plus, Image as ImageIcon, CheckCircle, AlertCircle, Sparkles, Download, Trash2, CloudUpload } from 'lucide-react';
import { CoffeeClass } from '../types';
import { uploadDatasetImageToSupabase } from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

interface NewDatasetItem {
  id: string;
  category: CoffeeClass;
  imageSrc: string;
  fileName: string;
  addedAt: string;
  uploadedToCloud?: boolean;
}

export const DatasetManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CoffeeClass>('asam');
  const [customItems, setCustomItems] = useState<NewDatasetItem[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isUploadingCloud, setIsUploadingCloud] = useState(false);

  const handleMultipleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    setIsUploadingCloud(true);

    for (const file of fileList) {
      let publicCloudUrl: string | undefined;

      // Jika Supabase aktif, otomatis upload ke Supabase Storage (bucket: coffee-datasets)
      if (isSupabaseConfigured) {
        const uploadRes = await uploadDatasetImageToSupabase(file, selectedCategory);
        if (uploadRes.success) {
          publicCloudUrl = uploadRes.publicUrl;
        }
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const item: NewDatasetItem = {
            id: Math.random().toString(36).substring(2, 9),
            category: selectedCategory,
            imageSrc: publicCloudUrl || (event.target.result as string),
            fileName: file.name,
            addedAt: new Date().toLocaleTimeString('id-ID'),
            uploadedToCloud: Boolean(publicCloudUrl),
          };
          setCustomItems((prev) => [item, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }

    setIsUploadingCloud(false);
    const cloudNote = isSupabaseConfigured ? ' & tersimpan ke Cloud Supabase Storage!' : '!';
    setUploadSuccess(`${fileList.length} foto berhasil ditambahkan ke kategori ${selectedCategory.toUpperCase()}${cloudNote}`);
    setTimeout(() => setUploadSuccess(null), 4000);
  };

  const removeCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
              Koleksi Dataset Biji Kopi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              Status Dataset & Penambahan Foto Baru
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
              Pantau jumlah dataset pelatihan Anda dan tambahkan foto biji asam/berjamur baru secara bertahap langsung melalui antarmuka ini.
            </p>
          </div>
          <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-2xl text-right">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block uppercase font-bold">Total Sampel Asli</span>
            <span className="text-2xl font-black text-stone-900 dark:text-stone-100">622 Foto</span>
          </div>
        </div>
      </div>

      {/* Dataset Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* 1. Biji Bagus */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-2"></div>
          <span className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
            Kategori 1
          </span>
          <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">Biji Bagus</h4>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
            200 <span className="text-xs font-normal text-stone-500 dark:text-stone-400">foto</span>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            100 train + 100 test (Lengkap & Seimbang)
          </p>
          <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            ✓ Siap Pakai
          </span>
        </div>

        {/* 2. Biji Rusak */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mb-2"></div>
          <span className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
            Kategori 2
          </span>
          <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">Biji Pecah/Rusak</h4>
          <div className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-2">
            200 <span className="text-xs font-normal text-stone-500 dark:text-stone-400">foto</span>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            100 train + 100 test (Cacat fisik mekanis)
          </p>
          <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            ✓ Siap Pakai
          </span>
        </div>

        {/* 3. Biji Berjamur */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mb-2"></div>
          <span className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
            Kategori 3
          </span>
          <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">Biji Berjamur</h4>
          <div className="text-2xl font-black text-rose-700 dark:text-rose-400 mt-2">
            22 <span className="text-xs font-normal text-stone-500 dark:text-stone-400">foto</span>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            20 train + 2 test (Cacat spora jamur)
          </p>
          <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
            ✓ Siap Pakai
          </span>
        </div>

        {/* 4. Biji Asam */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mb-2"></div>
          <span className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
            Kategori 4
          </span>
          <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">Biji Asam</h4>
          <div className="text-2xl font-black text-orange-700 dark:text-orange-400 mt-2">
            200 <span className="text-xs font-normal text-stone-500 dark:text-stone-400">foto</span>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            100 train + 100 test (Fermentasi berlebih)
          </p>
          <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300">
            ✓ Siap Pakai
          </span>
        </div>
      </div>

      {/* Upload Additional Data Section */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 transition-colors">
        <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Formulir Unggah Foto Tambahan (Biji Asam & Berjamur)
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Pilih kategori defect lalu unggah satu atau beberapa foto biji kopi untuk memperkaya dataset proyek.
            </p>
          </div>
        </div>

        {uploadSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {uploadSuccess}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form settings */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Pilih Kategori Biji yang Ingin Ditambahkan:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('asam')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedCategory === 'asam'
                      ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-200'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  🟠 Biji Asam (Fermentasi)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('jamur')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedCategory === 'jamur'
                      ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  🟣 Biji Berjamur
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('rusak')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedCategory === 'rusak'
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  🟡 Biji Pecah / Rusak
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('bagus')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedCategory === 'bagus'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  🟢 Biji Bagus
                </button>
              </div>
            </div>

            <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-2">
              <span className="font-bold text-stone-800 dark:text-stone-200 block">💡 Tips Pengambilan Foto Biji Kopi:</span>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li>Gunakan latar belakang berwarna terang / netral (kertas putih atau meja polos).</li>
                <li>Pastikan pencahayaan cukup terang dan merata (hindari bayangan gelap tangan/HP).</li>
                <li>Ambil foto tegak lurus dengan jarak sekitar 15–20 cm dari biji kopi.</li>
              </ul>
            </div>
          </div>

          {/* Upload input box */}
          <div className="flex flex-col justify-center items-center border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl p-6 text-center hover:border-amber-500 bg-stone-50/50 dark:bg-stone-800/30 transition-all">
            <ImageIcon className="w-10 h-10 text-stone-400 dark:text-stone-500 mb-2" />
            <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-1">
              Pilih Foto Biji {selectedCategory.toUpperCase()}
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-4">
              Bisa memilih beberapa file foto sekaligus (.jpg, .png, .webp)
            </p>

            <label className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold cursor-pointer shadow-md shadow-amber-900/10 transition-all">
              Pilih File Foto
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleMultipleFiles}
              />
            </label>
          </div>
        </div>

        {/* Gallery of uploaded additions */}
        {customItems.length > 0 && (
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                Foto Baru yang Ditambahkan ({customItems.length} Foto)
              </h4>
              <button
                onClick={() => setCustomItems([])}
                className="text-xs text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 font-semibold"
              >
                Hapus Semua
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {customItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800"
                >
                  <img
                    src={item.imageSrc}
                    alt={item.fileName}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 px-1 py-0.5 rounded text-[8px] font-bold bg-black/70 text-white uppercase">
                    {item.category}
                  </span>
                  <button
                    onClick={() => removeCustomItem(item.id)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Hapus foto ini"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
