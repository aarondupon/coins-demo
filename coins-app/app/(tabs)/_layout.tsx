import { Linking, Pressable } from 'react-native';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { FloatingTabBar, getFloatingTabBarStyle } from '@/components/floating-tab-bar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useTranslation } from '@/hooks/use-translation';

const GITHUB_URL = 'https://github.com/aarondupon';

export default function TabLayout() {
  const { t } = useTranslation();
  const colors = useColors();

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.text.inverted,
        headerShown: false,
        tabBarStyle: getFloatingTabBarStyle(colors),
        tabBarShowLabel: true,
        tabBarItemStyle: { flex: 1, alignSelf: 'stretch', paddingTop: 0, height:54 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.coins'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="github"
        options={{
          title: t('tabs.github'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="link" color={color} />,
          tabBarButton: ({ ref: _ref, onPress: _onPress, ...rest }: BottomTabBarButtonProps) => (
            <Pressable {...rest} onPress={() => Linking.openURL(GITHUB_URL)} />
          ),
        }}
      />
    </Tabs>
  );
}
