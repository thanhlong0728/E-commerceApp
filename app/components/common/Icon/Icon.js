import React from 'react'
import { View, StyleSheet } from 'react-native'

import Constant from '../../../controller/Constant'

const Icon = () => {
    return (
        <View style={styles.container}>
            <FontAwesome name='ios-home-outline' size={18} color={Constant.COLORS.icon} />
        </View>
    )
}

export default Icon

const styles = StyleSheet.create({
    container: {
        marginRight: 10
    }
})
