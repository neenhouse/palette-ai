import { useState, useCallback } from 'react';
import { generatePalette, type Palette } from '../lib/colorGen';
import { generateTypography, type TypographySystem } from '../lib/typographyGen';
import { generateSpacing, type SpacingSystem } from '../lib/spacingGen';

export interface DesignSystemState {
  description: string;
  palette: Palette | null;
  typography: TypographySystem | null;
  spacing: SpacingSystem | null;
  step: number; // 0=input, 1=colors, 2=typography, 3=spacing, 4=export
}

export function useDesignSystem() {
  const [state, setState] = useState<DesignSystemState>(() => {
    const saved = localStorage.getItem('palette-ai-description');
    return {
      description: saved ?? '',
      palette: null,
      typography: null,
      spacing: null,
      step: 0,
    };
  });

  const generate = useCallback((description: string) => {
    localStorage.setItem('palette-ai-description', description);
    const palette = generatePalette(description);
    const typography = generateTypography(description);
    const spacing = generateSpacing(4);
    setState({
      description,
      palette,
      typography,
      spacing,
      step: 1,
    });
  }, []);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const reset = useCallback(() => {
    setState({
      description: '',
      palette: null,
      typography: null,
      spacing: null,
      step: 0,
    });
    localStorage.removeItem('palette-ai-description');
  }, []);

  return { ...state, generate, setStep, reset };
}
