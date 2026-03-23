import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    const { queryByText } = render(<Checkbox value={false} testID="cb" label="Test" />);
    expect(queryByText('Test')).toBeTruthy();
  });

  it('calls onValueChange when pressed', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox value={false} onValueChange={onValueChange} testID="cb" />
    );
    fireEvent.press(getByTestId('cb'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox value={false} disabled onValueChange={onValueChange} testID="cb" />
    );
    fireEvent.press(getByTestId('cb'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders indeterminate state', () => {
    const { queryByText } = render(
      <Checkbox value="indeterminate" label="Indeterminate" />
    );
    expect(queryByText('Indeterminate')).toBeTruthy();
  });

  it('shows error message when hasError', () => {
    const { queryByText } = render(
      <Checkbox value={false} hasError errorMessage="Required" />
    );
    expect(queryByText('Required')).toBeTruthy();
  });

  it('exposes checked mixed for indeterminate state', () => {
    const { getByTestId } = render(
      <Checkbox value="indeterminate" accessibilityLabel="Select some" testID="cb" />
    );
    expect(getByTestId('cb').props.accessibilityState.checked).toBe('mixed');
  });

  it('does not call onValueChange when readOnly', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <Checkbox value={true} readOnly onValueChange={onValueChange} testID="cb" />
    );
    fireEvent.press(getByTestId('cb'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
