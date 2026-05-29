import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderPattern } from './placeholder-pattern';

const meta: Meta<typeof PlaceholderPattern> = {
  title: 'UI/PlaceholderPattern',
  component: PlaceholderPattern,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PlaceholderPattern>;

export const Default: Story = {
  render: () => (
    <div className="h-40 w-64 overflow-hidden rounded-lg border">
      <PlaceholderPattern className="h-full w-full" />
    </div>
  ),
};
