const light = {
  primary: '#7551ff',
  positive: '#22c55e',
  neutral: '#888',
  background: {
    list: '#fafafa',
    card: '#fff',
    pressed: '#f0f0f0',
    icon: '#e8e8e8',
    section: '#f5f5f5',
    inverted: '#000000',
  },
  text: {
    primary: '#111',
    secondary: '#555',
    muted: '#888',
    inverted: '#ffffff',
  },
  toast: {
    background: '#1a1a1a',
    title: '#fff',
    subtitle: '#aaa',
  },
  border: '#e5e5e5',
  negative: '#ef4444',
  error: '#dc2626',
} as const;


const dark = {
  primary: '#9f7aea',
  positive: '#34d399',
  neutral: '#94a3b8',
  background: {
    list: '#22222a',
    card: '#22222a',
    pressed: '#262626',
    icon: '#2a2a2a',
    section: '#171717',
    inverted: '#3c2069',
  },
  text: {
    primary: '#f5f5f5',
    secondary: '#a3a3a3',
    muted: '#737373',
    inverted: '#fff',
  },
  toast: {
    background: '#262626',
    title: '#fff',
    subtitle: '#a3a3a3',
  },
  border: '#2a2a2a',
  negative: '#f87171',
  error: '#ef4444',
} as const;

export type ColorTheme = typeof light | typeof dark;

export function getColors(colorScheme: string | null | undefined): ColorTheme {
  return colorScheme === 'dark' ? dark : light;
}

export const Colors = light;
