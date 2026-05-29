import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

describe('Avatar', () => {
  it('renders fallback text', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Avatar className="size-12">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    const avatar = screen.getByText('AB').parentElement;
    expect(avatar).toBeInTheDocument();
  });
});
