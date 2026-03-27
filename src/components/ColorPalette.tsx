import { useState } from 'react';
import type { Palette, ColorToken } from '../lib/colorGen';
import { contrastRatio } from '../lib/colorGen';

interface ColorPaletteProps {
  palette: Palette;
  onNext: () => void;
}

function Swatch({ color, bgHex }: { color: ColorToken; bgHex: string }) {
  const [copied, setCopied] = useState(false);
  const ratio = contrastRatio(color.hex, bgHex);
  const passes = ratio >= 4.5;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      className="swatch"
      onClick={handleCopy}
      title={`Click to copy ${color.hex}`}
      aria-label={`${color.name}: ${color.hex}. Click to copy.`}
    >
      <div className="swatch__preview" style={{ backgroundColor: color.hex }}>
        <span className="swatch__label" style={{ color: color.hsl.l > 50 ? '#111' : '#fff' }}>
          Aa
        </span>
      </div>
      <div className="swatch__info">
        <span className="swatch__name">{color.name}</span>
        <span className="swatch__hex">{copied ? 'Copied!' : color.hex}</span>
        <span className="swatch__hsl">
          hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)
        </span>
        <span className={`swatch__contrast ${passes ? 'swatch__contrast--pass' : 'swatch__contrast--fail'}`}>
          {ratio.toFixed(1)}:1 {passes ? 'AA' : 'Fail'}
        </span>
      </div>
    </button>
  );
}

export default function ColorPalette({ palette, onNext }: ColorPaletteProps) {
  const colors = [
    palette.primary,
    palette.secondary,
    palette.accent,
    palette.background,
    palette.surface,
    palette.text,
  ];

  return (
    <div className="color-palette">
      <div className="step-header">
        <h2>Color Palette</h2>
        <p>6 harmonious colors derived from your brand description. Click any swatch to copy its hex value.</p>
      </div>

      <div className="color-palette__grid">
        {colors.map((color) => (
          <Swatch key={color.name} color={color} bgHex={palette.background.hex} />
        ))}
      </div>

      <div className="step-header" style={{ marginTop: '2rem' }}>
        <h3>Contrast Ratios</h3>
        <p>Key foreground/background pairings checked against WCAG AA (4.5:1 minimum).</p>
      </div>
      <div className="contrast-table">
        <div className="contrast-row contrast-row--header">
          <span>Pair</span>
          <span>Ratio</span>
          <span>Result</span>
        </div>
        {[
          { fg: palette.text, bg: palette.background, label: 'Text on Background' },
          { fg: palette.text, bg: palette.surface, label: 'Text on Surface' },
          { fg: palette.primary, bg: palette.background, label: 'Primary on Background' },
          { fg: palette.accent, bg: palette.background, label: 'Accent on Background' },
        ].map(({ fg, bg, label }) => {
          const ratio = contrastRatio(fg.hex, bg.hex);
          const passes = ratio >= 4.5;
          return (
            <div key={label} className="contrast-row">
              <span className="contrast-row__label">
                <span className="contrast-dot" style={{ backgroundColor: fg.hex }} />
                <span className="contrast-dot" style={{ backgroundColor: bg.hex }} />
                {label}
              </span>
              <span>{ratio.toFixed(2)}:1</span>
              <span className={passes ? 'pass' : 'fail'}>{passes ? 'PASS' : 'FAIL'}</span>
            </div>
          );
        })}
      </div>

      <button className="btn btn--primary" onClick={onNext}>
        Next: Typography
      </button>
    </div>
  );
}
