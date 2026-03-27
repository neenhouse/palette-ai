import type { SpacingSystem } from '../lib/spacingGen';

interface SpacingScaleProps {
  spacing: SpacingSystem;
  onNext: () => void;
}

export default function SpacingScale({ spacing, onNext }: SpacingScaleProps) {
  const maxPx = spacing.steps[spacing.steps.length - 1]?.px ?? 96;

  return (
    <div className="spacing-scale">
      <div className="step-header">
        <h2 className="gradient-text--pink">Spacing Scale</h2>
        <p>
          Base {spacing.base}px spacing system with {spacing.steps.length} steps. Every value is a
          multiple of the base unit.
        </p>
      </div>

      <div className="spacing-scale__list">
        {spacing.steps.map((step) => {
          const widthPct = maxPx > 0 ? (step.px / maxPx) * 100 : 0;
          return (
            <div key={step.name} className="spacing-step">
              <span className="spacing-step__name">{step.name}</span>
              <div className="spacing-step__bar-container">
                <div
                  className="spacing-step__bar"
                  style={{ width: `${Math.max(widthPct, 0.5)}%` }}
                />
              </div>
              <span className="spacing-step__value">
                {step.px}px / {step.rem}
              </span>
            </div>
          );
        })}
      </div>

      <div className="spacing-context">
        <h3>Semantic Tokens</h3>
        <div className="spacing-semantic">
          {[
            { token: '--space-page-margin', step: '16', desc: 'Page horizontal margin' },
            { token: '--space-section-gap', step: '12', desc: 'Gap between sections' },
            { token: '--space-card-padding', step: '6', desc: 'Card internal padding' },
            { token: '--space-input-padding', step: '3', desc: 'Input field padding' },
          ].map(({ token, step, desc }) => {
            const match = spacing.steps.find((s) => s.name === step);
            return (
              <div key={token} className="spacing-semantic__row">
                <code>{token}</code>
                <span>
                  {match ? `${match.px}px (${match.rem})` : '--'} &mdash; {desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <button className="btn btn--primary" onClick={onNext}>
        Next: Export
      </button>
    </div>
  );
}
