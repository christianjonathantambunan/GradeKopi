-- ==========================================================
-- SKEMA DATABASE & STORAGE SUPABASE UNTUK GRADEKOPI
-- Salin dan jalankan skrip ini di SQL Editor dashboard Supabase Anda
-- ==========================================================

-- 1. Tabel Riwayat Pindai (Scan History)
CREATE TABLE IF NOT EXISTS scan_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    image_url TEXT,
    primary_class VARCHAR(50) NOT NULL, -- bagus, rusak, jamur, asam, out_of_domain
    confidence NUMERIC NOT NULL,
    grade VARCHAR(20) NOT NULL, -- Grade 1, Grade 2, Grade 3, Grade 4
    defect_score NUMERIC NOT NULL DEFAULT 0,
    uncertainty_status VARCHAR(30) NOT NULL, -- YAKIN, RAGU, DI_LUAR_DOMAIN
    metrics JSONB, -- circularity, surfaceVariance, colorHue, edgeIntegrity
    notes TEXT
);

-- 2. Tabel Koreksi Pengguna (Human-in-the-Loop Feedback)
CREATE TABLE IF NOT EXISTS human_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scan_id UUID REFERENCES scan_history(id) ON DELETE SET NULL,
    predicted_class VARCHAR(50) NOT NULL,
    corrected_class VARCHAR(50) NOT NULL,
    confidence NUMERIC,
    notes TEXT,
    image_url TEXT
);

-- 3. Tabel Koleksi Dataset Foto (Menyimpan Metadata Foto Banyak)
CREATE TABLE IF NOT EXISTS custom_dataset (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    category VARCHAR(50) NOT NULL, -- bijibagus, bijirusak, bijijamur, bijiasam
    file_name VARCHAR(255) NOT NULL,
    storage_path TEXT,
    image_url TEXT NOT NULL,
    file_size NUMERIC,
    uploaded_by TEXT DEFAULT 'web_user'
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE scan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE human_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_dataset ENABLE ROW LEVEL SECURITY;

-- Policy Akses Publik untuk Tabel
CREATE POLICY "Public Read Scan History" ON scan_history FOR SELECT USING (true);
CREATE POLICY "Public Insert Scan History" ON scan_history FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Feedback" ON human_feedback FOR SELECT USING (true);
CREATE POLICY "Public Insert Feedback" ON human_feedback FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Dataset" ON custom_dataset FOR SELECT USING (true);
CREATE POLICY "Public Insert Dataset" ON custom_dataset FOR INSERT WITH CHECK (true);

-- ==========================================================
-- SETUP SUPABASE STORAGE (BUCKET: coffee-datasets)
-- ==========================================================
-- Membuat storage bucket khusus untuk foto-foto biji kopi
INSERT INTO storage.buckets (id, name, public) 
VALUES ('coffee-datasets', 'coffee-datasets', true)
ON CONFLICT (id) DO NOTHING;

-- Policy agar user / aplikasi dapat mengunggah dan melihat foto di storage bucket
CREATE POLICY "Public Access Coffee Dataset Images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'coffee-datasets');

CREATE POLICY "Public Upload Coffee Dataset Images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'coffee-datasets');
