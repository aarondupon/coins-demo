import '@/i18n';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QueryClient, QueryErrorResetBoundary } from '@tanstack/react-query';
import 'react-native-reanimated';

import AppToast from '@/components/app-toast';
import { ErrorBoundary } from '@/components/error-boundary';
import { useColors } from '@/hooks/use-colors';
import { useTranslation } from '@/hooks/use-translation';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

const ONE_DAY_MS = 1000 * 60 * 60 * 24;
const FIVE_MINUTES_MS = 1000 * 60 * 5;


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      gcTime: ONE_DAY_MS,
      staleTime: FIVE_MINUTES_MS, 
    },
  },
})
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 1000,
});

function BackButton({ label, colors }: { label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <Pressable
      onPress={() => router.back()}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
    </Pressable>
  );
}

export default function RootLayout() {
  const { t } = useTranslation();
  const colors = useColors();

  return (
    <PersistQueryClientProvider 
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: ONE_DAY_MS,
      }}
      >
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} colors={colors}>
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: colors.background.card },
                headerTintColor: colors.text.primary,
                headerShadowVisible: false,
                headerLeft: () => <BackButton label={t('a11y.back')} colors={colors} />,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: true, title: t('tabs.coins'), headerLeft: undefined }} />
              <Stack.Screen name="coin/[id]" options={{ headerShown: true }} />
            </Stack>
            <AppToast />
            <StatusBar style="auto" />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </PersistQueryClientProvider>
  );
}
