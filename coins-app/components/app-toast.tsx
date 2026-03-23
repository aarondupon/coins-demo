import { Dimensions } from 'react-native';
import Toast, { BaseToast, type ToastConfigParams } from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToastOnRouteChange } from '@/hooks/use-toast';
import { useColors } from '@/hooks/use-colors';

export default function AppToast() {
  useToastOnRouteChange();
  const { bottom } = useSafeAreaInsets();
  const colors = useColors();

  const toastStyles = {
    container: {
      width: Dimensions.get('window').width - 32,
      borderRadius: 8,
      borderLeftWidth: 0,
      backgroundColor: colors.toast.background,
      marginHorizontal: 16,
      marginBottom: 8,
    },
    content: { paddingHorizontal: 12, paddingVertical: 4 },
    title: (color: string) => ({ fontSize: 14, fontWeight: '500' as const, color }),
    subtitle: { fontSize: 12, fontWeight: '400' as const, color: colors.toast.subtitle },
  };

  const infoSuccessToast = (props: ToastConfigParams<Record<string, never>>) => (
    <BaseToast {...props} style={toastStyles.container} contentContainerStyle={toastStyles.content} text1Style={toastStyles.title(colors.toast.title)} text2Style={toastStyles.subtitle} />
  );
  const errorToast = (props: ToastConfigParams<Record<string, never>>) => (
    <BaseToast {...props} style={toastStyles.container} contentContainerStyle={toastStyles.content} text1Style={toastStyles.title(colors.negative)} text2Style={toastStyles.subtitle} />
  );
  return (
    <Toast
      config={{
        info: infoSuccessToast,
        success: infoSuccessToast,
        error: errorToast,
      }}
      position="bottom"
      bottomOffset={bottom}
      visibilityTime={1000}
      autoHide
    />
  );
}
