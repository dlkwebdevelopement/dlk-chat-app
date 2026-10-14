import React, { useEffect } from 'react';
import * as Updates from 'expo-updates';
import { View } from 'react-native';

export default function UpdateHandler({ children }: React.PropsWithChildren) {
  useEffect(() => {
    async function loadUpdate() {
      if (__DEV__) return;
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.warn('Expo‑Updates error:', e);
      }
    }
    loadUpdate();
  }, []);

  return <View style={{ flex: 1 }}>{children}</View>;
}
