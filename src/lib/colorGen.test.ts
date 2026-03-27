import { describe, it, expect } from 'vitest';
import { generatePalette, contrastRatio, hslToHex } from './colorGen';

describe('generatePalette', () => {
  it('returns all 6 color tokens', () => {
    const palette = generatePalette('professional modern fintech');
    expect(palette.primary).toBeDefined();
    expect(palette.secondary).toBeDefined();
    expect(palette.accent).toBeDefined();
    expect(palette.background).toBeDefined();
    expect(palette.surface).toBeDefined();
    expect(palette.text).toBeDefined();
  });

  it('generates valid hex values', () => {
    const palette = generatePalette('bold creative startup');
    const hexRegex = /^#[0-9a-f]{6}$/;
    expect(palette.primary.hex).toMatch(hexRegex);
    expect(palette.secondary.hex).toMatch(hexRegex);
    expect(palette.accent.hex).toMatch(hexRegex);
    expect(palette.background.hex).toMatch(hexRegex);
    expect(palette.surface.hex).toMatch(hexRegex);
    expect(palette.text.hex).toMatch(hexRegex);
  });

  it('is deterministic for the same input', () => {
    const a = generatePalette('calm natural health');
    const b = generatePalette('calm natural health');
    expect(a.primary.hex).toBe(b.primary.hex);
    expect(a.accent.hex).toBe(b.accent.hex);
  });

  it('generates different palettes for different descriptions', () => {
    const a = generatePalette('bold energetic sport');
    const b = generatePalette('calm elegant luxurious');
    expect(a.primary.hex).not.toBe(b.primary.hex);
  });

  it('handles unknown keywords by hashing', () => {
    const palette = generatePalette('xyzzy foobar quux');
    expect(palette.primary.hex).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('contrastRatio', () => {
  it('returns 21:1 for black on white', () => {
    const ratio = contrastRatio('#ffffff', '#000000');
    expect(ratio).toBeCloseTo(21, 0);
  });

  it('returns 1:1 for identical colors', () => {
    const ratio = contrastRatio('#abcdef', '#abcdef');
    expect(ratio).toBeCloseTo(1, 1);
  });

  it('is symmetric', () => {
    const a = contrastRatio('#336699', '#ffffff');
    const b = contrastRatio('#ffffff', '#336699');
    expect(a).toBeCloseTo(b, 5);
  });
});

describe('hslToHex', () => {
  it('converts pure red correctly', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000');
  });

  it('converts black correctly', () => {
    expect(hslToHex(0, 0, 0)).toBe('#000000');
  });

  it('converts white correctly', () => {
    expect(hslToHex(0, 0, 100)).toBe('#ffffff');
  });
});
