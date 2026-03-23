import React, { memo, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StyleProp, ViewStyle, TextStyle, AccessibilityState
} from 'react-native';
import { Icon } from '../Icon';

export type CheckboxVariant = 'default' | 'add';
export type CheckboxValue = boolean | 'indeterminate';

export interface CheckboxProps {
  value: CheckboxValue;
  onValueChange?: (value: boolean) => void;
  variant?: CheckboxVariant;
  theme?: 'light' | 'dark';
  rounded?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  errorMessage?: string;
  accentColor?: string;
  accessibilityLabel?: string;
  /** Override the computed accessibility hint (error, required, read-only). */
  accessibilityHint?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

const COLORS = {
  border: { idle: '#6B7280', checked: '#0EB12E', disabled: '#F3F4F6', disabledAdd: '#E6E6E6', error: '#EF4444' },
  bg: {
    checked: '#0EB12E',
    checkedDark: '#6DFF8A',
    disabled: '#F3F4F6',
    disabledAdd: '#E6E6E6',
    error: '#EF4444',
  },
  icon: {
    checked: '#FFFFFF',
    checkedDark: '#262626',
    disabledAdd: '#A6A6A6',
    disabledChecked: '#6B7280',
    white: '#FFFFFF',
  },
  text: { primary: '#1F2937', disabled: '#9CA3AF', error: '#EF4444', desc: '#6B7280' },
} as const;

type CheckboxState = 'disabled' | 'readonly' | 'error' | 'checked' | 'idle';

function getCheckboxColors(
  state: CheckboxState,
  opts: { isAdd: boolean; isChecked: boolean; isIndeterminate: boolean; theme?: 'light' | 'dark'; accentColor?: string }
) {
  const { isAdd, isChecked, isIndeterminate, theme, accentColor } = opts;
  const isFilled = isChecked || isIndeterminate;

  if (state === 'error') {
    return {
      borderColor: COLORS.border.error,
      backgroundColor: isFilled ? COLORS.bg.error : 'transparent',
      plusColor: COLORS.border.error,
      checkColor: theme === 'dark' ? COLORS.icon.checkedDark : COLORS.icon.checked,
    };
  }

  const checkedBg = theme === 'dark' ? COLORS.bg.checkedDark : COLORS.bg.checked;
  const fillColor =
    accentColor
      ? accentColor
      : theme === 'dark' && isFilled
        ? COLORS.bg.checkedDark
        : checkedBg;

  const disabledBg = isAdd ? COLORS.bg.disabledAdd : COLORS.bg.disabled;
  const borderState = state === 'readonly' ? 'idle' : state;

  const borderColor =
    state === 'disabled'
      ? disabledBg
      : isFilled && accentColor
        ? fillColor
        : COLORS.border[borderState as 'idle' | 'checked' | 'error'];

  const backgroundColor = state === 'disabled' ? disabledBg : isFilled ? fillColor : 'transparent';

  const plusColor =
    state === 'disabled' && isAdd
      ? COLORS.icon.disabledAdd
      : state === 'disabled'
        ? COLORS.icon.white
        : borderColor;

  const checkColor =
    state === 'disabled'
      ? COLORS.icon.disabledChecked
      : theme === 'dark'
        ? COLORS.icon.checkedDark
        : COLORS.icon.checked;

  return { borderColor, backgroundColor, plusColor, checkColor };
}

export const Checkbox = memo(({
  value, onValueChange, variant = 'default', rounded = false, disabled, readOnly, hasError, required,
  label, description, errorMessage, accentColor, theme, accessibilityLabel, accessibilityHint: accessibilityHintProp, testID,
  style, checkboxStyle, iconStyle, labelStyle, descriptionStyle, errorStyle
}: CheckboxProps) => {
  // Error always takes priority over disabled so disabled+error shows red in both themes
  const state: CheckboxState =
    readOnly ? 'readonly' : hasError ? 'error' : disabled ? 'disabled' : value ? 'checked' : 'idle';

  const handlePress = useCallback(() => {
    if (disabled || readOnly || !onValueChange) return;
    onValueChange(value === 'indeterminate' ? false : !(value as boolean));
  }, [disabled, readOnly, onValueChange, value]);

  const isChecked = value === true;
  const isIndeterminate = value === 'indeterminate';
  const isAdd = variant === 'add';

  const { borderColor, backgroundColor, plusColor, checkColor } = getCheckboxColors(state, {
    isAdd,
    isChecked,
    isIndeterminate,
    theme,
    accentColor,
  });

  const isDisabled = Boolean(disabled || readOnly);
  const accState: AccessibilityState = {
    checked: value === 'indeterminate' ? 'mixed' : value === true,
    disabled: isDisabled,
  };

  const computedHint = [
    required && 'Required field',
    readOnly && 'Read only, cannot be changed',
    hasError && 'Has error',
  ]
    .filter(Boolean)
    .join('. ');
  const accessibilityHint = (accessibilityHintProp ?? computedHint) || undefined;

  const accessibilityValue =
    (errorMessage || description) && !accessibilityHintProp
      ? { text: errorMessage || description }
      : undefined;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isDisabled}
      focusable={!isDisabled}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={accState}
      accessibilityHint={accessibilityHint}
      accessibilityValue={accessibilityValue}
      testID={testID}
      style={[styles.row, style]}
    >
      <View style={[styles.box, { borderColor, backgroundColor, borderRadius: (rounded || isAdd) ? 10 : 4 }, checkboxStyle]}>
        {isAdd && !isChecked && !isIndeterminate && <Icon name="plus" size={14} color={plusColor} style={iconStyle} />}
        {(isChecked || (isAdd && isIndeterminate)) && <Icon name="check" size={14} color={checkColor} style={iconStyle} />}
        {!isAdd && isIndeterminate && <View style={[styles.indeterminate, iconStyle]} />}
      </View>

      {(label || description || errorMessage) && (
        <View style={styles.content}>
          {label && (
            <Text style={[styles.label, state === 'disabled' && { color: COLORS.text.disabled }, labelStyle]}>
              {label}
            </Text>
          )}
          {description && !errorMessage && (
            <Text style={[styles.desc, descriptionStyle]}>{description}</Text>
          )}
          {errorMessage && (
            <Text style={[styles.error, errorStyle]}>{errorMessage}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
});

Checkbox.displayName = 'Checkbox';

export {
  Checklist,
  flattenChecklistItems,
  CHECKLIST_THEME,
  DEFAULT_ACCENT_COLOR,
  DEFAULT_INDENT,
} from './Checklist';
export { useChecklist, updateChecklistNode } from './useChecklist';
export type { ChecklistItem, ChecklistValue, ChecklistTheme } from './Checklist';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 4 },
  box: { width: 22, height: 22, borderRadius: 4, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  indeterminate: { width: 12, height: 2, backgroundColor: COLORS.icon.white, borderRadius: 1 },
  content: { flex: 1, gap: 4 },
  label: { fontSize: 16, color: COLORS.text.primary, lineHeight: 20 },
  desc: { fontSize: 14, color: COLORS.text.desc },
  error: { fontSize: 14, color: COLORS.text.error },
});
