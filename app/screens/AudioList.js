import { View, Text } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import React, {Component} from 'react'
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView } from 'recyclerlistview';
import { LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import color from '../misc/color';
import OptionModel from '../components/OptionModel';
import {Audio} from 'expo-av';
import {newAudio, pause, play, resume} from '../misc/AudioController';
import { storeAudioForNextOpening } from '../misc/helper';

export default class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider((i) => {
    return('audio');
  }, 
    (type, dim) => {
      dim.width = Dimensions.get('window').width;
      dim.height = 70;
    }
  )

  // onPlaybackStatusUpdate = async (playbackStatus) => {
  //   if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
  //     this.context.updateState(this.context, {playbackPosition: playbackStatus.positionMillis, playbackDuration: playbackStatus.durationMillis});
  //   }

  //   if(playbackStatus.didJustFinish) {
  //     const nextAudioIndex = this.context.currentAudioIndex + 1;
  //     const audio = this.context.audioFiles[nextAudioIndex];

  //     if(nextAudioIndex >= this.context.totalAudioCount) {
  //       this.context.playBackObject.unloadAsync();
  //       this.context.updateState(this.context, {currentAudio: this.context.audioFiles[0], soundObj: null, isPlaying: false, currentAudioIndex: 0, 
  //         playbackPosition: null, playbackDuration: null});
        
  //       return storeAudioForNextOpening(this.context.audioFiles[0], 0);
  //     }

  //     const status = await newAudio(this.context.playBackObject, audio.uri);

  //     this.context.updateState(this.context, {currentAudio: audio, soundObj: status, isPlaying: true, currentAudioIndex: nextAudioIndex});
  //     await storeAudioForNextOpening(audio, nextAudioIndex);
  //   }
  // };

  handleAudioPress = async (audio) => {
    const {playBackObject, soundObj, currentAudio, updateState, audioFiles} = this.context;
    //initial audio play
    if(soundObj === null) {
      const playBackObject = new Audio.Sound();
      const status = await play(playBackObject, audio.uri);
      const index = audioFiles.indexOf(audio);
      updateState(this.context, {playBackObject: playBackObject, currentAudio: audio, soundObj: status, isPlaying: true, currentAudioIndex: index});
      
      playBackObject.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate);
      return storeAudioForNextOpening(audio, index);
    }

    // If a different audio file is clicked
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await newAudio(playBackObject, audio.uri);
      const index = audioFiles.indexOf(audio);
      updateState(this.context, {currentAudio: audio, soundObj: status, isPlaying: true, currentAudioIndex: index});
      return storeAudioForNextOpening(audio, index);
    }

    //pause the audio on clicling it again
    if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await pause(playBackObject);
      return updateState(this.context, {soundObj: status, isPlaying: false});
    }

    //resume the audio on clicling it again
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await resume(playBackObject);
      return updateState(this.context, {soundObj: status, isPlaying: true});
    }
  };

  componentDidMount() {
    this.context.loadPreviousAudio();
  }

  rowRenderer = (type, item, index, extendedState) => {
    return(
      <AudioListItem title={item.filename} duration={item.duration}
      isPlaying={extendedState.isPlaying}
      activeListItem={this.context.currentAudioIndex === index}
      onAudioPress={()=>{this.handleAudioPress(item)}}
       onPressOptions= {()=>{
        this.currentItem = item;
        this.setState({...this.state, optionModalVisible: true})}}/>
    )
  }

  render() {

    return(
      <AudioContext.Consumer>
        {({dataProvider, isPlaying })=>{
          if(!dataProvider._data.length) return null;
          return(
            <View style={styles.container}>
              <RecyclerListView 
                style={{ width: '100%', height: '100%' }}
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{isPlaying}}
              />
              <OptionModel 
              onPlayListPress={()=>{
                this.context.updateState(this.context, {addToPlayList: this.currentItem})
                this.props.navigation.navigate('Chero Play List')
              }}
              onPlayPress={()=>{console.log('Playing audio');}}
              currentItem={this.currentItem} 
              onClose={()=>{this.setState({...this.state, optionModalVisible: false})}} 
              visible={this.state.optionModalVisible}/>

            </View>
          )
        }}
      </AudioContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primaryDarkBlue,
  }
});