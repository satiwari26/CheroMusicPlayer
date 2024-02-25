import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'

export default function PlayList() {
  return (
    <View style={styles.container}>
      <Text>PlayList</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});