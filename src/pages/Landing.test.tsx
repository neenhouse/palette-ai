import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Landing from './Landing';

function renderLanding() {
  return render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
}

describe('Landing page', () => {
  it('renders the page heading', () => {
    renderLanding();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the nav CTA button', () => {
    renderLanding();
    expect(screen.getAllByRole('button', { name: /get started/i }).length).toBeGreaterThan(0);
  });

  it('renders the Features section', () => {
    renderLanding();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Color Palette')).toBeInTheDocument();
    expect(screen.getByText('Typography')).toBeInTheDocument();
    expect(screen.getByText('Spacing System')).toBeInTheDocument();
    expect(screen.getByText('CSS Export')).toBeInTheDocument();
  });

  it('renders the How it works section', () => {
    renderLanding();
    expect(screen.getByText('How it works')).toBeInTheDocument();
    expect(screen.getByText('Describe')).toBeInTheDocument();
    expect(screen.getByText('Generate')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    renderLanding();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
