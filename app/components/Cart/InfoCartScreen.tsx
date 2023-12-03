import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import InputStyle from '../common/InputStyle'
import CheckCart from './CheckCart'

const InfoCartScreen = () => {
    const [nickName, setNickName] = useState('')

    const goScreen = () => {
        console.log('1')
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxCode}>
                <InputStyle name={'Nhập mã đơn hàng của bạn'} value={nickName} onChange={(value) => setNickName(value)} />
            </View>
            <CheckCart />
        </View>
    )
}

export default InfoCartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 20
    },

    boxCode: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
