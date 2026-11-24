import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DropzoneUpload } from './components/DropzoneUpload';
import { CameraCapture } from './components/CameraCapture';
import { SampleGallery } from './components/SampleGallery';
import { ResultCard } from './components/ResultCard';
import { BatchCalculator } from './components/BatchCalculator';
import { PresentationMode } from './components/PresentationMode';
import { DatasetManager } from './components/DatasetManager';
import { AboutStandards } from './components/AboutStandards';
import { Footer } from './components/Footer';
import { analyzeCoffeeImage } from './services/coffeeAnalyzer';
import { saveScanToSupabase, saveFeedbackToSupabase } from './services/supabaseService';
import { isSupabaseConfigured } from './lib/supabase';
import { DetectionResult, FeedbackLog } from './types';
import { Sparkles, AlertCircle, Coffee, CheckCircle2, Database } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'detect' | 'batch' | 'presentation' | 'dataset' | 'about'>('detect');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [feedbackLogs, setFeedbackLogs] = useState<FeedbackLog[]>([]);

  const handleImageAnalysis = async (imageSrc: string) => {
    setIsLoading(true);
    setAnalysisError(null);
    setIsCameraOpen(false);

    try {
      const result = await analyzeCoffeeImage(imageSrc);
      setDetectionResult(result);
      
      // Simpan otomatis ke Supabase jika sudah dikonfigurasi
      if (isSupabaseConfigured) {
        saveScanToSupabase(result).catch((err) => console.warn('Supabase auto-save:', err));
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setAnalysisError('Terjadi kesalahan saat memproses gambar. Pastikan format file gambar valid.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSaved = (log: FeedbackLog) => {
    setFeedbackLogs((prev) => [log, ...prev]);
    // Simpan koreksi Human-in-the-Loop ke Supabase
    if (isSupabaseConfigured) {
      saveFeedbackToSupabase(log).catch((err) => console.warn('Supabase feedback save:', err));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* TAB 1: DETEKSI & GRADING */}
        {activeTab === 'detect' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Banner */}
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Computer Vision AI Berbasis Standar SNI Kopi Biji
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
                Pindai & Nilai Mutu <span className="text-amber-700">Biji Kopi</span>
              </h1>
              <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
                Klasifikasikan biji bagus, rusak/pecah, berjamur, dan asam secara otomatis. Dapatkan penilaian Grade 1 hingga Grade 4 instan langsung dari foto atau kamera HP.
              </p>
            </div>

            {/* Error Message */}
            {analysisError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
                <span>{analysisError}</span>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="bg-white rounded-3xl p-12 border border-stone-200 text-center shadow-lg space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center animate-spin">
                  <Coffee className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  Menganalisis Morfologi & Cacat Biji Kopi...
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Mengekstraksi tekstur Laplacian, spektrum warna LAB/HSV, dan menghitung nilai cacat SNI...
                </p>
              </div>
            )}

            {/* Active Views: Camera vs Dropzone vs Result */}
            {!isLoading && (
              <>
                {detectionResult ? (
                  <ResultCard
                    result={detectionResult}
                    onReset={() => setDetectionResult(null)}
                    onFeedbackSaved={handleFeedbackSaved}
                  />
                ) : isCameraOpen ? (
                  <CameraCapture
                    onCapture={handleImageAnalysis}
                    onCancel={() => setIsCameraOpen(false)}
                  />
                ) : (
                  <div className="space-y-6">
                    <DropzoneUpload
                      onImageSelected={handleImageAnalysis}
                      onOpenLiveCamera={() => setIsCameraOpen(true)}
                      isLoading={isLoading}
                    />

                    {/* Quick Test Samples */}
                    <SampleGallery
                      onSelectSample={handleImageAnalysis}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB 2: KALKULATOR SNI (LOT BATCH) */}
        {activeTab === 'batch' && <BatchCalculator />}

        {/* TAB 3: DEMO PITCH DECK (9 SLIDE PPT) */}
        {activeTab === 'presentation' && <PresentationMode />}

        {/* TAB 4: DATASET MANAGEMENT */}
        {activeTab === 'dataset' && <DatasetManager />}

        {/* TAB 5: STANDAR & TATA KELOLA */}
        {activeTab === 'about' && <AboutStandards />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
