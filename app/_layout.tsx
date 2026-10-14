import '../global.css';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useAuthStore } from '@/store/useAuthStore';
import { MD3LightTheme as PaperLightTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UpdateHandler from './_updateHandler';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    const prepare = async () => {
      try {
        await checkAuth();
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) {
          SplashScreen.hideAsync();
        }
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <UpdateHandler>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splash" />
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="chat-info-modal"
              options={{ presentation: 'fullScreenModal', headerShown: false }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'fullScreenModal', title: 'Security Advisory' }}
            />
          </Stack>
          <StatusBar style="dark" />
        </UpdateHandler>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const paperTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: '#047857',
    secondary: '#10B981',
    background: '#F0FDF4',
    surface: '#FFFFFF',
    surfaceDisabled: '#E1EFEA',
    onSurface: '#064E3B',
    text: '#064E3B',
    outline: '#DCFCE7',
    error: '#BE123C',
    success: '#10B981',
  },
};
