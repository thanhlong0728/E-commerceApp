import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

import IconHeader from '../Icon/IconHeader'
import BoxSearch from '../../Search/component/BoxSearch'
import Constant from '../../../controller/Constant'

const HeaderNameScreen = ({ product = false }) => {
    const route: any = useRoute()
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <IconHeader name={'back'} />
                <Text numberOfLines={1} style={styles.title}>
                    {route.params.name}
                </Text>
                <IconHeader name={'sort'} />
            </View>
            <View style={styles.bottom}>
                <BoxSearch />
            </View>
        </View>
    )
}

export default HeaderNameScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25
    },
    title: {
        fontSize: 30,
        color: Constant.COLORS.main,
        width: '60%'
    },
    bottom: {
        flex: 1,
        paddingHorizontal: 25
    }
})
