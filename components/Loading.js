import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

import { COLORS } from '../contains'

const Loading = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color={COLORS.main} />
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
