import { View, Text, StyleSheet, Dimensions } from 'react-native'
import color from '../misc/color'
import React, { useContext, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider';
import { pause, play, resume } from '../misc/AudioController';

const { width } = Dimensions.get('window');

export default function Player() {

  const context = useContext(AudioContext);

  const {playbackPosition, playbackDuration} = context;

  const calCulateSeebBar = () => {
    if(playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  }

  const handlePlayPause = async () => {
    //play audio if not playing
    if(context.soundObj === null) {
      const audio = context.currentAudio;
      const status = await play(context.playBackObject, audio.uri);
      return context.updateState(context, {soundObj: status, isPlaying: true, currentAudio: audio, currentAudioIndex: context.currentAudioIndex});
    }

    //pause audio if playing
    if(context.soundObj && context.soundObj.isPlaying) {
      const status = await pause(context.playBackObject);
      return context.updateState(context, {soundObj: status, isPlaying: false});
    }

    //resume audio if paused
    if(context.soundObj && !context.soundObj.isPlaying) {
      const status = await resume(context.playBackObject);
      return context.updateState(context, {soundObj: status, isPlaying: true});
    }
  }

  useEffect(() => {
    context.loadPreviousAudio();
  }, []);
  if(!context.currentAudio) return null;

  return (
    <View style={styles.container}>
    {/* need to make sure it is rendering 0 if no song is initially played */}
      <Text style = {styles.audioCount}>{`${context.currentAudioIndex == null ? 0 : context.currentAudioIndex + 1} / ${context.totalAudioCount}`}</Text>
      <View style={styles.midBannerContainer}>
        <Entypo name="folder-music" size={300} color={context.isPlaying ? color.secondaryLightBlue : color.primaryLightBlue} />
      </View>
      <View style={styles.audioPlayerContainer}>
        <Text numberOfLines={1} style={styles.audioTitle}>{context.currentAudio.filename}</Text>
        <Slider
          style={{width: width, height: 40}}
          minimumValue={0}
          maximumValue={1}
          value={calCulateSeebBar()}
          minimumTrackTintColor={color.primaryLimeGreen}
          maximumTrackTintColor={color.tertiaryLightBlue}
        />
        <View style={styles.audioControllers}>
          <PlayerButton onPress={()=>{console.log("Hello world!");}} iconType='previous'/>
          <PlayerButton onPress={handlePlayPause} iconType={context.isPlaying ? 'play' : 'pause'}/>
          <PlayerButton iconType='next'/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: color.primaryDarkBlue,
    },
    audioCount: {
        padding: 15,
        textAlign: 'right',
        color: color.primaryLightBlue,
        fontSize: 14,
    },
    midBannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    audioPlayerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    audioTitle: {
        fontSize: 16,
        color: color.primaryLightBlue,
        padding: 15,
    },
    audioControllers: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});