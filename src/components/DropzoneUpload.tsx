import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';

interface DropzoneUploadProps {
  onImageSelected: (imageSrc: string) => void;
  onOpenLiveCamera: () => void;
  isLoading: boolean;
}

export const DropzoneUpload: React.FC<DropzoneUploadProps> = ({
  onImageSelected,
  onOpenLiveCamera,
  isLoading,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid (JPG, PNG, atau WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelected(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-amber-600 bg-amber-50/70 scale-[1.01]'
            : 'border-stone-300 hover:border-amber-500 bg-white hover:bg-stone-50/80 shadow-sm'
        }`}
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-stone-800 mb-1">
            Unggah Foto Biji Kopi
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mb-6">
            Tarik & lepaskan file foto ke sini, atau klik untuk memilih file dari komputer / galeri HP.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              Pilih dari Galeri
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLiveCamera();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md shadow-amber-900/10 transition-all"
            >
              <Camera className="w-4 h-4" />
              Buka Kamera Langsung
            </button>
          </div>

          <span className="mt-4 text-[11px] text-stone-400 font-medium">
            Format yang didukung: JPG, PNG, WEBP (Resolusi rekomendasi min. 400x400 px)
          </span>
        </div>
      </div>
    </div>
  );
};
