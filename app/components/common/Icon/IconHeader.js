import React from 'react'
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { RemoveFavorite } from '../store/slices/favorite'
import Constant from '../../../controller/Constant'

const IconHeader = ({ name = 'menu', product = false, right = true }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const favoriteData = useSelector((state) => state.Favorite.items)
    let icon = ''

    const openDrawer = () => {
        // navigation.openDrawer()
    }
    const openCart = () => {
        navigation.navigate('CartScreen')
    }

    const goBackHome = () => {
        navigation.goBack()
    }

    const goFillter = () => {
        navigation.navigate('FillterScreen')
    }

    const goDelete = () => {
        if (favoriteData.length !== 0) {
            Alert.alert('Thông báo !', 'Bạn có chắc chắn muốn xóa tất cả?', [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        dispatch(RemoveFavorite())
                    }
                }
            ])
        } else {
            alert('chưa có sản phẩm nào')
        }
    }

    switch (name) {
        case 'menu':
            icon = (
                <View onPress={openDrawer} style={styles.container}>
                    <Ionicons name='menu-outline' size={24} color={Constant.COLORS.main} />
                </View>
            )
            break
        case 'cart':
            icon = (
                <TouchableOpacity onPress={openCart} style={styles.cart}>
                    <Ionicons
                        name='cart-outline'
                        size={24}
                        color={product ? Constant.COLORS.white : Constant.COLORS.main}
                    />
                </TouchableOpacity>
            )
            break
        case 'back':
            icon = (
                <TouchableOpacity onPress={goBackHome} style={styles.container}>
                    <Ionicons
                        name='arrow-back'
                        size={24}
                        color={product ? Constant.COLORS.white : Constant.COLORS.main}
                    />
                </TouchableOpacity>
            )
            break
        case 'sort':
            icon = (
                <TouchableOpacity onPress={goFillter} style={styles.cart}>
                    <Ionicons name='funnel-outline' size={24} color={Constant.COLORS.main} />
                </TouchableOpacity>
            )
            break
        case 'delete':
            icon = (
                <TouchableOpacity onPress={goDelete} style={styles.cart}>
                    <Ionicons name='trash-bin-outline' size={24} color={Constant.COLORS.main} />
                </TouchableOpacity>
            )
            break

        default:
            break
    }

    return icon
}

export default IconHeader

const styles = StyleSheet.create({
    container: {
        marginLeft: 25
    },
    cart: {
        marginRight: 25
    }
})
