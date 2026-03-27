/**
 * CSS custom properties export generator.
 * Combines palette, typography, and spacing into a single CSS output.
 */

import type { Palette } from './colorGen';
import type { TypographySystem } from './typographyGen';
import type { SpacingSystem } from './spacingGen';

export function generateCSS(
  palette: Palette,
  typography: TypographySystem,
  spacing: SpacingSystem,
): string {
  const lines: string[] = [];
  lines.push(':root {');
  lines.push('  /* Colors */');

  const colors = [
    palette.primary,
    palette.secondary,
    palette.accent,
    palette.background,
    palette.surface,
    palette.text,
  ];

  for (const color of colors) {
    lines.push(`  --color-${color.name}: ${color.hex};`);
    lines.push(
      `  --color-${color.name}-hsl: ${color.hsl.h} ${color.hsl.s}% ${color.hsl.l}%;`,
    );
  }

  lines.push('');
  lines.push('  /* Typography */');
  lines.push(`  --font-heading: '${typography.headingFont}', system-ui, sans-serif;`);
  lines.push(`  --font-body: '${typography.bodyFont}', system-ui, sans-serif;`);
  lines.push(`  --font-size-base: ${typography.baseSize}px;`);
  lines.push(`  --type-ratio: ${typography.ratio};`);

  for (const step of typography.scale) {
    lines.push(`  --text-${step.name}: ${step.sizeRem};`);
    lines.push(`  --leading-${step.name}: ${step.lineHeight};`);
    lines.push(`  --tracking-${step.name}: ${step.letterSpacing};`);
  }

  lines.push('');
  lines.push('  /* Spacing */');
  lines.push(`  --space-base: ${spacing.base}px;`);

  for (const step of spacing.steps) {
    lines.push(`  --space-${step.name}: ${step.rem};`);
  }

  lines.push('}');

  return lines.join('\n');
}
