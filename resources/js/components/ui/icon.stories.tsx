import type { Meta, StoryObj } from '@storybook/react';
import { Home, Settings, User } from 'lucide-react';
import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const HomeIcon: Story = { args: { iconNode: Home, className: 'size-5' } };
export const SettingsIcon: Story = { args: { iconNode: Settings, className: 'size-5' } };
export const UserIcon: Story = { args: { iconNode: User, className: 'size-5' } };
export const NullIcon: Story = { args: { iconNode: null } };
