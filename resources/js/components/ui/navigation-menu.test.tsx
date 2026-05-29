import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger } from './navigation-menu';

describe('NavigationMenu', () => {
  it('renders navigation items', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
