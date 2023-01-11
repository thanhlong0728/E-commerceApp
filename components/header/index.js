import React from 'react'
import { View, Text } from 'react-native'
import IconHeader from '../iconHeader'
import BoxSearch from '../boxSearch'

import styles from './styles'

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
