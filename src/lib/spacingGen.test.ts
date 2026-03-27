import { describe, it, expect } from 'vitest';
import { generateSpacing } from './spacingGen';

describe('generateSpacing', () => {
  it('generates at least 16 steps', () => {
    const spacing = generateSpacing();
    expect(spacing.steps.length).toBeGreaterThanOrEqual(16);
  });

  it('first step is 0px', () => {
    const spacing = generateSpacing(4);
    expect(spacing.steps[0].px).toBe(0);
  });

  it('uses provided base unit', () => {
    const spacing = generateSpacing(8);
    expect(spacing.base).toBe(8);
    // Step with multiplier 1 should be 8px
    const step1 = spacing.steps.find((s) => s.multiplier === 1);
    expect(step1?.px).toBe(8);
  });

  it('values are in ascending order', () => {
    const spacing = generateSpacing(4);
    for (let i = 1; i < spacing.steps.length; i++) {
      expect(spacing.steps[i].px).toBeGreaterThanOrEqual(spacing.steps[i - 1].px);
    }
  });

  it('expresses values in rem', () => {
    const spacing = generateSpacing(4);
    for (const step of spacing.steps) {
      expect(step.rem).toMatch(/rem$/);
    }
  });
});
