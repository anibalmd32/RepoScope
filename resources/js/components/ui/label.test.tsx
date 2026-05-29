import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './label';

describe('Label', () => {
  it('renders with text', () => {
    render(<Label htmlFor="test">Email</Label>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('sets htmlFor attribute', () => {
    render(<Label htmlFor="email-input">Email</Label>);
    expect(screen.getByText('Email').getAttribute('for')).toBe('email-input');
  });

  it('applies custom className', () => {
    render(<Label className="custom-label">Label</Label>);
    expect(screen.getByText('Label').className).toContain('custom-label');
  });
});
