import { Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * 
 * @param {*} filename 
 * @returns the first letter of the filename
 */
const getThumbnailText = (filename) => filename[0].toUpperCase();

/**
 * @brief
 * converts the time in more readable format for the users
 * @param {*} minutes 
 * @returns 
 */
const convertTime = minutes => {
    if (minutes) {
        const hrs = minutes / 60;
        const minute = hrs.toString().split('.')[0];
        const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
        const sec = Math.ceil((60 * percent) / 100);
        if (parseInt(minute) < 10 && sec < 10) {
            return `0${minute}:0${sec}`;
        }
        if (parseInt(minute) < 10) {
            return `0${minute}:${sec}`;
        }
        if (sec < 10) {
            return `${minute}:0${sec}`;
        }
        return `${minute}:${sec}`;
    }
    return '00:00';
}

const renderPlayPauseIcon = (isPlaying) => {
    if (isPlaying) {
        return(<MaterialIcons name="motion-photos-pause" size={45}/>);
    }

    return(<FontAwesome name="play-circle" size={45}/>);
}

/**
 * 
 * @param {*} {title, duration}
 * @returns redenders the file name and duration of the audio file
 */
export default function AudioListItem({title, duration, onPressOptions, onAudioPress, isPlaying, activeListItem}) {
    return (
        <>
        <View style = {styles.container}>
        {/* creting the left container */}
            <TouchableWithoutFeedback onPress={onAudioPress}>
                <View style={styles.leftContainer}>
                    <View style={styles.thumbnail}>
                        <Text style={styles.thumbnailText}>
                        {activeListItem ? renderPlayPauseIcon(isPlaying) : getThumbnailText(title)}
                        </Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.title}>{title}</Text>
                        <Text style={styles.timeText}>{convertTime(duration)}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {/* creating the right container */}
            <View style={styles.rightContainer}>
                <Entypo 
                onPress={onPressOptions}
                name="dots-three-vertical" 
                size={20} 
                color={color.primaryLightBlue}
                style={{padding: 10}} />
            </View>
        </View>
        {/* <View style={styles.seperator}/> */}
        </>
    )
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 40,
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