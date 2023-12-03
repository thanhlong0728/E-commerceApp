import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import Constant from '../../../controller/Constant'

type Props = {
    title: string
    onPress: (value: string) => void
    active: string
}

const ButtonFillter = (props: Props) => {
    const { title, onPress, active } = props
    const choseButton = () => {
        onPress(title)
    }

    return (
        <TouchableOpacity onPress={choseButton} style={[styles.button, active === title && styles.active]}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonFillter

const styles = StyleSheet.create({
    button: {
        backgroundColor: Constant.COLORS.second,
        padding: 20,
        borderRadius: 10,
        shadowColor: Constant.COLORS.main,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    active: {
        backgroundColor: Constant.COLORS.red
    }
})
