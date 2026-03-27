import { useEffect } from 'react';
import type { TypographySystem as TypographySystemType } from '../lib/typographyGen';
import { getGoogleFontsUrl } from '../lib/typographyGen';

interface TypographySystemProps {
  typography: TypographySystemType;
  onNext: () => void;
}

export default function TypographySystem({ typography, onNext }: TypographySystemProps) {
  // Load Google Fonts dynamically
  useEffect(() => {
    const url = getGoogleFontsUrl(typography.headingFont, typography.bodyFont);
    const existing = document.querySelector(`link[href="${url}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
  }, [typography.headingFont, typography.bodyFont]);

  return (
    <div className="typography-system">
      <div className="step-header">
        <h2 className="gradient-text--violet">Typography System</h2>
        <p>
          Font pairing and modular type scale (ratio: {typography.ratio}) based on your brand mood.
        </p>
      </div>

      <div className="type-fonts">
        <div className="type-font-card">
          <span className="type-font-card__label">Heading Font</span>
          <span
            className="type-font-card__name"
            style={{ fontFamily: `'${typography.headingFont}', sans-serif` }}
          >
            {typography.headingFont}
          </span>
          <span
            className="type-font-card__sample"
            style={{ fontFamily: `'${typography.headingFont}', sans-serif`, fontWeight: 700 }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
        <div className="type-font-card">
          <span className="type-font-card__label">Body Font</span>
          <span
            className="type-font-card__name"
            style={{ fontFamily: `'${typography.bodyFont}', sans-serif` }}
          >
            {typography.bodyFont}
          </span>
          <span
            className="type-font-card__sample"
            style={{ fontFamily: `'${typography.bodyFont}', sans-serif` }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
      </div>

      <div className="type-scale">
        <div className="type-scale__header">
          <span>Name</span>
          <span>Size</span>
          <span>Weight</span>
          <span>Preview</span>
        </div>
        {typography.scale.map((step) => {
          const isHeading = step.name.startsWith('h');
          const fontFamily = isHeading
            ? `'${typography.headingFont}', sans-serif`
            : `'${typography.bodyFont}', sans-serif`;

          return (
            <div key={step.name} className="type-scale__row">
              <span className="type-scale__name">{step.name}</span>
              <span className="type-scale__size">
                {step.sizePx}px / {step.sizeRem}
              </span>
              <span className="type-scale__weight">{step.weight}</span>
              <span
                className="type-scale__preview"
                style={{
                  fontFamily,
                  fontSize: `${Math.min(step.sizePx, 48)}px`,
                  fontWeight: step.weight,
                  lineHeight: step.lineHeight,
                  letterSpacing: step.letterSpacing,
                }}
              >
                Design System
              </span>
            </div>
          );
        })}
      </div>

      <button className="btn btn--primary" onClick={onNext}>
        Next: Spacing
      </button>
    </div>
  );
}
