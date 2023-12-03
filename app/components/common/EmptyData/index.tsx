import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native'

import styles from './styles'
import Constant from '../../../controller/Constant'

const EmptyData = () => {
    return (
        <View style={styles.container}>
            <Image source={Constant.IMAGES.nodata} style={styles.img} />
        </View>
    )
}

export default EmptyData
