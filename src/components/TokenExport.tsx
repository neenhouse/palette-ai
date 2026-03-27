import { useState, useMemo } from 'react';
import type { Palette } from '../lib/colorGen';
import type { TypographySystem } from '../lib/typographyGen';
import type { SpacingSystem } from '../lib/spacingGen';
import { generateCSS } from '../lib/exportGen';

interface TokenExportProps {
  palette: Palette;
  typography: TypographySystem;
  spacing: SpacingSystem;
  onReset: () => void;
}

export default function TokenExport({ palette, typography, spacing, onReset }: TokenExportProps) {
  const [copied, setCopied] = useState(false);
  const css = useMemo(() => generateCSS(palette, typography, spacing), [palette, typography, spacing]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-tokens.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="token-export">
      <div className="step-header">
        <h2>Export Design Tokens</h2>
        <p>Your complete design system as CSS custom properties. Copy to clipboard or download as a file.</p>
      </div>

      <div className="token-export__actions">
        <button className="btn btn--primary" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button className="btn btn--secondary" onClick={handleDownload}>
          Download .css
        </button>
      </div>

      <div className="token-export__preview">
        <div className="token-export__preview-header">
          <span>design-tokens.css</span>
        </div>
        <pre className="token-export__code">
          <code>{css}</code>
        </pre>
      </div>

      <button className="btn btn--outline" onClick={onReset} style={{ marginTop: '1.5rem' }}>
        Start Over
      </button>
    </div>
  );
}
