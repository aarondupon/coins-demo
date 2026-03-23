import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Colors } from '@/constants/theme';
import { StaleBanner } from './stale-banner';

describe('StaleBanner', () => {
  it('renders default message and retry button', () => {
    const onRetry = jest.fn();
    const { getByTestId, getByText } = render(<StaleBanner onRetry={onRetry} colors={Colors} />);
    expect(getByText('Using cached data')).toBeTruthy();
    expect(getByTestId('stale-banner-retry')).toBeTruthy();
  });

  it('renders custom message when provided', () => {
    const { getByText } = render(
      <StaleBanner onRetry={() => {}} message="Custom error" colors={Colors} />
    );
    expect(getByText('Custom error')).toBeTruthy();
  });

  it('calls onRetry when retry button is pressed', () => {
    const onRetry = jest.fn();
    const { getByTestId } = render(<StaleBanner onRetry={onRetry} colors={Colors} />);
    fireEvent.press(getByTestId('stale-banner-retry'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
