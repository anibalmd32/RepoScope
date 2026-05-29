import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';
import { Button } from './button';

const meta: Meta<typeof Collapsible> = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-87.5">
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
        This content can be toggled open and closed.
      </CollapsibleContent>
    </Collapsible>
  ),
};
