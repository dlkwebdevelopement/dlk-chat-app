import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0284C7', // Deep Sky Blue
        tabBarInactiveTintColor: '#94A3B8', // Slate
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Pure white tab bar
          borderTopWidth: 1,
          borderTopColor: '#E0F2FE', // Light sky blue border
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
          shadowColor: 'transparent',
          elevation: 0,
        },
        tabBarButton: HapticTab,
      }}>

      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Chats Tab */}
      <Tabs.Screen
        name="chats"
        options={{
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="bubble.left.and.bubble.right.fill" color={color} />
          ),
        }}
      />

      {/* Groups Tab */}
      <Tabs.Screen
        name="groups"
        options={{
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="person.3.fill" color={color} />
          ),
        }}
      />

      {/* Meetings Tab */}
      <Tabs.Screen
        name="meetings"
        options={{
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="video.fill" color={color} />
          ),
        }}
      />

      {/* Calls Tab */}
      <Tabs.Screen
        name="calls"
        options={{
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="phone.fill" color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="person.crop.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}