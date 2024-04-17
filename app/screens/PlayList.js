import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import color from '../misc/color';
import PlayListInputModal from '../components/PlayListInputModal.js';
import { AudioContext } from '../context/AudioProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlayList() {
  const [modalVisible, setModalVisible] = useState(false);

  const context = useContext(AudioContext);

  const {PlayList, addToPlayList, updateState} = context; 

  const createPLayList = async (playListName) => {
    const result = await AsyncStorage.getItem('playList');
      if(result !== null) {
        const audios = [];
        if(addToPlayList){
          audios.push(addToPlayList);
        }
        const newList = {
          id: Date.now(),
          title: playListName,
          audioFiles: audios,
        };

        const updatedList = [...PlayList, newList];
        updateState(context, {PlayList: updatedList, addToPlayList: null});
        await AsyncStorage.setItem('playList', JSON.stringify(updatedList));
      }

      setModalVisible(false);
    }

    const renderPlayList = async () => {
      const result = await AsyncStorage.getItem('playList');
      if(result === null) {
        const defaultPlayList = {
          id: Date.now(),
          title: 'My Favorite',
          audioFiles: [],
        };
        console.log(defaultPlayList);
        const newPlayList = [...PlayList,defaultPlayList];
        console.log(newPlayList);
        updateState(context, {PlayList: [...newPlayList]});
        return await AsyncStorage.setItem('playList', JSON.stringify(newPlayList));
      }

      updateState(context, {PlayList: JSON.parse(result)});
    }

    useEffect(() => {
      if(!PlayList.length){
        renderPlayList();
      }
    },[PlayList]);

    useEffect(() => {
      console.log(PlayList);
    }, [PlayList]);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {PlayList.length ? PlayList.map(playlist =>       
      <TouchableOpacity key={playlist.id.toString()} style={styles.playListBanner}>
        <Text style={styles.playListheaderstyle}>{playlist.title}</Text>
        <Text style = {styles.audioCount}>{playlist.audioFiles.length > 1 ? `${playlist.audioFiles.length} Songs` : `${playlist.audioFiles.length} Song`}</Text>
      </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress = {()=>{setModalVisible(true)}} style={styles.newPlayListBanner}>
        <Text style={styles.newPlayListText}>+ Add new playList</Text>
      </TouchableOpacity>

      <PlayListInputModal visible={modalVisible} onClose={()=>{setModalVisible(false)}} onSubmit={createPLayList}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: color.primaryDarkBlue,
      flex: 1,
    },
    playListBanner: {
      padding: 10,
      backgroundColor: color.primaryLightBlue,
      opacity: 0.4,
      borderRadius: 5,
      marginBottom: 20,
    },
    audioCount: {
      marginTop: 3,
      opacity: 0.8,
      color: color.primaryLimeGreen,
      fontSize: 14,
    },
    playListheaderstyle: {
      color: color.tertiaryLightBlue,
      fontSize: 18,
    },
    newPlayListBanner: {
      padding: 10,
      backgroundColor: color.primaryLightBlue,
      opacity: 0.4,
      borderRadius: 50,
      alignItems: 'center',
    },
    newPlayListText: {
      fontWeight: 'bold',
      color: color.primaryLimeGreen,
      fontSize: 13,
    }
});