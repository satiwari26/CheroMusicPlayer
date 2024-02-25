import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/context/AudioProvider';
import AudioListItem from './app/components/AudioListItem';
import {View} from 'react-native';
import color from './app/misc/color';

export default function App() {
  return (
    // <AudioProvider>
    //   <NavigationContainer>
    //     <AppNavigator />
    //   </NavigationContainer>
    // </AudioProvider>
    <View style={{marginTop: 50, backgroundColor: color.primaryDarkBlue, flex: 1}}>
      <AudioListItem/>
    </View>

  );
}

