import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import { COLORS } from '../contains'

const ButtonFillter = ({ title, onPress, active }) => {
    const choseButton = () => {
        onPress(title)
    }

    return (
        <TouchableOpacity
            onPress={choseButton}
            style={[styles.button, active === title && styles.active]}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonFillter

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.second,
        padding: 20,
        borderRadius: 10,
        shadowColor: COLORS.main,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    active: {
        backgroundColor: COLORS.red
    }
})
