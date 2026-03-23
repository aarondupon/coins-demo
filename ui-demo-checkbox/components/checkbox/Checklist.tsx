import React, { memo, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Checkbox } from './index';

export type ChecklistValue = boolean | 'indeterminate';

export interface ChecklistItem {
  id: string;
  label?: string;
  value: ChecklistValue;
  hasError?: boolean;
  errorMessage?: string;
  children?: ChecklistItem[];
}

export interface ChecklistProps {
  items: ChecklistItem[];
  onItemToggle?: (id: string, value: boolean) => void;
  dividers?: boolean;
  accentColor?: string;
  theme?: ChecklistTheme;
  /** Use FlatList for large lists. Avoid nesting in ScrollView when true. */
  virtualized?: boolean;
  /** Custom render for each item. When provided, onItemToggle and accentColor are ignored. */
  renderItem?: (item: ChecklistItem & { depth: number }) => React.ReactNode;
}

export const DEFAULT_ACCENT_COLOR = '#22C55E';
export const DEFAULT_INDENT = 24;

export const CHECKLIST_THEME = {
  light: { divider: '#E5E7EB', label: '#1F2937', sectionHeader: '#F9FAFB', sectionTitle: '#6B7280' },
  dark: { divider: '#4B5563', label: '#F9FAFB', sectionHeader: '#374151', sectionTitle: '#9CA3AF' },
} as const;

export type ChecklistTheme = keyof typeof CHECKLIST_THEME;

export function flattenChecklistItems(items: ChecklistItem[], depth = 0): (ChecklistItem & { depth: number })[] {
  return items.flatMap((item) => [{ ...item, depth }, ...flattenChecklistItems(item.children ?? [], depth + 1)]);
}

export const Checklist = memo(({
  items,
  onItemToggle,
  dividers,
  accentColor = DEFAULT_ACCENT_COLOR,
  theme = 'light',
  virtualized = false,
  renderItem,
}: ChecklistProps) => {
  const flatItems = useMemo(() => flattenChecklistItems(items), [items]);
  const colors = CHECKLIST_THEME[theme];

  const renderRow = (item: ChecklistItem & { depth: number }, index: number) => (
    <View key={item.id}>
      {dividers && index > 0 && item.depth === 0 && (
        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
      )}
      <View style={[styles.item, { paddingLeft: item.depth * DEFAULT_INDENT }]}>
        {renderItem?.(item) ?? (
          <Checkbox
            value={item.value}
            onValueChange={(value) => onItemToggle?.(item.id, value)}
            label={item.label}
            accentColor={accentColor}
            theme={theme}
            labelStyle={{ color: colors.label }}
            hasError={item.hasError}
            errorMessage={item.errorMessage}
          />
        )}
      </View>
    </View>
  );

  if (virtualized) {
    return (
      <FlatList
        data={flatItems}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={(item) => item.id}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        initialNumToRender={20}
        windowSize={5}
      />
    );
  }

  return <View style={styles.list}>{flatItems.map((item, index) => renderRow(item, index))}</View>;
});

Checklist.displayName = 'Checklist';

const styles = StyleSheet.create({
  list: { gap: 0 },
  item: { paddingVertical: 4 },
  divider: { height: 1, marginVertical: 8, marginLeft: 0 },
});
