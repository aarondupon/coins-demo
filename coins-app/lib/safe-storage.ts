import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Wraps AsyncStorage to catch "Native module is null" and similar errors.
 * When AsyncStorage fails (e.g. timing, linking, or platform issues), operations
 * no-op so the app works without persistence. Works on both iOS and Android.
 */
export const safeAsyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // Persistence disabled for this session
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // Silently fail
    }
  },
};
