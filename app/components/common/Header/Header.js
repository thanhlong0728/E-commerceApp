import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import IconHeader from '../../../componentssss/IconHeader'
import BoxSearch from './boxSearch'
import Constant from '../../../controller/Constant'

const Header = ({ icon, name }) => {
    let iconRight = 'cart'
    switch (icon) {
        case 'sort':
            iconRight = 'sort'
            break
        case 'delete':
            iconRight = 'delete'
            break
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <IconHeader />
                <Text style={styles.title}> {name}</Text>
                <IconHeader name={iconRight} />
            </View>
            <View style={styles.bottom}>
                <BoxSearch />
            </View>
        </View>
    )
}

export default Header

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
        color: Constant.COLORS.main
    },
    bottom: {
        flex: 1,
        paddingHorizontal: 25
    }
})
