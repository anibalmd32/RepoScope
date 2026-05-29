import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders with role status and aria-label', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toBeInTheDocument();
    expect(spinner?.getAttribute('aria-label')).toBe('Loading');
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="size-8 text-primary" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.getAttribute('class')).toContain('size-8');
  });
});
