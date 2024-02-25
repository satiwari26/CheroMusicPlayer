import { Text, View } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { DataProvider } from 'recyclerlistview';


export const AudioContext = createContext();
export default class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false,
            //rerender this recyclerlistview when the row1 != row2
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        }
    }

    permissionAlert = () => {
        Alert.alert('Permission Required', 'This app requires access to your audio files', [
            {
                text: 'Grant Permission',
                onPress: () => this.getPermission()
            },
            {
                text: 'Cancel',
                onPress: () => this.permissionAlert()
            }
        ]);
    }

    getAudioFiles = async () => {

        const {dataProvider, audioFiles} = this.state;

        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount
        });
        
        this.setState({...this.state, dataProvider: dataProvider.cloneWithRows(
            [...audioFiles, ...media.assets]),
            audioFiles: [...audioFiles,...media.assets]});
    }

    getPermission = async () => {
        const Permission = await MediaLibrary.getPermissionsAsync();
        if(Permission.granted) {
            //get all the audio files
            this.getAudioFiles();

        }
        if(!Permission.granted, Permission.canAskAgain) {
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status === 'denied' && canAskAgain) {
                //display alert to the user
                this.permissionAlert();
            }
            if(!Permission.canAskAgain && !Permission.granted) {
                this.setState({...this.state, permissionError: true});
            }
            if(status === 'granted') {
                //get all the audio files
                this.getAudioFiles();
            }
            if(status === 'denied' && !canAskAgain) {
                //display error to the user
                this.setState({...this.state, permissionError: true});
            }
        }
    }

    componentDidMount() {
        this.getPermission();
    }

  render() {
    const {audioFiles, dataProvider, permissionError} = this.state;
    if(permissionError){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 25, textAlign: 'center'}}>Permission have been denied by you</Text>
            </View>
        )
    }
    return (
        <AudioContext.Provider value={{audioFiles, dataProvider}}>
            {this.props.children}
        </AudioContext.Provider>
    )
  }
}