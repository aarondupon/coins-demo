import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox, Checklist, CHECKLIST_THEME, type ChecklistItem } from './index';
import { useChecklist } from './useChecklist';

const meta: Meta<typeof Checklist> = {
  title: 'Components/Checklist',
  component: Checklist,
  args: { dividers: true, theme: 'light', virtualized: false },
  argTypes: {
    theme: { control: 'select', options: ['light', 'dark'] },
    virtualized: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

const ACCENT = { purple: '#8B5CF6', green: '#22C55E' } as const;

const baseItems: ChecklistItem[] = [
  { id: '1', label: 'Label', value: false },
  {
    id: '2',
    label: 'Parent',
    value: 'indeterminate',
    children: [
      { id: '2a', label: 'Child', value: true },
      { id: '2b', label: 'Child', value: false },
    ],
  },
  { id: '3', label: 'Label', value: true },
];

const addItems: ChecklistItem[] = [
  { id: 'a1', label: 'Unchecked', value: false },
  { id: 'a2', label: 'Checked', value: true },
  { id: 'a3', label: 'Disabled', value: false },
  { id: 'a4', label: 'Disabled + error', value: true, hasError: true },
  { id: 'a5', label: 'Error', value: false, hasError: true },
];

const errorItems: ChecklistItem[] = [
  { id: '1', label: 'Item', value: false },
  { id: '2', label: 'Item with error', value: false, hasError: true },
  { id: '3', label: 'Item', value: true },
];

const roundedAllStates: ChecklistItem[] = [
  { id: 'r1', label: 'Default', value: false },
  { id: 'r2', label: 'Checked', value: true },
  { id: 'r3', label: 'Disabled', value: false },
  { id: 'r4', label: 'Disabled checked', value: true },
  { id: 'r5', label: 'Disabled unchecked (red)', value: false, hasError: true },
];

const longItems: ChecklistItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `v${i + 1}`,
  label: `Section ${i + 1}`,
  value: (i % 2 === 0 ? 'indeterminate' : false) as ChecklistItem['value'],
  children: Array.from({ length: 4 }, (_, j) => ({
    id: `v${i + 1}-${j + 1}`,
    label: `Item ${i * 4 + j + 1}`,
    value: (i + j) % 3 === 0,
  })),
}));

const s = StyleSheet.create({
  stack: { gap: 24, padding: 16 },
  heading: { fontSize: 14, fontWeight: '600', color: '#9CA3AF', marginBottom: 4 },
});

function DefaultStory(props: { theme?: 'light' | 'dark'; virtualized?: boolean }) {
  const { items, toggleItem } = useChecklist(baseItems);
  return (
    <Checklist items={items} onItemToggle={toggleItem} dividers theme={props.theme} virtualized={props.virtualized} />
  );
}
export const CheckboxLightMode: Story = { render: (a) => <DefaultStory theme={a.theme} virtualized={a.virtualized} /> };

function RoundedStory(props: { theme?: 'light' | 'dark' }) {
  const { items, toggleItem } = useChecklist(roundedAllStates);
  const theme = props.theme ?? 'light';
  const c = CHECKLIST_THEME[theme];
  const disabled = (id: string) => ['r3', 'r4', 'r5'].includes(id);
  return (
    <Checklist
      items={items}
      onItemToggle={toggleItem}
      dividers
      theme={theme}
      renderItem={(item) => (
        <Checkbox
          value={item.value}
          onValueChange={(v) => toggleItem(item.id, v)}
          label={item.label}
          theme={theme}
          labelStyle={{ color: c.label }}
          rounded
          disabled={disabled(item.id)}
          hasError={item.hasError}
          errorMessage={item.errorMessage}
        />
      )}
    />
  );
}
export const RoundedLightMode: Story = { render: (a) => <RoundedStory theme={a.theme} /> };
export const RoundedDarkMode: Story = { args: { theme: 'dark' }, render: () => <RoundedStory theme="dark" /> };

function CustomStory(props: { theme?: 'light' | 'dark' }) {
  const { items, toggleItem } = useChecklist(baseItems);
  const theme = props.theme ?? 'light';
  return (
    <Checklist
      items={items}
      dividers
      theme={theme}
      accentColor={ACCENT.purple}
      renderItem={(item) => (
        <Checkbox
          value={item.value}
          onValueChange={(v) => toggleItem(item.id, v)}
          label={item.label}
          accentColor={ACCENT.purple}
          theme={theme}
          labelStyle={{ color: CHECKLIST_THEME[theme].label }}
        />
      )}
    />
  );
}
export const CheckboxCustomLightMode: Story = { render: (a) => <CustomStory theme={a.theme} /> };

function ErrorStory(props: { theme?: 'light' | 'dark' }) {
  const { items, toggleItem } = useChecklist(errorItems);
  return <Checklist items={items} onItemToggle={toggleItem} dividers theme={props.theme} />;
}
export const WithError: Story = { render: (a) => <ErrorStory theme={a.theme} /> };

function VirtualizedStory(props: { theme?: 'light' | 'dark'; virtualized?: boolean }) {
  const { items, toggleItem } = useChecklist(longItems);
  return (
    <Checklist items={items} onItemToggle={toggleItem} dividers theme={props.theme} virtualized={props.virtualized} />
  );
}
export const Virtualized: Story = {
  args: { virtualized: true },
  render: (a) => <VirtualizedStory theme={a.theme} virtualized={a.virtualized} />,
};

function AddStory(props: { theme?: 'light' | 'dark' }) {
  const { items, toggleItem } = useChecklist(addItems);
  const theme = props.theme ?? 'light';
  const c = CHECKLIST_THEME[theme];
  return (
    <Checklist
      items={items}
      onItemToggle={toggleItem}
      dividers
      theme={theme}
      accentColor={ACCENT.green}
      renderItem={(item) => (
        <Checkbox
          variant="add"
          value={item.value}
          onValueChange={(v) => toggleItem(item.id, v)}
          label={item.label}
          accentColor={ACCENT.green}
          theme={theme}
          labelStyle={{ color: c.label }}
          disabled={item.id === 'a3'}
          hasError={item.hasError}
          errorMessage={item.errorMessage}
        />
      )}
    />
  );
}
export const CheckboxAddLightMode: Story = { render: (a) => <AddStory theme={a.theme} /> };

function DarkAddStory() {
  const { items, toggleItem } = useChecklist(addItems);
  const c = CHECKLIST_THEME.dark;
  const disabled = (id: string) => id === 'a3' || id === 'a4';
  return (
    <Checklist
      items={items}
      onItemToggle={toggleItem}
      dividers
      theme="dark"
      accentColor={ACCENT.green}
      renderItem={(item) => (
        <Checkbox
          variant="add"
          value={item.value}
          onValueChange={(v) => toggleItem(item.id, v)}
          label={item.label}
          accentColor={ACCENT.green}
          theme="dark"
          labelStyle={{ color: c.label }}
          disabled={disabled(item.id)}
          hasError={item.hasError}
          errorMessage={item.errorMessage}
        />
      )}
    />
  );
}
export const CheckboxAddDarkMode: Story = { args: { theme: 'dark' }, render: () => <DarkAddStory /> };

function DarkAllStory() {
  const [defaultItems, customItems, roundedItems, errorItemsState, addItemsState] = [
    useChecklist(baseItems),
    useChecklist(baseItems),
    useChecklist(roundedAllStates),
    useChecklist(errorItems),
    useChecklist(addItems),
  ];
  const c = CHECKLIST_THEME.dark;
  const disabledAdd = (id: string) => id === 'a3' || id === 'a4';
  const disabledRounded = (id: string) => ['r3', 'r4', 'r5'].includes(id);
  const theme = 'dark';

  return (
    <View style={s.stack}>
      <Text style={s.heading}>Default</Text>
      <Checklist items={defaultItems.items} onItemToggle={defaultItems.toggleItem} dividers theme={theme} />

      <Text style={s.heading}>Rounded</Text>
      <Checklist
        items={roundedItems.items}
        onItemToggle={roundedItems.toggleItem}
        dividers
        theme={theme}
        renderItem={(item) => (
          <Checkbox
            value={item.value}
            onValueChange={(v) => roundedItems.toggleItem(item.id, v)}
            label={item.label}
            theme={theme}
            labelStyle={{ color: c.label }}
            rounded
            disabled={disabledRounded(item.id)}
            hasError={item.hasError}
            errorMessage={item.errorMessage}
          />
        )}
      />

      <Text style={s.heading}>Custom</Text>
      <Checklist
        items={customItems.items}
        dividers
        theme={theme}
        accentColor={ACCENT.purple}
        renderItem={(item) => (
          <Checkbox
            value={item.value}
            onValueChange={(v) => customItems.toggleItem(item.id, v)}
            label={item.label}
            accentColor={ACCENT.purple}
            theme={theme}
            labelStyle={{ color: c.label }}
          />
        )}
      />

      <Text style={s.heading}>With error</Text>
      <Checklist items={errorItemsState.items} onItemToggle={errorItemsState.toggleItem} dividers theme={theme} />

      <Text style={s.heading}>Add</Text>
      <Checklist
        items={addItemsState.items}
        onItemToggle={addItemsState.toggleItem}
        dividers
        theme={theme}
        accentColor={ACCENT.green}
        renderItem={(item) => (
          <Checkbox
            variant="add"
            value={item.value}
            onValueChange={(v) => addItemsState.toggleItem(item.id, v)}
            label={item.label}
            accentColor={ACCENT.green}
            theme={theme}
            labelStyle={{ color: c.label }}
            disabled={disabledAdd(item.id)}
            hasError={item.hasError}
            errorMessage={item.errorMessage}
          />
        )}
      />
    </View>
  );
}
export const Dark: Story = { args: { theme: 'dark' }, render: () => <DarkAllStory /> };
