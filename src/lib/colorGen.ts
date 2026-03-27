/**
 * Algorithmic color palette generation using HSL color space.
 * Maps mood keywords to seed hues and derives a full 6-color palette.
 */

export interface ColorToken {
  name: string;
  hex: string;
  hsl: { h: number; s: number; l: number };
}

export interface Palette {
  primary: ColorToken;
  secondary: ColorToken;
  accent: ColorToken;
  background: ColorToken;
  surface: ColorToken;
  text: ColorToken;
}

// Mood keyword -> hue mapping (0-360)
const MOOD_HUES: Record<string, number> = {
  professional: 220,
  trustworthy: 210,
  modern: 200,
  fintech: 215,
  bold: 350,
  creative: 280,
  playful: 45,
  serious: 230,
  luxurious: 310,
  minimal: 180,
  warm: 25,
  cool: 200,
  energetic: 15,
  calm: 170,
  natural: 140,
  tech: 195,
  elegant: 290,
  friendly: 35,
  corporate: 220,
  startup: 260,
  health: 150,
  education: 225,
  food: 30,
  travel: 190,
  music: 300,
  sport: 5,
  fashion: 330,
  eco: 130,
  finance: 215,
  security: 220,
  innovation: 270,
  retro: 40,
  futuristic: 250,
  dark: 240,
  light: 50,
  vibrant: 0,
  muted: 200,
  romantic: 340,
  industrial: 30,
};

function extractSeedHue(description: string): number {
  const words = description.toLowerCase().split(/[\s,;.]+/);
  const matchedHues: number[] = [];

  for (const word of words) {
    if (MOOD_HUES[word] !== undefined) {
      matchedHues.push(MOOD_HUES[word]);
    }
  }

  if (matchedHues.length === 0) {
    // Hash the description to get a deterministic hue
    let hash = 0;
    for (let i = 0; i < description.length; i++) {
      hash = description.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
  }

  // Average matched hues using circular mean
  let sinSum = 0;
  let cosSum = 0;
  for (const h of matchedHues) {
    const rad = (h * Math.PI) / 180;
    sinSum += Math.sin(rad);
    cosSum += Math.cos(rad);
  }
  const avgRad = Math.atan2(sinSum / matchedHues.length, cosSum / matchedHues.length);
  return ((avgRad * 180) / Math.PI + 360) % 360;
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  const toHex = (v: number) => {
    const hex = Math.round((v + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function makeToken(name: string, h: number, s: number, l: number): ColorToken {
  return {
    name,
    hex: hslToHex(h, s, l),
    hsl: { h: Math.round(h), s: Math.round(s), l: Math.round(l) },
  };
}

/**
 * Calculate relative luminance for contrast ratio
 */
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  const linearize = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function generatePalette(description: string): Palette {
  const seedHue = extractSeedHue(description);

  // Primary: seed hue, high saturation, medium lightness
  const primary = makeToken('primary', seedHue, 72, 48);

  // Secondary: analogous (30 degrees offset), slightly less saturated
  const secondary = makeToken('secondary', (seedHue + 30) % 360, 55, 52);

  // Accent: complementary-adjacent (150 degrees offset), vivid
  const accent = makeToken('accent', (seedHue + 150) % 360, 80, 55);

  // Background: very dark, desaturated tint of primary
  const background = makeToken('background', seedHue, 15, 8);

  // Surface: slightly lighter than background
  const surface = makeToken('surface', seedHue, 12, 14);

  // Text: very light, slight tint of primary
  const text = makeToken('text', seedHue, 10, 90);

  return { primary, secondary, accent, background, surface, text };
}

export { extractSeedHue, hslToHex };
