import { Text, View } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { DataProvider } from 'recyclerlistview';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {Audio} from 'expo-av';
import { storeAudioForNextOpening } from '../misc/helper';

export const AudioContext = createContext();
export default class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PlayList: [],
            addToPlayList: null,
            audioFiles: [],
            permissionError: false,
            //rerender this recyclerlistview when the row1 != row2
            dataProvider: new DataProvider((r1, r2) => r1 !== r2),
            playBackObject: null,
            soundObj: null,
            currentAudio: {},
            isPlaying: false,
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,
        }
        this.totalAudioCount = 0;
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
        this.totalAudioCount = media.totalCount;
        
        this.setState({...this.state, dataProvider: dataProvider.cloneWithRows(
            [...audioFiles, ...media.assets]),
            audioFiles: [...audioFiles,...media.assets]});
    };

    loadPreviousAudio = async () => {
        let previousAudio = await AsyncStorage.getItem('previousAudio');
        let currentAudio;
        let currentAudioIndex;

        if(previousAudio === null) {
            currentAudio = this.state.audioFiles[0];
            currentAudioIndex = 0;
        }
        else {
            previousAudio = JSON.parse(previousAudio);
            currentAudio = previousAudio.audio;
            currentAudioIndex = previousAudio.index;
        }

        this.setState({...this.state, currentAudio, currentAudioIndex});
    };

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

    onPlaybackStatusUpdate = async (playbackStatus) => {
        if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
          this.updateState(this, {playbackPosition: playbackStatus.positionMillis, playbackDuration: playbackStatus.durationMillis});
        }
    
        if(playbackStatus.didJustFinish) {
          const nextAudioIndex = this.state.currentAudioIndex + 1;
          const audio = this.state.audioFiles[nextAudioIndex];
    
          if(nextAudioIndex >= this.totalAudioCount) {
            this.state.playBackObject.unloadAsync();
            this.updateState(this, {currentAudio: this.state.audioFiles[0], soundObj: null, isPlaying: false, currentAudioIndex: 0, 
              playbackPosition: null, playbackDuration: null});
            
            return storeAudioForNextOpening(this.state.audioFiles[0], 0);
          }
    
          const status = await newAudio(this.state.playBackObject, audio.uri);
    
          this.updateState(this, {currentAudio: audio, soundObj: status, isPlaying: true, currentAudioIndex: nextAudioIndex});
          await storeAudioForNextOpening(audio, nextAudioIndex);
        }
    };

    componentDidMount() {
        this.getPermission();
        if(this.state.playBackObject === null) {
            this.setState({...this.state, playBackObject: new Audio.Sound()});
        }
    }

    updateState = (prevState, newState = {}) => {
        this.setState({...prevState, ...newState});
    }

  render() {
    const {playbackDuration, playbackPosition ,audioFiles, dataProvider, permissionError, PlayList, addToPlayList,
        playBackObject, soundObj, currentAudio, isPlaying, currentAudioIndex} = this.state;
    if(permissionError){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 25, textAlign: 'center'}}>Permission have been denied by you</Text>
            </View>
        )
    }
    return (
        <AudioContext.Provider value={{audioFiles, dataProvider, playBackObject,
        PlayList, addToPlayList, 
        soundObj, currentAudio, updateState: this.updateState, 
        isPlaying, currentAudioIndex,
        totalAudioCount: this.totalAudioCount,
        playbackDuration, playbackPosition,
        loadPreviousAudio: this.loadPreviousAudio,
        onPlaybackStatusUpdate: this.onPlaybackStatusUpdate
        }}>
            {this.props.children}
        </AudioContext.Provider>
    )
  }
}