import { useColorScheme } from 'react-native';
import { getColors } from '@/constants/theme';

export function useColors() {
  const colorScheme = useColorScheme();
  return getColors(colorScheme);
}
