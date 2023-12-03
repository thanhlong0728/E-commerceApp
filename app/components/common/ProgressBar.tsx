import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { ProgressBar } from 'react-native-paper'

const Progess = ({ loading, visible }) => (
    <View style={styles.container}>
        <ProgressBar visible={visible} style={styles.progess} progress={loading} color='white' />
    </View>
)

export default Progess

const styles = StyleSheet.create({
    container: {
        bottom: 60,
        left: 0
    },
    progess: {
        borderRadius: 20,
        marginHorizontal: 10
    }
})
