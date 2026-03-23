import type { Meta, StoryObj } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    value: false,
    label: 'Checkbox label',
    description: 'Optional description text',
    variant: 'default',
    disabled: false,
    readOnly: false,
    hasError: false,
    required: false,
    rounded: false,
  },
  argTypes: {
    value: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['default', 'add'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    hasError: { control: 'boolean' },
    required: { control: 'boolean' },
    rounded: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { value: true },
};

export const Indeterminate: Story = {
  args: { value: 'indeterminate', label: 'Indeterminate state' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled checkbox' },
};

export const DisabledChecked: Story = {
  args: { value: true, disabled: true, label: 'Disabled checked' },
};

export const WithError: Story = {
  args: {
    hasError: true,
    errorMessage: 'This field is required',
    label: 'Error state',
  },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: true, label: 'Read only' },
};

export const NoLabel: Story = {
  args: { label: undefined, description: undefined },
};

export const Rounded: Story = {
  args: { rounded: true, label: 'Rounded checkbox' },
};

export const Add: Story = {
  args: {
    variant: 'add',
    value: false,
    label: 'Unchecked state',
    accentColor: '#22C55E',
  },
};

export const AddChecked: Story = {
  args: {
    variant: 'add',
    value: true,
    label: 'Checked state',
    accentColor: '#22C55E',
  },
};

export const AddAllStates: Story = {
  render: () => (
    <View style={addStyles.list}>
      <Checkbox variant="add" value={false} label="Unchecked state" accentColor="#22C55E" />
      <View style={addStyles.divider} />
      <Checkbox variant="add" value={true} label="Checked state" accentColor="#22C55E" />
      <View style={addStyles.divider} />
      <Checkbox variant="add" value={false} label="Disabled state" disabled accentColor="#22C55E" />
      <View style={addStyles.divider} />
      <Checkbox variant="add" value={true} label="Checked disabled state" disabled accentColor="#22C55E" />
      <View style={addStyles.divider} />
      <Checkbox variant="add" value={false} label="Unchecked error state" hasError accentColor="#22C55E" />
    </View>
  ),
};

const addStyles = StyleSheet.create({
  list: { gap: 0 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 4 },
});
