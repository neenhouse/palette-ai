import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppPage from './AppPage';

function renderAppPage() {
  return render(
    <MemoryRouter>
      <AppPage />
    </MemoryRouter>
  );
}

describe('AppPage', () => {
  it('renders the PaletteAI logo button', () => {
    renderAppPage();
    expect(screen.getByRole('button', { name: /paletteai/i })).toBeInTheDocument();
  });

  it('renders the BrandInput step by default', () => {
    renderAppPage();
    expect(screen.getByLabelText('Brand description')).toBeInTheDocument();
    expect(screen.getByText('Generate Design System')).toBeInTheDocument();
  });

  it('does not render wizard nav on step 0', () => {
    renderAppPage();
    expect(screen.queryByRole('navigation', { name: /wizard steps/i })).not.toBeInTheDocument();
  });
});
