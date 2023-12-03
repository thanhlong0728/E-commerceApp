import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Constant from '../../../controller/Constant'

type Props = {
    handleChangeNumber: any
    quantity: number
    small: any
}

const Quantify = (props: Props) => {
    const { handleChangeNumber, quantity, small } = props
    const handleChange = (type) => {
        switch (type) {
            case 'add':
                handleChangeNumber(quantity + 1)
                break
            case 'minus':
                if (small && quantity - 1 === 0) {
                    handleChangeNumber(0)
                } else {
                    handleChangeNumber(quantity - 1 === 0 ? 1 : quantity - 1)
                }
                break

            default:
                break
        }
    }

    return (
        <>
            {!small ? (
                <View style={styles.quantity}>
                    <TouchableOpacity style={styles.quantity_button} onPress={() => handleChange('minus')}>
                        <Text style={styles.quantity_buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity_buttonText}>{quantity}</Text>
                    <TouchableOpacity style={styles.quantity_button} onPress={() => handleChange('add')}>
                        <Text style={styles.quantity_buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.quantity_small}>
                    <TouchableOpacity style={styles.quantity_button_small} onPress={() => handleChange('minus')}>
                        <Text style={styles.quantity_buttonText_small}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity_buttonText_small}>{quantity}</Text>
                    <TouchableOpacity style={styles.quantity_button_small} onPress={() => handleChange('add')}>
                        <Text style={styles.quantity_buttonText_small}>+</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

export default Quantify

const styles = StyleSheet.create({
    quantity: {
        flexDirection: 'row',
        width: 140,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quantity_button: {
        width: 50,
        height: 30,
        backgroundColor: Constant.COLORS.main,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantity_buttonText: {
        fontSize: 20
    },
    quantity_small: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quantity_button_small: {
        width: 35,
        height: 40,
        backgroundColor: Constant.COLORS.button,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantity_buttonText_small: {
        fontSize: 22
    }
})
