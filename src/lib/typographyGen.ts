/**
 * Typography system generator.
 * Maps mood keywords to Google Font pairings and generates a modular type scale.
 */

export interface TypeStep {
  name: string;
  sizePx: number;
  sizeRem: string;
  lineHeight: string;
  letterSpacing: string;
  weight: number;
}

export interface TypographySystem {
  headingFont: string;
  bodyFont: string;
  scale: TypeStep[];
  baseSize: number;
  ratio: number;
}

interface FontPairing {
  heading: string;
  body: string;
  moods: string[];
}

const FONT_PAIRINGS: FontPairing[] = [
  { heading: 'Inter', body: 'Inter', moods: ['modern', 'minimal', 'tech', 'startup', 'clean'] },
  { heading: 'Playfair Display', body: 'Source Sans 3', moods: ['luxurious', 'elegant', 'fashion', 'romantic'] },
  { heading: 'Montserrat', body: 'Open Sans', moods: ['professional', 'corporate', 'trustworthy', 'finance'] },
  { heading: 'Poppins', body: 'Nunito', moods: ['friendly', 'playful', 'warm', 'education'] },
  { heading: 'Space Grotesk', body: 'DM Sans', moods: ['futuristic', 'innovation', 'bold', 'creative'] },
  { heading: 'Merriweather', body: 'Lato', moods: ['serious', 'calm', 'natural', 'health'] },
  { heading: 'Raleway', body: 'Roboto', moods: ['energetic', 'sport', 'vibrant'] },
  { heading: 'Libre Baskerville', body: 'Source Sans 3', moods: ['retro', 'industrial', 'dark'] },
  { heading: 'Outfit', body: 'Work Sans', moods: ['fintech', 'security', 'cool'] },
];

const DEFAULT_PAIRING: FontPairing = { heading: 'Inter', body: 'Inter', moods: [] };

function pickFontPairing(description: string): FontPairing {
  const words = description.toLowerCase().split(/[\s,;.]+/);
  let bestMatch = DEFAULT_PAIRING;
  let bestScore = 0;

  for (const pairing of FONT_PAIRINGS) {
    let score = 0;
    for (const word of words) {
      if (pairing.moods.includes(word)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pairing;
    }
  }

  return bestMatch;
}

const SCALE_STEPS: { name: string; exponent: number; weight: number }[] = [
  { name: 'h1', exponent: 5, weight: 700 },
  { name: 'h2', exponent: 4, weight: 700 },
  { name: 'h3', exponent: 3, weight: 600 },
  { name: 'h4', exponent: 2, weight: 600 },
  { name: 'h5', exponent: 1.5, weight: 600 },
  { name: 'h6', exponent: 1, weight: 600 },
  { name: 'body', exponent: 0, weight: 400 },
  { name: 'small', exponent: -1, weight: 400 },
];

export function generateTypography(description: string): TypographySystem {
  const pairing = pickFontPairing(description);
  const baseSize = 16;
  const ratio = 1.25; // Major third

  const scale: TypeStep[] = SCALE_STEPS.map(({ name, exponent, weight }) => {
    const sizePx = Math.round(baseSize * Math.pow(ratio, exponent));
    const sizeRem = (sizePx / 16).toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
    const lineHeight = exponent >= 3 ? '1.2' : exponent >= 1 ? '1.3' : '1.6';
    const letterSpacing = exponent >= 3 ? '-0.02em' : exponent >= 1 ? '-0.01em' : '0em';

    return { name, sizePx, sizeRem: `${sizeRem}rem`, lineHeight, letterSpacing, weight };
  });

  return {
    headingFont: pairing.heading,
    bodyFont: pairing.body,
    scale,
    baseSize,
    ratio,
  };
}

export function getGoogleFontsUrl(headingFont: string, bodyFont: string): string {
  const fonts = new Set([headingFont, bodyFont]);
  const families = Array.from(fonts)
    .map((f) => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
