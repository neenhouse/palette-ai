import { describe, it, expect } from 'vitest';
import { generateTypography, getGoogleFontsUrl } from './typographyGen';

describe('generateTypography', () => {
  it('returns heading and body fonts', () => {
    const typo = generateTypography('professional corporate');
    expect(typo.headingFont).toBeTruthy();
    expect(typo.bodyFont).toBeTruthy();
  });

  it('generates 8 scale steps', () => {
    const typo = generateTypography('modern startup');
    expect(typo.scale).toHaveLength(8);
  });

  it('scale steps are in descending size order', () => {
    const typo = generateTypography('minimal tech');
    const sizes = typo.scale.map((s) => s.sizePx);
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeLessThanOrEqual(sizes[i - 1]);
    }
  });

  it('picks Montserrat for professional/corporate', () => {
    const typo = generateTypography('professional corporate trustworthy');
    expect(typo.headingFont).toBe('Montserrat');
  });

  it('picks Playfair Display for luxurious/elegant', () => {
    const typo = generateTypography('luxurious elegant');
    expect(typo.headingFont).toBe('Playfair Display');
  });
});

describe('getGoogleFontsUrl', () => {
  it('returns a valid URL', () => {
    const url = getGoogleFontsUrl('Inter', 'Inter');
    expect(url).toContain('fonts.googleapis.com');
    expect(url).toContain('Inter');
  });

  it('includes both fonts when different', () => {
    const url = getGoogleFontsUrl('Montserrat', 'Open Sans');
    expect(url).toContain('Montserrat');
    expect(url).toContain('Open+Sans');
  });
});
