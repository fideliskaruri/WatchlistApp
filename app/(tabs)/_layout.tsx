import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomTabBar from '@/components/ui/TabBar';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =>
            <AntDesign name="home" size={24} color={color} />
          ,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <AntDesign name="find" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rooms"
        options={{
          title: 'Rooms',
          tabBarIcon: ({ color }) => (
            <AntDesign name="rest" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
