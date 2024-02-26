import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import color from '../misc/color';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: color.tertiaryDarkBlue,
        tabBarInactiveBackgroundColor: color.primaryDarkBlue,
        tabBarActiveTintColor: color.primaryLimeGreen,
        tabBarInactiveTintColor: color.tertiaryLightBlue,
        tabBarLabelStyle: {
          color: color.primaryLightBlue,
        },
        tabBarStyle: [
          {
            display: 'flex',
            borderTopColor: color.primaryDarkBlue,
          },
          null
        ]
      }}
    >
      <Tab.Screen name="Chero Audio List" component={AudioList} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="headset" size={size} color={color} />
        ),
        headerShown: false,
      }}/>
      <Tab.Screen name="Chero Player" component={Player} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome6 name="compact-disc" size={size} color={color} />
        ),
        headerShown: false,
      }}/>
      <Tab.Screen name="Chero Play List" component={PlayList} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="library-music" size={size} color={color} />
        ),
        headerShown: false,
      }}/>
    </Tab.Navigator>
  )
}