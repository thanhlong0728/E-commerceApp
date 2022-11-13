import React , { useState } from 'react'
import { View , Text  } from 'react-native'

import styles from './styles'
import { InputStyle , CheckCart } from '../../components'

const InfoCartScreen = () => {
    const [nickName, setNickName] = useState('')

    const goScreen = () => {
        console.log('1');
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
