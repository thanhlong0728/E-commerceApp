import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

import Constant from '../../../controller/Constant'

const HeaderMini = ({ name }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                    <Ionicons name='arrow-back' size={24} color='white' />
                </TouchableOpacity>
                <View style={styles.bottom}>
                    <Text style={styles.textHeader}>{name}</Text>
                </View>
            </View>
        </View>
    )
}

export default HeaderMini

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height / 10,
        backgroundColor: Constant.COLORS.pink
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottom: {
        marginLeft: 20
    },
    textHeader: {
        fontSize: 22,
        color: 'white'
    },
    icon: {
        marginLeft: 10
    }
})
