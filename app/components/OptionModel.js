import { View, Text, Modal, StatusBar, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import color from '../misc/color';

export default function OptionModel({visible, onClose, currentItem, onPlayPress, onDetailsPress }) {
    const { filename } = currentItem;
  return (
    <>
        <StatusBar hidden = {true}/>
        <Modal animationType='slide' transparent={true} visible={visible}>
            <View style = {styles.modal}>
                <Text style={styles.title} numberOfLines={2}>{filename}</Text>
                <View style= {styles.optionContainer}>
                    <TouchableWithoutFeedback onPress={onPlayPress}>
                        <Text style={styles.option}>Play</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={onDetailsPress}>
                        <Text style={styles.option}>Details</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBG}/>
            </TouchableWithoutFeedback>
        </Modal>
    </>
  )
} 

const styles = {
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: color.primaryDarkBlue,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 100
    },
    title: {
        color: color.secondaryLightBlue,
        fontSize: 18,
        padding: 20,
        textAlign: 'center'
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    option: {
        color: color.primaryLightBlue,
        fontSize: 16
    },
    modalBG: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.ModalBG,
        zIndex: 99
    }
};