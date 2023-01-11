import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { COLORS } from '../contains'
import IconHeader from './IconHeader'
import BoxSearch from './boxSearch'

const HeaderScreen = ({ product = false, right = true, name = false }) => {
    let iconRight = product ? 'cart' : 'sort'
    let middle = name ? <Text style={styles.textMidle}>{name}</Text> : <BoxSearch />

    return (
        <View style={[styles.container, product && styles.background]}>
            <View style={styles.top}>
                <IconHeader name={'back'} product={product} right={right} />
                <View style={styles.bottom}>{middle}</View>
                {right && <IconHeader name={iconRight} product />}
            </View>
        </View>
    )
}

export default HeaderScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100
    },
    background: {
        backgroundColor: COLORS.pink
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 35
    },
    title: {
        fontSize: 30,
        color: COLORS.main
    },
    bottom: {
        flex: 1,
        paddingHorizontal: 20
    },
    textMidle: {
        fontSize: 20,
        color: COLORS.white
    }
})
