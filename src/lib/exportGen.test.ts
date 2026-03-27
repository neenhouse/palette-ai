import { describe, it, expect } from 'vitest';
import { generateCSS } from './exportGen';
import { generatePalette } from './colorGen';
import { generateTypography } from './typographyGen';
import { generateSpacing } from './spacingGen';

describe('generateCSS', () => {
  const palette = generatePalette('modern tech');
  const typography = generateTypography('modern tech');
  const spacing = generateSpacing(4);

  it('starts with :root selector', () => {
    const css = generateCSS(palette, typography, spacing);
    expect(css).toMatch(/^:root \{/);
  });

  it('contains color tokens', () => {
    const css = generateCSS(palette, typography, spacing);
    expect(css).toContain('--color-primary:');
    expect(css).toContain('--color-secondary:');
    expect(css).toContain('--color-accent:');
    expect(css).toContain('--color-background:');
    expect(css).toContain('--color-surface:');
    expect(css).toContain('--color-text:');
  });

  it('contains typography tokens', () => {
    const css = generateCSS(palette, typography, spacing);
    expect(css).toContain('--font-heading:');
    expect(css).toContain('--font-body:');
    expect(css).toContain('--text-h1:');
    expect(css).toContain('--text-body:');
  });

  it('contains spacing tokens', () => {
    const css = generateCSS(palette, typography, spacing);
    expect(css).toContain('--space-base:');
    expect(css).toContain('--space-0:');
  });

  it('ends with closing brace', () => {
    const css = generateCSS(palette, typography, spacing);
    expect(css.trim()).toMatch(/\}$/);
  });
});
