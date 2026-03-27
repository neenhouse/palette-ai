import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    title: 'Color Palette',
    desc: 'AI-derived 6-color palette with contrast ratios and WCAG compliance checks.',
    icon: '\u{1F3A8}',
  },
  {
    title: 'Typography',
    desc: 'Google Fonts pairings and a modular type scale matched to your brand mood.',
    icon: '\u{1F524}',
  },
  {
    title: 'Spacing System',
    desc: 'Base-4 spacing scale with semantic tokens ready for production.',
    icon: '\u{1F4CF}',
  },
  {
    title: 'CSS Export',
    desc: 'One-click export of your entire token system as CSS custom properties.',
    icon: '\u{1F4E6}',
  },
];

const STEPS = [
  { num: '1', title: 'Describe', desc: 'Tell us about your brand personality and mood.' },
  { num: '2', title: 'Generate', desc: 'We create colors, typography, and spacing instantly.' },
  { num: '3', title: 'Export', desc: 'Copy CSS custom properties straight into your project.' },
];

const PREVIEW_COLORS = ['#06b6d4', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#eab308'];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav className="landing__nav">
        <span className="landing__logo">PaletteAI</span>
        <button
          className="btn btn--primary landing__nav-cta"
          onClick={() => navigate('/app')}
        >
          Get Started
        </button>
      </nav>

      <section className="landing__hero">
        <span className="landing__badge">AI-Powered Design Tokens</span>
        <h1 className="landing__title">
          Describe your brand.
          <br />
          <span className="landing__title--gradient">Get a design system.</span>
        </h1>
        <p className="landing__subtitle">
          PaletteAI turns a plain-language brand description into production-ready design
          tokens &mdash; colors, typography, spacing &mdash; in seconds.
        </p>
        <div className="landing__hero-actions">
          <button className="btn btn--primary btn--large" onClick={() => navigate('/app')}>
            Describe Your Brand
          </button>
          <button className="btn btn--secondary btn--large" onClick={() => {
            document.querySelector('.landing__features')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            See How It Works
          </button>
        </div>
        <div className="landing__palette-preview" aria-hidden="true">
          {PREVIEW_COLORS.map((color) => (
            <div
              key={color}
              className="palette-preview__swatch"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </section>

      <section className="landing__features">
        <p className="landing__section-label">Features</p>
        <h2 className="landing__section-title">Everything you need for a design system</h2>
        <div className="landing__features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-card__icon">{f.icon}</span>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing__how">
        <p className="landing__section-label">How it works</p>
        <h2 className="landing__section-title">Three steps to your design system</h2>
        <div className="landing__steps">
          {STEPS.map((s) => (
            <div key={s.num} className="how-step">
              <span className="how-step__num">{s.num}</span>
              <h3 className="how-step__title">{s.title}</h3>
              <p className="how-step__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing__cta">
        <h2>Ready to build your design system?</h2>
        <p>No sign-up required. Start generating in seconds.</p>
        <button className="btn btn--primary btn--large" onClick={() => navigate('/app')}>
          Get Started Free
        </button>
      </section>

      <footer className="landing__footer">
        <p>PaletteAI &mdash; Built with React, TypeScript, and algorithmic color theory.</p>
      </footer>
    </div>
  );
}
