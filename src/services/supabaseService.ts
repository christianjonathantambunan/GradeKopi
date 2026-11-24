import { supabase, isSupabaseConfigured, ScanHistoryRecord, HumanFeedbackRecord, CustomDatasetRecord } from '../lib/supabase';
import { DetectionResult, FeedbackLog } from '../types';

/**
 * Simpan hasil pemindaian (Scan History) ke Supabase
 */
export async function saveScanToSupabase(result: DetectionResult): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase belum dikonfigurasi (periksa .env)' };
  }

  try {
    const record: ScanHistoryRecord = {
      image_url: result.imageUrl.startsWith('data:') ? undefined : result.imageUrl,
      primary_class: result.primaryClass,
      confidence: result.confidence,
      grade: result.estimatedGrade,
      defect_score: result.defectScore,
      uncertainty_status: result.uncertaintyStatus,
      metrics: result.metrics,
      notes: `${result.classNameIndo} - ${result.priceImpact}`,
    };

    const { data, error } = await supabase.from('scan_history').insert([record]).select();

    if (error) {
      console.warn('Gagal menyimpan scan ke Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Error saat insert scan_history:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Simpan koreksi pengguna (Human-in-the-Loop Feedback) ke Supabase
 */
export async function saveFeedbackToSupabase(log: FeedbackLog): Promise<{ success: boolean; data?: any; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase belum dikonfigurasi (periksa .env)' };
  }

  try {
    const record: HumanFeedbackRecord = {
      predicted_class: log.predictedClass,
      corrected_class: log.correctedClass,
      confidence: log.confidence,
      notes: log.notes,
      image_url: log.imageUrl?.startsWith('data:') ? undefined : log.imageUrl,
    };

    const { data, error } = await supabase.from('human_feedback').insert([record]).select();

    if (error) {
      console.warn('Gagal menyimpan feedback ke Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Error saat insert human_feedback:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Mengunggah file foto dataset ke Supabase Storage (bucket: coffee-datasets)
 * dan mencatat metadatanya ke tabel custom_dataset
 */
export async function uploadDatasetImageToSupabase(
  file: File,
  category: string
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase belum dikonfigurasi.' };
  }

  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${category}/${Date.now()}_${cleanFileName}`;

    // 1. Upload binary file ke Supabase Storage Bucket
    const { data: storageData, error: storageError } = await supabase.storage
      .from('coffee-datasets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (storageError) {
      console.warn('Error upload storage:', storageError.message);
      return { success: false, error: storageError.message };
    }

    // 2. Dapatkan Public URL foto
    const { data: urlData } = supabase.storage
      .from('coffee-datasets')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    // 3. Simpan metadata foto ke tabel custom_dataset
    await supabase.from('custom_dataset').insert([
      {
        category,
        file_name: file.name,
        storage_path: filePath,
        image_url: publicUrl,
        file_size: file.size,
      },
    ]);

    return { success: true, publicUrl };
  } catch (err: any) {
    console.error('Upload dataset error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Mengambil riwayat pemindaian terbaru dari Supabase
 */
export async function fetchScanHistory(limit = 20): Promise<ScanHistoryRecord[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  try {
    const { data, error } = await supabase
      .from('scan_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Gagal mengambil history:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Error fetchScanHistory:', err);
    return [];
  }
}

/**
 * Mengambil ringkasan statistik pemindaian
 */
export async function fetchScanStats(): Promise<{ total: number; grade1: number; defects: number }> {
  if (!isSupabaseConfigured || !supabase) {
    return { total: 0, grade1: 0, defects: 0 };
  }

  try {
    const { data, error } = await supabase.from('scan_history').select('primary_class, grade');
    if (error || !data) return { total: 0, grade1: 0, defects: 0 };

    const total = data.length;
    const grade1 = data.filter((d) => d.grade === 'Grade 1').length;
    const defects = data.filter((d) => d.primary_class !== 'bagus').length;

    return { total, grade1, defects };
  } catch (err) {
    return { total: 0, grade1: 0, defects: 0 };
  }
}
