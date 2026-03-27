import { useNavigate } from 'react-router-dom';
import { useDesignSystem } from '../hooks/useDesignSystem';
import BrandInput from '../components/BrandInput';
import ColorPalette from '../components/ColorPalette';
import TypographySystem from '../components/TypographySystem';
import SpacingScale from '../components/SpacingScale';
import TokenExport from '../components/TokenExport';

const STEP_LABELS = ['Input', 'Colors', 'Typography', 'Spacing', 'Export'];

export default function AppPage() {
  const navigate = useNavigate();
  const { description, palette, typography, spacing, step, generate, setStep, reset } =
    useDesignSystem();

  const handleReset = () => {
    reset();
    navigate('/');
  };

  return (
    <div className="app-page">
      <header className="app-header">
        <button className="app-header__logo" onClick={() => navigate('/')}>
          PaletteAI
        </button>
        {step > 0 && (
          <nav className="wizard-nav" aria-label="Wizard steps">
            {STEP_LABELS.map((label, i) => (
              <button
                key={label}
                className={`wizard-nav__step ${i === step ? 'wizard-nav__step--active' : ''} ${i < step ? 'wizard-nav__step--done' : ''}`}
                onClick={() => {
                  if (i === 0) {
                    setStep(0);
                  } else if (i <= step) {
                    setStep(i);
                  }
                }}
                disabled={i > step}
                aria-current={i === step ? 'step' : undefined}
              >
                <span className="wizard-nav__num">{i + 1}</span>
                <span className="wizard-nav__label">{label}</span>
              </button>
            ))}
          </nav>
        )}
      </header>

      <main className="app-main">
        {step === 0 && <BrandInput initialValue={description} onGenerate={generate} />}
        {step === 1 && palette && (
          <ColorPalette palette={palette} onNext={() => setStep(2)} />
        )}
        {step === 2 && typography && (
          <TypographySystem typography={typography} onNext={() => setStep(3)} />
        )}
        {step === 3 && spacing && (
          <SpacingScale spacing={spacing} onNext={() => setStep(4)} />
        )}
        {step === 4 && palette && typography && spacing && (
          <TokenExport
            palette={palette}
            typography={typography}
            spacing={spacing}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
