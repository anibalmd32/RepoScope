import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from 'lucide-react';
import { Icon } from './icon';

describe('Icon', () => {
  it('renders valid icon', () => {
    render(<Icon iconNode={Home} className="size-5" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders nothing for null icon', () => {
    const { container } = render(<Icon iconNode={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies className to icon', () => {
    render(<Icon iconNode={Home} className="text-primary" />);
    const svg = document.querySelector('svg');
    expect(svg?.className.baseVal || svg?.getAttribute('class')).toContain('text-primary');
  });
});
