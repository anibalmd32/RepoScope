import type { Meta, StoryObj } from '@storybook/react';
import { Bold, Italic } from 'lucide-react';
import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: { children: <Bold className="size-4" />, 'aria-label': 'Toggle bold' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: <Italic className="size-4" />, 'aria-label': 'Toggle italic' },
};

export const WithText: Story = {
  args: { variant: 'outline', children: 'Toggle', 'aria-label': 'Toggle' },
};
