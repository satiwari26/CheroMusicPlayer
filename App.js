import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/context/AudioProvider';
import color from './app/misc/color';
import { StatusBar } from 'react-native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.primaryDarkBlue,
  },
};

export default function App() {
  return (
    <AudioProvider>
      <StatusBar backgroundColor={color.tertiaryDarkBlue} barStyle="light-content" />
      <NavigationContainer theme={MyTheme}>
        <AppNavigator />
      </NavigationContainer>
    </AudioProvider>

  );
}

