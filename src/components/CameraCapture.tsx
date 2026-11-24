import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, AlertCircle, Sparkles, X, Check } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onCancel: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const startCamera = async (mode: 'environment' | 'user') => {
    setIsInitializing(true);
    setCameraError(null);

    // Stop existing stream if any
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        'Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin akses kamera pada browser.'
      );
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const switchCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    onCapture(dataUrl);
  };

  return (
    <div className="relative bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 text-white p-4">
      {/* Header controls */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-sm font-semibold tracking-wide">Live Camera Scanner</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={switchCamera}
            className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
            title="Ganti Kamera Depan/Belakang"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Ganti Kamera
          </button>
          <button
            onClick={() => {
              if (stream) stream.getTracks().forEach((track) => track.stop());
              onCancel();
            }}
            className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-all"
            title="Tutup Kamera"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Viewport */}
      <div className="relative aspect-square sm:aspect-video w-full max-h-[460px] bg-black rounded-2xl overflow-hidden flex items-center justify-center">
        {cameraError ? (
          <div className="text-center p-6 max-w-sm">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <p className="text-sm text-stone-300 mb-4">{cameraError}</p>
            <button
              onClick={() => startCamera(facingMode)}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-semibold rounded-xl"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Target Reticle / Grid Overlay for Coffee Bean Positioning */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Outer guide ring */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-dashed border-amber-400/60 flex items-center justify-center animate-pulse-slow">
                {/* Center crosshair */}
                <div className="w-16 h-16 border border-amber-300/40 rounded-xl relative">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-400/50"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-amber-400/50"></div>
                </div>
              </div>
            </div>

            {/* Hint overlay */}
            <div className="absolute bottom-4 inset-x-4 bg-stone-900/85 backdrop-blur-md px-4 py-2 rounded-xl text-center text-xs text-stone-300 border border-stone-700/60">
              💡 Posisikan biji kopi tepat di dalam lingkaran tengah dengan jarak sekitar 15–20 cm.
            </div>
          </>
        )}
      </div>

      {/* Shutter Button Action */}
      {!cameraError && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={takeSnapshot}
            disabled={isInitializing}
            className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-900 shadow-lg shadow-amber-600/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
