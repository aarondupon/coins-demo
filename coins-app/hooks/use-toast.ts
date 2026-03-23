import Toast from 'react-native-toast-message';
import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';

export function useToastOnRouteChange() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      // Hide toast when route changes
      Toast.hide();
      previousPathname.current = pathname;
    }
  }, [pathname]);
}