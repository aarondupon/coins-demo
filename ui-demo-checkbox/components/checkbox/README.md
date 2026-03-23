# Checkbox component

Reusable React Native checkbox with multiple variants and visual states, plus an architecture for hierarchical checklists.

## Installation

```bash
cd ui-demo-checkbox && npm install
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run storybook` | Storybook (component dev) |
| `npm run storybook:ios` | Storybook on iOS |
| `npm run storybook:android` | Storybook on Android |
| `npm run storybook:generate` | Generate story index |
| `npm test` | Jest unit tests |
| `npm start` | Expo dev server |

## Usage

The component lives in `@/components/checkbox`. Import from the barrel:

```tsx
import {
  Checkbox,
  Checklist,
  useChecklist,
  updateChecklistNode,
  flattenChecklistItems,
  CHECKLIST_THEME,
  DEFAULT_ACCENT_COLOR,
  DEFAULT_INDENT,
} from '@/components/checkbox';
import type { ChecklistItem, ChecklistValue, ChecklistTheme } from '@/components/checkbox';
```

## Checkbox

### Basic usage

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  value={checked}
  onValueChange={setChecked}
  label="Accept terms"
  description="Optional description text"
/>
```

### Variants

| Variant        | Description                                   |
|----------------|-----------------------------------------------|
| `default`      | Standard checkbox with check mark             |
| `add`          | Plus icon when unchecked, check when checked  |
| `binary`       | Same as default (true/false only)             |
| `indeterminate`| Visual style when value is indeterminate      |

### Props

| Prop                  | Type                         | Default    | Description                                   |
|-----------------------|------------------------------|------------|-----------------------------------------------|
| `value`               | `boolean \| 'indeterminate'` | required   | Current state                                 |
| `onValueChange`       | `(value: boolean) => void`   | —          | Called when toggled                           |
| `variant`             | `CheckboxVariant`            | `'default'`| `default`, `binary`, `indeterminate`, `add`   |
| `theme`               | `'light' \| 'dark'`          | —          | Light or dark theme                           |
| `rounded`             | `boolean`                    | `false`    | Rounded corners                               |
| `disabled`            | `boolean`                    | `false`    | Disabled, non-interactive                      |
| `readOnly`            | `boolean`                    | `false`    | Read-only, cannot toggle                      |
| `hasError`            | `boolean`                    | `false`    | Error styling (e.g. red border)               |
| `required`            | `boolean`                    | `false`    | Required field (accessibility hint)           |
| `label`               | `string`                     | —          | Main label                                    |
| `description`         | `string`                     | —          | Secondary text below label                    |
| `errorMessage`        | `string`                     | —          | Error text (shows when `hasError`)            |
| `accentColor`         | `string`                     | —          | Custom accent/brand color                     |
| `accessibilityLabel`   | `string`                     | —          | Override label for screen readers             |
| `accessibilityHint`   | `string`                     | —          | Override computed hint                        |
| `testID`              | `string`                     | —          | For automated tests                           |
| `style`               | `ViewStyle`                  | —          | Container style                               |
| `checkboxStyle`       | `ViewStyle`                  | —          | Checkbox box style                            |
| `labelStyle`          | `TextStyle`                  | —          | Label text style                              |
| `descriptionStyle`    | `TextStyle`                  | —          | Description text style                        |
| `errorStyle`          | `TextStyle`                  | —          | Error text style                              |

### Visual states

- **Default** – unchecked
- **Checked** – checked
- **Indeterminate** – `value="indeterminate"` (e.g. parent with mixed children)
- **Disabled** – `disabled={true}`
- **Read-only** – `readOnly={true}`
- **Error** – `hasError={true}` with optional `errorMessage`

### Add variant example

```tsx
<Checkbox
  variant="add"
  value={false}
  onValueChange={setChecked}
  label="Add item"
  accentColor="#22C55E"
/>
```

---

## Checklist

Render a list of checkboxes, including nested items. Parent checkboxes show indeterminate when some (but not all) children are checked.

### Basic usage

```tsx
const items: ChecklistItem[] = [
  { id: '1', label: 'Item 1', value: false },
  { id: '2', label: 'Parent', value: 'indeterminate', children: [
    { id: '2a', label: 'Child A', value: true },
    { id: '2b', label: 'Child B', value: false },
  ]},
];
const { items, toggleItem } = useChecklist(items);

<Checklist
  items={items}
  onItemToggle={toggleItem}
  dividers
/>
```

### Props

| Prop           | Type                                        | Default            | Description                              |
|----------------|---------------------------------------------|--------------------|-----------------------------------------|
| `items`        | `ChecklistItem[]`                           | required           | Checklist data                          |
| `onItemToggle` | `(id: string, value: boolean) => void`     | —                  | Called when an item is toggled          |
| `dividers`     | `boolean`                                   | —                  | Show dividers between top-level items   |
| `accentColor`  | `string`                                    | `'#22C55E'`        | Accent color for checkboxes             |
| `theme`        | `'light' \| 'dark'`                         | `'light'`          | Theme                                    |
| `virtualized`  | `boolean`                                   | `false`            | Use FlatList for large lists            |
| `renderItem`   | `(item: ChecklistItem & { depth }) => Node` | —                  | Custom render per item                  |

### ChecklistItem

```ts
interface ChecklistItem {
  id: string;
  label?: string;
  value: boolean | 'indeterminate';
  hasError?: boolean;
  errorMessage?: string;
  children?: ChecklistItem[];
}
```

---

## useChecklist

State hook for hierarchical checklists. Automatically updates parent values when children change and children when parents change.

```tsx
const { items, toggleItem, resetItems, toggleAll } = useChecklist(initialItems);

// Toggle a single item by id
toggleItem('2a', true);

// Reset to initial state
resetItems();

// Check or uncheck all items
toggleAll(true);
toggleAll(false);
```

---

## Utilities

### updateChecklistNode

Update a node by id; cascades to children and recomputes parent values. Useful for sectioned or custom UIs.

```tsx
const updated = updateChecklistNode(items, '2', true);
```

### flattenChecklistItems

Flatten nested items with depth:

```tsx
const flat = flattenChecklistItems(items);
// [{ ...item, depth: 0 }, { ...child, depth: 1 }, ...]
```

### Constants

- `CHECKLIST_THEME` – theme colors for light/dark
- `DEFAULT_ACCENT_COLOR` – `'#22C55E'`
- `DEFAULT_INDENT` – `24` (px per depth level)

---

## Virtualization

For long lists, use `virtualized={true}`. Avoid nesting the Checklist inside a ScrollView in that case; let FlatList handle scrolling.

```tsx
<Checklist items={items} onItemToggle={toggleItem} virtualized />
```

---

## Custom rendering

Use `renderItem` to fully customize each row:

```tsx
<Checklist
  items={items}
  renderItem={(item) => (
    <Checkbox
      value={item.value}
      onValueChange={(v) => toggleItem(item.id, v)}
      label={item.label}
      variant="add"
    />
  )}
/>
```
