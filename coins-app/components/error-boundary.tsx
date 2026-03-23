import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { ColorTheme } from '@/constants/theme';
import { Colors } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  onReset?: () => void;
  colors?: ColorTheme;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  reset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    const c = this.props.colors ?? Colors;
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: c.background.card,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: c.error, marginBottom: 12 }}>
            Something went wrong
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: c.text.secondary,
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            {this.state.error?.message ?? 'An unexpected error occurred. Please try again or come back later.'}
          </Text>
          <Pressable
            style={{
              backgroundColor: c.primary,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={this.reset}
            accessibilityRole="button"
            accessibilityLabel="Try again"
          >
            <Text style={{ color: c.text.inverted, fontSize: 16, fontWeight: '600' }}>Try again</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
