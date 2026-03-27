import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrandInput from './BrandInput';

describe('BrandInput', () => {
  it('renders the textarea and generate button', () => {
    render(<BrandInput initialValue="" onGenerate={() => {}} />);
    expect(screen.getByLabelText('Brand description')).toBeInTheDocument();
    expect(screen.getByText('Generate Design System')).toBeInTheDocument();
  });

  it('shows error when submitting empty input', async () => {
    const user = userEvent.setup();
    render(<BrandInput initialValue="" onGenerate={() => {}} />);
    await user.click(screen.getByText('Generate Design System'));
    expect(screen.getByRole('alert')).toHaveTextContent('Please describe your brand');
  });

  it('calls onGenerate with trimmed value', async () => {
    const user = userEvent.setup();
    const onGenerate = vi.fn();
    render(<BrandInput initialValue="" onGenerate={onGenerate} />);
    const textarea = screen.getByLabelText('Brand description');
    await user.type(textarea, 'bold modern startup');
    await user.click(screen.getByText('Generate Design System'));
    expect(onGenerate).toHaveBeenCalledWith('bold modern startup');
  });

  it('shows character count', async () => {
    const user = userEvent.setup();
    render(<BrandInput initialValue="" onGenerate={() => {}} />);
    const textarea = screen.getByLabelText('Brand description');
    await user.type(textarea, 'test');
    expect(screen.getByText('4/500')).toBeInTheDocument();
  });
});
