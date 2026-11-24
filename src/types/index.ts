export type CoffeeClass = 'bagus' | 'rusak' | 'jamur' | 'asam' | 'out_of_domain';

export type UncertaintyStatus = 'YAKIN' | 'RAGU' | 'DI_LUAR_DOMAIN';

export type CoffeeGrade = 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4';

export interface DetectionResult {
  primaryClass: CoffeeClass;
  classNameIndo: string;
  confidence: number; // 0 - 100
  probabilities: {
    bagus: number;
    rusak: number;
    jamur: number;
    asam: number;
    out_of_domain?: number;
  };
  uncertaintyStatus: UncertaintyStatus;
  statusBadge: {
    label: string;
    color: string;
    icon: string;
    description: string;
  };
  defectScore: number; // Nilai cacat SNI
  estimatedGrade: CoffeeGrade;
  gradeDescription: string;
  priceImpact: string;
  recommendation: string;
  metrics: {
    circularity: number;
    surfaceVariance: number;
    colorHue: number;
    edgeIntegrity: number;
  };
  timestamp: string;
  imageUrl: string;
}

export interface BatchItem {
  id: string;
  label: CoffeeClass;
  count: number;
}

export interface FeedbackLog {
  id: string;
  timestamp: string;
  predictedClass: CoffeeClass;
  correctedClass: CoffeeClass;
  confidence: number;
  notes?: string;
  imageUrl?: string;
}
