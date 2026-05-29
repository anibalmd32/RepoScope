import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => { clicked = true; }}>Click</Button>);
    await user.click(screen.getByText('Click'));
    expect(clicked).toBe(true);
  });

  it('renders all variants', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
    for (const variant of variants) {
      const { container } = render(<Button variant={variant}>{variant}</Button>);
      expect(container.firstChild).toBeInTheDocument();
    }
  });

  it('renders all sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const;
    for (const size of sizes) {
      const { container } = render(<Button size={size}>{size}</Button>);
      expect(container.firstChild).toBeInTheDocument();
    }
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="my-button">Custom</Button>);
    expect(screen.getByText('Custom').className).toContain('my-button');
  });
});
