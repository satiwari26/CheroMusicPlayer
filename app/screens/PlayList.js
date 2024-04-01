import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import color from '../misc/color';
import PlayListInputModal from '../components/PlayListInputModal.js';

export default function PlayList() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.playListBanner}>
        <Text style={styles.playListheaderstyle}>My Favorite</Text>
        <Text style = {styles.audioCount}>0 Songs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress = {()=>{setModalVisible(true)}} style={styles.newPlayListBanner}>
        <Text style={styles.newPlayListText}>+ Add new playList</Text>
      </TouchableOpacity>

      <PlayListInputModal visible={modalVisible} onClose={()=>{setModalVisible(false)}} onSubmit={()=>console.log("playList name entered.")}/>
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