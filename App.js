import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/context/AudioProvider';
import color from './app/misc/color';
import { StatusBar } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.primaryDarkBlue,
  },
};


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AudioProvider>
        <StatusBar backgroundColor={color.tertiaryDarkBlue} barStyle="light-content" />
        <NavigationContainer theme={MyTheme}>
          <AppNavigator />
        </NavigationContainer>
      </AudioProvider>
    </View>
  );
}

