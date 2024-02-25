import { Text, View, StyleSheet, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';

export default class AudioListItem extends Component {
  render() {
    return (
        <>
        <View style = {styles.container}>
        {/* creting the left container */}
            <View style={styles.leftContainer}>
                <View style={styles.thumbnail}>
                    <Text style={styles.thumbnailText}>A</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.title}>hello world this is something new that we need to make the cganbgfe</Text>
                    <Text style={styles.timeText}> 03:59</Text>
                </View>
            </View>
            {/* creating the right container */}
            <View style={styles.rightContainer}>
                <Entypo name="dots-three-vertical" size={20} color={color.primaryLightBlue} />
            </View>
        </View>
        <View style={styles.seperator}/>
        </>
    )
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 80,
        backgroundColor: color.primaryDarkBlue,
        padding: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightContainer: {
        flexBasis: 50,
        height: 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    thumbnail: {
        height: 50,
        flexBasis: 50,
        backgroundColor: color.tertiaryDarkBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: color.secondaryLightBlue,
    },
    titleContainer: {
        width: width - 180,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        color: color.tertiaryLightBlue,
    },
    seperator: {
        width: width - 80,
        backgroundColor: color.secondaryLightBlue,
        opacity: 0.5,
        height: 0.7,
        alignSelf: 'center',
        marginTop: 8,
    },
    timeText: {
        color: color.primaryLimeGreen,
        fontSize: 14,
    },
});