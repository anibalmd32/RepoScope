import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders a skeleton element', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-10 w-20" />);
    expect((container.firstChild as HTMLElement).className).toContain('h-10');
    expect((container.firstChild as HTMLElement).className).toContain('w-20');
  });
});
