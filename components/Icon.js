import React from 'react'
import { View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '../contains'

const Icon = () => {
    return (
        <View style={styles.container}>
            <FontAwesome name='ios-home-outline' size={18} color={COLORS.icon} />
        </View>
    )
}

export default Icon

const styles = StyleSheet.create({
    container: {
        marginRight: 10
    }
})
