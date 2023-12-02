import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import IconHeader from '../../common/Icon/IconHeader'
import BoxSearch from '../../Search/component/BoxSearch'
import Constant from '../../../controller/Constant'

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
        backgroundColor: Constant.COLORS.pink
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
        color: Constant.COLORS.main
    },
    bottom: {
        flex: 1,
        paddingHorizontal: 20
    },
    textMidle: {
        fontSize: 20,
        color: Constant.COLORS.white
    }
})
