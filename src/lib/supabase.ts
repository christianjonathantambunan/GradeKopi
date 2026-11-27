import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ScanHistoryRecord {
  id?: string;
  created_at?: string;
  image_url?: string;
  primary_class: string;
  confidence: number;
  grade: string;
  defect_score: number;
  uncertainty_status: string;
  metrics?: Record<string, any>;
  notes?: string;
}

export interface HumanFeedbackRecord {
  id?: string;
  created_at?: string;
  scan_id?: string;
  predicted_class: string;
  corrected_class: string;
  confidence: number;
  notes?: string;
  image_url?: string;
}

export interface CustomDatasetRecord {
  id?: string;
  created_at?: string;
  category: string;
  file_name: string;
  image_url: string;
}
