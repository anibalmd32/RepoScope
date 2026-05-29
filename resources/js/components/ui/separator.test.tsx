import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Separator } from './separator';

describe('Separator', () => {
  it('renders horizontal separator', () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders vertical separator', () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Separator className="my-separator" />);
    expect((container.firstChild as HTMLElement)?.className).toContain('my-separator');
  });
});
