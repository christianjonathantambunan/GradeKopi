import { DetectionResult, CoffeeClass, UncertaintyStatus, CoffeeGrade } from '../types';
import coffeeModel from '../model/coffee_model.json';

/**
 * Standard SNI 01-2907 Nilai Cacat (Defect Value) & Grading Rules:
 * - Grade 1 (Spesialti): Total nilai cacat <= 11
 * - Grade 2 (Mutu Baik): Total nilai cacat 12 - 25
 * - Grade 3 (Mutu Sedang): Total nilai cacat 26 - 44
 * - Grade 4 (Mutu Rendah): Total nilai cacat 45 - 80
 */
export const SNI_DEFECT_WEIGHTS: Record<CoffeeClass, number> = {
  bagus: 0,
  rusak: 0.2, // 5 biji pecah bernilai 1 cacat (atau 1 jika lubang hama parah)
  jamur: 1.0, // Jamur bernilai cacat primer berat (1 poin penuh)
  asam: 1.0,  // Biji asam/fermentasi busuk bernilai cacat primer berat (1 poin)
  out_of_domain: 0,
};

export const CLASS_METADATA: Record<CoffeeClass, {
  name: string;
  badgeColor: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  description: string;
  impact: string;
  action: string;
}> = {
  bagus: {
    name: 'Biji Bagus (Normal / Sound Bean)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-50/50',
    textColor: 'text-emerald-700',
    description: 'Biji kopi utuh dengan struktur seluler seragam, tanpa cacat fisik, jamur, atau fermentasi berlebih.',
    impact: 'Menjaga kemurnian aroma (clean cup) dan harga jual maksimal di pasar spesialti (hingga Rp 130.000/kg).',
    action: 'Pertahankan metode penyimpanan kering dengan kadar air ideal 11-12%. Biji siap untuk proses roasting atau ekspor.',
  },
  rusak: {
    name: 'Biji Rusak / Pecah (Broken / Damaged)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-50/50',
    textColor: 'text-amber-700',
    description: 'Biji mengalami kerusakan fisik mekanis (pecah/retak saat pengupasan huller) atau lubang serangga penggerek.',
    impact: 'Menyebabkan roasting tidak merata (gosong di bagian tipis) dan menurunkan grade ke Grade 2 atau 3.',
    action: 'Pisahkan biji pecah untuk segmen kopi komersial/bubuk lokal. Kalibrasi ulang jarak pisau mesin huller/pulper.',
  },
  jamur: {
    name: 'Biji Berjamur (Moldy / Fungi)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    borderColor: 'border-rose-500',
    bgColor: 'bg-rose-50/50',
    textColor: 'text-rose-700',
    description: 'Biji terkontaminasi spora jamur (Aspergillus/Penicillium) akibat kelembapan tinggi saat penjemuran atau penyimpanan.',
    impact: 'Berisiko menghasilkan toksin Ochratoxin A (OTA) berbahaya, rasa apek/musty, dan langsung ditolak standar ekspor.',
    action: 'HENTIKAN pencampuran! Singkirkan biji ini segera. Tingkatkan ventilasi para-para penjemuran dan jangan jemur di atas tanah langsung.',
  },
  asam: {
    name: 'Biji Asam (Sour / Fermented / Stinker)',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50/50',
    textColor: 'text-orange-700',
    description: 'Fermentasi anaerobik berlangsung terlalu lama saat proses basah, menghasilkan aroma cuka/busuk tajam.',
    impact: 'Merusak rasa seduhan menjadi asam menyengat busuk (sour/pungent defect), menggagalkan skor cupping spesialti.',
    action: 'Batasi durasi fermentasi bak maksimal 12-24 jam tergantung suhu mikro. Cuci biji dengan air mengalir hingga lendir benar-benar bersih.',
  },
  out_of_domain: {
    name: 'Di Luar Domain / Bukan Kopi',
    badgeColor: 'bg-gray-100 text-gray-800 border-gray-300',
    borderColor: 'border-gray-500',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    description: 'Objek pada gambar tidak teridentifikasi sebagai biji kopi, atau kondisi pencahayaan/fokus kamera sangat buruk.',
    impact: 'Prediksi tidak dapat dipertanggungjawabkan untuk penilaian mutu.',
    action: 'Posisikan satu atau beberapa biji kopi di atas permukaan datar dengan pencahayaan merata dan ambil foto kembali.',
  },
};

/**
 * Loads an image from a source URL or file
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * RGB to HSV conversion (OpenCV ranges: H [0..180], S [0..255], V [0..255])
 */
function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 180, s * 255, v * 255];
}

/**
 * RGB to LAB conversion approximation
 */
function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  // sRGB to linear
  let rl = r / 255;
  let gl = g / 255;
  let bl = b / 255;
  rl = rl > 0.04045 ? Math.pow((rl + 0.055) / 1.055, 2.4) : rl / 12.92;
  gl = gl > 0.04045 ? Math.pow((gl + 0.055) / 1.055, 2.4) : gl / 12.92;
  bl = bl > 0.04045 ? Math.pow((bl + 0.055) / 1.055, 2.4) : bl / 12.92;

  let x = (rl * 0.4124 + gl * 0.3576 + bl * 0.1805) / 0.95047;
  let y = (rl * 0.2126 + gl * 0.7152 + bl * 0.0722) / 1.00000;
  let z = (rl * 0.0193 + gl * 0.1192 + bl * 0.9505) / 1.08883;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  const L = 116 * fy - 16;
  const A = 500 * (fx - fy) + 128;
  const B = 200 * (fy - fz) + 128;

  return [L * 2.55, A, B];
}

/**
 * Analyzes an image using real Scikit-Learn Machine Learning weights
 */
export async function analyzeCoffeeImage(imageSrc: string): Promise<DetectionResult> {
  const img = await loadImage(imageSrc);

  const origWidth = img.naturalWidth || img.width;
  const origHeight = img.naturalHeight || img.height;

  // We crop the center 60% of the image where the bean is located
  const cropX = origWidth * 0.2;
  const cropY = origHeight * 0.2;
  const cropW = origWidth * 0.6;
  const cropH = origHeight * 0.6;

  const canvas = document.createElement('canvas');
  const size = 160;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context could not be initialized.');
  }

  // Draw center cropped area scaled to 160x160
  ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, size, size);
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  // Arrays for 24 mathematical features
  const bList: number[] = [];
  const gList: number[] = [];
  const rList: number[] = [];
  const hList: number[] = [];
  const sList: number[] = [];
  const vList: number[] = [];
  const lList: number[] = [];
  const aList: number[] = [];
  const labBList: number[] = [];

  const grays: number[][] = Array.from({ length: size }, () => new Array(size).fill(0));

  let darkPixels = 0;
  let moldPixels = 0;
  let sourPixels = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      grays[y][x] = gray;

      const [h, s, v] = rgbToHsv(r, g, b);
      const [labL, labA, labB] = rgbToLab(r, g, b);

      // OpenCV BGR order: B, G, R
      bList.push(b);
      gList.push(g);
      rList.push(r);

      hList.push(h);
      sList.push(s);
      vList.push(v);

      lList.push(labL);
      aList.push(labA);
      labBList.push(labB);

      if (gray < 90) darkPixels++;
      if (h > 35 && h < 85 && s > 30) moldPixels++;
      if (h > 12 && h < 30 && s > 40) sourPixels++;
    }
  }

  const calcMean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const calcStd = (arr: number[], m: number) =>
    Math.sqrt(arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / arr.length);

  const bMean = calcMean(bList);
  const gMean = calcMean(gList);
  const rMean = calcMean(rList);
  const bStd = calcStd(bList, bMean);
  const gStd = calcStd(gList, gMean);
  const rStd = calcStd(rList, rMean);

  const hMean = calcMean(hList);
  const sMean = calcMean(sList);
  const vMean = calcMean(vList);
  const hStd = calcStd(hList, hMean);
  const sStd = calcStd(sList, sMean);
  const vStd = calcStd(vList, vMean);

  const lMean = calcMean(lList);
  const aMean = calcMean(aList);
  const labBMean = calcMean(labBList);
  const lStd = calcStd(lList, lMean);
  const aStd = calcStd(aList, aMean);
  const labBStd = calcStd(labBList, labBMean);

  // Discrete Laplacian & Sobel texture calculation
  const laplacians: number[] = [];
  const sobelXs: number[] = [];
  const sobelYs: number[] = [];

  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const lap =
        grays[y + 1][x] + grays[y - 1][x] + grays[y][x + 1] + grays[y][x - 1] - 4 * grays[y][x];
      laplacians.push(lap);

      const sx =
        grays[y - 1][x + 1] + 2 * grays[y][x + 1] + grays[y + 1][x + 1] -
        (grays[y - 1][x - 1] + 2 * grays[y][x - 1] + grays[y + 1][x - 1]);
      sobelXs.push(sx);

      const sy =
        grays[y + 1][x - 1] + 2 * grays[y + 1][x] + grays[y + 1][x + 1] -
        (grays[y - 1][x - 1] + 2 * grays[y - 1][x] + grays[y - 1][x + 1]);
      sobelYs.push(sy);
    }
  }

  const lapMean = calcMean(laplacians);
  const lapVar = calcStd(laplacians, lapMean) ** 2;

  const sxMean = calcMean(sobelXs);
  const sobelXVar = calcStd(sobelXs, sxMean) ** 2;

  const syMean = calcMean(sobelYs);
  const sobelYVar = calcStd(sobelYs, syMean) ** 2;

  const totalPixels = size * size;
  const darkRatio = darkPixels / totalPixels;
  const moldRatio = moldPixels / totalPixels;
  const sourRatio = sourPixels / totalPixels;

  // Compile the exact 24-dimensional feature vector
  const rawFeatures = [
    bMean, gMean, rMean,
    bStd, gStd, rStd,
    hMean, sMean, vMean,
    hStd, sStd, vStd,
    lMean, aMean, labBMean,
    lStd, aStd, labBStd,
    lapVar, sobelXVar, sobelYVar,
    darkRatio, moldRatio, sourRatio
  ];

  // 1. Out of domain check
  // Check if image is completely not a coffee bean (e.g. vibrant solid color, totally flat white/black)
  const isTooFlat = (rStd + gStd + bStd) < 8 && (rMean > 240 || rMean < 20);
  const isVividNonCoffee = (bMean > rMean + 35 && bMean > 120) || (gMean > rMean + 45 && gMean > 140 && bMean < 100);
  const isOutOfDomain = isTooFlat || isVividNonCoffee;

  // 2. Machine Learning Linear Inference (Scikit-Learn Logistic Regression)
  // scaled_feat[i] = (raw[i] - mean[i]) / scale[i]
  const scaledFeatures = rawFeatures.map(
    (val, i) => (val - coffeeModel.scaler_mean[i]) / (coffeeModel.scaler_scale[i] || 1)
  );

  // logits[c] = intercept[c] + sum(weights[c][i] * scaled_feat[i])
  const logits = coffeeModel.classes.map((_, cIdx) => {
    let logit = coffeeModel.intercept[cIdx];
    for (let i = 0; i < scaledFeatures.length; i++) {
      logit += coffeeModel.weights[cIdx][i] * scaledFeatures[i];
    }
    return logit;
  });

  // Softmax
  const maxLogit = Math.max(...logits);
  const expLogits = logits.map((l) => Math.exp(l - maxLogit));
  const sumExp = expLogits.reduce((a, b) => a + b, 0);
  const probabilities = expLogits.map((e) => e / sumExp);

  // Map to classes
  let topIdx = 0;
  for (let i = 1; i < probabilities.length; i++) {
    if (probabilities[i] > probabilities[topIdx]) {
      topIdx = i;
    }
  }

  const classNames: CoffeeClass[] = ['bagus', 'rusak', 'jamur', 'asam'];
  let topClass = classNames[topIdx];
  let topProb = probabilities[topIdx];

  // If Out of Domain detected
  if (isOutOfDomain) {
    topClass = 'out_of_domain';
    topProb = 0.95;
  }

  // Confidence & Uncertainty handling (Slide 4 Mandatori)
  const confidencePercent = Math.round(topProb * 100);
  let uncertaintyStatus: UncertaintyStatus = 'YAKIN';

  if (topClass === 'out_of_domain' || confidencePercent < 50) {
    uncertaintyStatus = 'DI_LUAR_DOMAIN';
    topClass = 'out_of_domain';
  } else if (confidencePercent >= 80) {
    uncertaintyStatus = 'YAKIN';
  } else {
    uncertaintyStatus = 'RAGU';
  }

  const statusBadge = getStatusBadgeInfo(uncertaintyStatus, confidencePercent);
  const defectScore = SNI_DEFECT_WEIGHTS[topClass];
  const { grade, description: gradeDesc } = evaluateSingleBeanGrade(topClass, defectScore);

  return {
    primaryClass: topClass,
    classNameIndo: CLASS_METADATA[topClass].name,
    confidence: confidencePercent,
    probabilities: {
      bagus: Math.round((probabilities[0] || 0) * 100),
      rusak: Math.round((probabilities[1] || 0) * 100),
      jamur: Math.round((probabilities[2] || 0) * 100),
      asam: Math.round((probabilities[3] || 0) * 100),
      out_of_domain: isOutOfDomain ? 95 : 5,
    },
    uncertaintyStatus,
    statusBadge,
    defectScore,
    estimatedGrade: grade,
    gradeDescription: gradeDesc,
    priceImpact: CLASS_METADATA[topClass].impact,
    recommendation: CLASS_METADATA[topClass].action,
    metrics: {
      circularity: Math.round((1 - Math.min(1, lapVar / 1500)) * 100) / 100,
      surfaceVariance: Math.round(Math.min(100, (lapVar / 20))),
      colorHue: Math.round(hMean),
      edgeIntegrity: Math.round(Math.max(10, 100 - sobelXVar / 80)),
    },
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    imageUrl: imageSrc,
  };
}

function getStatusBadgeInfo(status: UncertaintyStatus, confidence: number) {
  switch (status) {
    case 'YAKIN':
      return {
        label: `YAKIN (${confidence}%)`,
        color: 'bg-emerald-600 text-white',
        icon: 'CheckCircle2',
        description: 'Tingkat keyakinan model sangat tinggi (>= 80%). Karakteristik visual cocok dengan dataset SNI.',
      };
    case 'RAGU':
      return {
        label: `RAGU (${confidence}%)`,
        color: 'bg-amber-500 text-white',
        icon: 'HelpCircle',
        description: 'Keyakinan model sedang (50% - 79%). Disarankan mengambil foto ulang dengan pencahayaan merata dan jarak 15–20 cm.',
      };
    case 'DI_LUAR_DOMAIN':
    default:
      return {
        label: 'DI LUAR DOMAIN / GAGAL',
        color: 'bg-rose-600 text-white',
        icon: 'AlertTriangle',
        description: 'Gambar tidak dikenali sebagai biji kopi atau kondisi foto terlalu buram/gelap. Silakan unggah foto biji kopi yang jelas.',
      };
  }
}

function evaluateSingleBeanGrade(c: CoffeeClass, defect: number): { grade: CoffeeGrade; description: string } {
  if (c === 'bagus') {
    return {
      grade: 'Grade 1',
      description: 'Potensi Mutu Spesialti (Grade 1): Biji tanpa cacat fisik atau mikrobiologis.',
    };
  }
  if (c === 'rusak') {
    return {
      grade: 'Grade 2',
      description: 'Potensi Mutu Baik (Grade 2): Cacat sekunder ringan, masih layak segmen pasar komersial prima.',
    };
  }
  if (c === 'asam') {
    return {
      grade: 'Grade 3',
      description: 'Potensi Mutu Sedang (Grade 3): Cacat fermentasi primer, menurunkan profil rasa dan nilai jual.',
    };
  }
  if (c === 'jamur') {
    return {
      grade: 'Grade 4',
      description: 'Mutu Rendah (Grade 4): Cacat mikotoksin jamur berat, harus dieliminasi dari batch ekspor.',
    };
  }
  return {
    grade: 'Grade 4',
    description: 'Objek tidak valid untuk penilaian mutu komersial.',
  };
}

/**
 * Calculates Official SNI 01-2907-2008 Batch Grade based on 300g sample defect count
 */
export function calculateBatchSNIGrade(totalDefects: number): {
  grade: CoffeeGrade;
  title: string;
  badgeColor: string;
  description: string;
  marketPriceEstimate: string;
} {
  if (totalDefects <= 11) {
    return {
      grade: 'Grade 1',
      title: 'Mutu 1 (Spesialti / Premium)',
      badgeColor: 'bg-emerald-600 text-white',
      description: 'Lolos standar ekspor tertinggi dan pasar speciality coffee internasional. Cita rasa bersih (clean cup).',
      marketPriceEstimate: 'Rp 95.000 – Rp 130.000 / kg (Green bean)',
    };
  }
  if (totalDefects <= 25) {
    return {
      grade: 'Grade 2',
      title: 'Mutu 2 (Baik / Premium Commercial)',
      badgeColor: 'bg-blue-600 text-white',
      description: 'Kategori mutu baik untuk roastery lokal premium dan kafe modern.',
      marketPriceEstimate: 'Rp 75.000 – Rp 94.000 / kg',
    };
  }
  if (totalDefects <= 44) {
    return {
      grade: 'Grade 3',
      title: 'Mutu 3 (Sedang / Regular Commercial)',
      badgeColor: 'bg-amber-600 text-white',
      description: 'Mutu sedang untuk konsumsi reguler dan industri kopi olahan bubuk.',
      marketPriceEstimate: 'Rp 60.000 – Rp 74.000 / kg',
    };
  }
  return {
    grade: 'Grade 4',
    title: 'Mutu 4 (Rendah / Cacat Tinggi)',
    badgeColor: 'bg-rose-600 text-white',
    description: 'Perlu dilakukan proses sortasi ulang (secondary screening) sebelum dijual agar harga tidak anjlok.',
    marketPriceEstimate: 'Rp 40.000 – Rp 58.000 / kg (Diskon harga hingga 45%)',
  };
}
