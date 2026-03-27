/**
 * Spacing scale generator.
 * Produces a base-4 spacing system with visual preview data.
 */

export interface SpacingStep {
  name: string;
  px: number;
  rem: string;
  multiplier: number;
}

export interface SpacingSystem {
  base: number;
  steps: SpacingStep[];
}

const MULTIPLIERS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24];

const STEP_NAMES: Record<number, string> = {
  0: '0',
  0.5: '0.5',
  1: '1',
  1.5: '1.5',
  2: '2',
  2.5: '2.5',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  8: '8',
  10: '10',
  12: '12',
  14: '14',
  16: '16',
  20: '20',
  24: '24',
};

export function generateSpacing(base: number = 4): SpacingSystem {
  const steps: SpacingStep[] = MULTIPLIERS.map((mult) => {
    const px = base * mult;
    const rem = (px / 16).toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
    return {
      name: STEP_NAMES[mult] ?? String(mult),
      px,
      rem: `${rem}rem`,
      multiplier: mult,
    };
  });

  return { base, steps };
}
