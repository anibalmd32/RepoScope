import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PlaceholderPattern } from './placeholder-pattern';

describe('PlaceholderPattern', () => {
  it('renders an SVG element', () => {
    const { container } = render(<PlaceholderPattern />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<PlaceholderPattern className="custom-pattern" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('custom-pattern');
  });
});
