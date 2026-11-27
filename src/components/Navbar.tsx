import React from 'react';
import { Coffee, Award, Sparkles, CheckCircle2, AlertCircle, Database, Sun, Moon } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: 'detect' | 'batch' | 'dataset' | 'about';
  setActiveTab: (tab: 'detect' | 'batch' | 'dataset' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('detect')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-800 to-stone-900 flex items-center justify-center text-white shadow-md shadow-amber-900/20">
              <Coffee className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                  Grade<span className="text-amber-700 dark:text-amber-500">Kopi</span>
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Vision SNI
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Sistem Deteksi & Penilaian Mutu Biji Kopi Indonesia (Grade 1 - 4)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-xl border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setActiveTab('detect')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'detect'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-700/50'
              }`}
            >
              🔍 Deteksi & Grading
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'batch'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-700/50'
              }`}
            >
              🧮 Kalkulator SNI (Lot)
            </button>
            <button
              onClick={() => setActiveTab('dataset')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'dataset'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-700/50'
              }`}
            >
              🗂️ Dataset Kopi
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'about'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-700/50'
              }`}
            >
              ℹ️ Standar & Tata Kelola
            </button>
          </nav>

          {/* Right Controls: Theme Toggle & Status Badge */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Mode Gelap/Terang"
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all shadow-sm flex items-center justify-center"
              title={theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>

            {/* Supabase Status Badge */}
            <span
              className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
              title={isSupabaseConfigured ? 'Terhubung ke Database Supabase' : 'Supabase belum dikonfigurasi (Local Mode)'}
            >
              <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`} />
              {isSupabaseConfigured ? 'Supabase Connected' : 'Local Mode'}
            </span>

            <div className="text-right hidden sm:block">
              <span className="block text-xs font-bold text-stone-800 dark:text-stone-200">KEB1322</span>
              <span className="block text-[10px] text-stone-500 dark:text-stone-400">AI Pertanian</span>
            </div>
          </div>
        </div>

        {/* Mobile Tab bar */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-stone-200 dark:border-stone-800 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('detect')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'detect' ? 'bg-amber-700 text-white' : 'text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800'
            }`}
          >
            🔍 Deteksi
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'batch' ? 'bg-amber-700 text-white' : 'text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800'
            }`}
          >
            🧮 Kalkulator SNI
          </button>
          <button
            onClick={() => setActiveTab('dataset')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'dataset' ? 'bg-amber-700 text-white' : 'text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800'
            }`}
          >
            🗂️ Dataset
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
              activeTab === 'about' ? 'bg-amber-700 text-white' : 'text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800'
            }`}
          >
            ℹ️ Standar
          </button>
        </div>
      </div>
    </header>
  );
};
