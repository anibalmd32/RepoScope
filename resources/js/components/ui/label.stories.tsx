import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Input } from './input';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="name" {...args}>Name</Label>
      <Input id="name" placeholder="Your name" />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="disabled" className="peer-disabled:opacity-50" {...args}>Disabled Label</Label>
      <Input id="disabled" disabled placeholder="Disabled field" />
    </div>
  ),
};
