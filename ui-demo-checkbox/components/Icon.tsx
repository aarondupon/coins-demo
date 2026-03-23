import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { icons, type IconName } from '@/assets/icons';

export type { IconName };

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function Icon({ name, size = 24, color = '#000', style }: IconProps) {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;
  return <SvgIcon width={size} height={size} color={color} style={style} />;
}