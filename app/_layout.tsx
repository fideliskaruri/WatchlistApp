import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Button from "@/components/ui/FloatButton";

import { useColorScheme } from '@/hooks/useColorScheme';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import ExpandableFloatingButton from '@/components/ui/FloatButton';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ExpandableFloatingButton
        actions={[
          {
            icon: 'videocamera',
            label: 'New Watchlist',
            
            onPress: () => console.log('Create new watchlist'),
            backgroundColor: '#FF5252'
          },
          {
            icon: 'appstore-o',
            label: 'New Category',
            onPress: () => console.log('Create new category'),
            backgroundColor: '#4CAF50'
          },
          {
            icon: 'addusergroup',
            label: 'New Room',
            onPress: () => console.log('Create friend group'),
            backgroundColor: '#ff6c00'
          }
        ]}
        mainButtonColor="#fff"

      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />

      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
