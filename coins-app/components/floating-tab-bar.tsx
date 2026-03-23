import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ColorTheme } from '@/constants/theme';

const MARGIN = 24;
const HEIGHT = 58;
const BOTTOM = 16;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export function getFloatingTabBarStyle(colors: ColorTheme) {
  return {
    shadowRadius: 12,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: '#000',
    elevation: 12,
    borderTopWidth: 0,
    backgroundColor: colors.background.inverted,
    borderRadius: 32,
    height: HEIGHT,
  };
}

export function FloatingTabBar(props: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { marginHorizontal: MARGIN, bottom: bottom + BOTTOM }]}>
      <BottomTabBar {...props} />
    </View>
  );
}
