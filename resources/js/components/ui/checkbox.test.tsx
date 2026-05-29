import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('can be checked', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox.getAttribute('data-state')).toBe('checked');
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-checkbox" />);
    expect(screen.getByRole('checkbox').className).toContain('custom-checkbox');
  });
});
