import AsyncStorage  from '@react-native-async-storage/async-storage';

export const storeAudioForNextOpening = async (audio, index) => {
    try {
        await AsyncStorage.setItem('previousAudio', JSON.stringify({audio, index}));
    } catch (e) {
        console.log(`Error occured while storing audio for next opening`, e);
    }
};