import type { Preview } from '@storybook/react-native';
import React, { useEffect } from 'react';
import { View, Appearance } from 'react-native';

function ThemeSyncDecorator({ Story, theme }: { Story: React.ComponentType; theme?: 'light' | 'dark' }) {
  useEffect(() => {
    if (theme === 'light' || theme === 'dark') {
      Appearance.setColorScheme(theme);
    } else {
      Appearance.setColorScheme(null);
    }
    return () => Appearance.setColorScheme(null);
  }, [theme]);
  return <Story />;
}

function withThemeSync(Story: React.ComponentType, context: { args?: { theme?: 'light' | 'dark' } }) {
  return <ThemeSyncDecorator Story={Story} theme={context.args?.theme} />;
}

const preview: Preview = {
  decorators: [
    withThemeSync,
    (Story) => (
      <View style={{ flex: 1, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default preview;
