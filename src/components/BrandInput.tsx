import { useState, useEffect, type KeyboardEvent } from 'react';

interface BrandInputProps {
  initialValue: string;
  onGenerate: (description: string) => void;
}

const PLACEHOLDER = 'e.g. "Professional, trustworthy, modern fintech" or "Bold creative agency with playful energy"';
const MAX_CHARS = 500;

export default function BrandInput({ initialValue, onGenerate }: BrandInputProps) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleGenerate = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Please describe your brand before generating.');
      return;
    }
    setError('');
    onGenerate(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="brand-input">
      <div className="brand-input__header">
        <h2>Describe Your Brand</h2>
        <p className="brand-input__subtitle">
          Tell us about your brand's personality, mood, and industry. We'll generate a complete
          design system tailored to your description.
        </p>
      </div>

      <div className="brand-input__field">
        <textarea
          className="brand-input__textarea"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.slice(0, MAX_CHARS));
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER}
          rows={4}
          maxLength={MAX_CHARS}
          aria-label="Brand description"
          aria-describedby={error ? 'brand-input-error' : undefined}
        />
        <div className="brand-input__meta">
          {error && (
            <span id="brand-input-error" className="brand-input__error" role="alert">
              {error}
            </span>
          )}
          <span className="brand-input__counter">
            {value.length}/{MAX_CHARS}
          </span>
        </div>
      </div>

      <button className="btn btn--primary" onClick={handleGenerate}>
        Generate Design System
      </button>
      <span className="brand-input__hint">
        or press <kbd>⌘</kbd> <kbd>Enter</kbd>
      </span>
    </div>
  );
}
