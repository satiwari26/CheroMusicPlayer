import { View, Text, Modal, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import color from '../misc/color';

export default function PlayListInputModal({visible, onClose, onSubmit}) {
  return (
    <Modal visible={visible} animationType='fade' transparent>
        <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[StyleSheet.absoluteFillObject, styles.modalBG]}/>
            </TouchableWithoutFeedback>
            <View style={styles.inputContainer}>
                <Text style={{color: color.tertiaryLightBlue, fontSize: 18, fontWeight: 'bold', paddingTop: 18}}>Enter the PlayList Name</Text>
                <TextInput style={styles.input}/>
                <Ionicons name="checkmark-done" size={28} color={color.secondaryLightBlue} style = {styles.submitIcon}
                onPress={onSubmit}
                />
            </View>
        </View>
    </Modal>
  )
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primaryDarkBlue + '80',
    },
    inputContainer: {
        width: width - 20,
        height: 200,
        backgroundColor: color.tertiaryDarkBlue,
        padding: 20,
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: width - 40,
        fontSize: 18,
        paddingVertical: 10,
        color: color.secondaryLightBlue,
        borderBottomWidth: 1,
        borderBottomColor: color.secondaryLightBlue,
        flex: 1,
    },
    submitIcon: {
        padding: 7,
        marginLeft: 10,
        backgroundColor: color.secondaryDarkBlue,
        borderRadius: 50,
        marginTop: 15,
    },
    modalBG: {
        backgroundColor: color.primaryDarkBlue + '80',
        zIndex: -1,
    },
});