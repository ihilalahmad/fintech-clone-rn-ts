import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'inactivity-storage',
});

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log('AppState: ', nextAppState);
    if (nextAppState === 'background') {
      recordStartTime();
    } else if (
      nextAppState === 'active' &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber('startTime') || 0);
      console.log('elapsed: ', elapsed);
      if (elapsed > 3000 && isSignedIn) {
        console.log('elapsed: ', elapsed);

        console.log('elapsed: ', elapsed);
        router.replace('/(authenticated)/(modals)/lock');
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    console.log('start recording time');

    storage.set('startTime', Date.now());
  };

  return children;
};
