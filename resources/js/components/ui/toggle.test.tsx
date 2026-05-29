import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Bold } from 'lucide-react';
import { Toggle } from './toggle';

describe('Toggle', () => {
  it('renders a toggle button', () => {
    render(<Toggle aria-label="Bold"><Bold className="size-4" /></Toggle>);
    expect(screen.getByLabelText('Bold')).toBeInTheDocument();
  });

  it('can be pressed', async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Toggle">Toggle</Toggle>);
    const button = screen.getByLabelText('Toggle');
    await user.click(button);
    expect(button.getAttribute('data-state')).toBe('on');
  });

  it('renders outline variant', () => {
    render(<Toggle variant="outline" aria-label="Toggle">Toggle</Toggle>);
    expect(screen.getByText('Toggle')).toBeInTheDocument();
  });

  it('renders small size', () => {
    render(<Toggle size="sm" aria-label="Toggle">Toggle</Toggle>);
    expect(screen.getByText('Toggle')).toBeInTheDocument();
  });
});
