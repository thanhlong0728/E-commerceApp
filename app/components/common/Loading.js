import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

import Constant from '../../controller/Constant'

const Loading = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color={Constant.COLORS.main} />
    </View>
)
export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})
