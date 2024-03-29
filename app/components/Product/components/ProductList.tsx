import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, LogBox } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Quantify from './Quantify'
import { AddCart, RemoveCart } from '../../../redux/slices/cart'
import { ShowToast } from '../../common/ShowToast'
import Constant from '../../../controller/Constant'
import Util from '../../../controller/Util'
import { ProductItem } from 'types/Product'

type Props = {
    item?: ProductItem
    cart?: Boolean
    check?: Boolean
}

const ProductList = (props: Props) => {
    const { item, cart, check } = props

    const dispatch = useDispatch()
    const navigation = useNavigation<any>()
    const [heart, setHeart] = useState(false)
    const [number, setNumber] = useState(item?.sum || 1)
    const [data, setData] = useState({})
    // const [loading, setloading] = useState(true)

    useEffect(() => {
        // // setloading(true)
        // dispatch(fetchSingleProduct({ id: item?.id, name: 'product' })).then((res) => {
        //     if (!res.error) {
        //         setData(res.payload)
        //         // setloading(false)
        // if (!check) {
        dispatch(
            AddCart({
                id: item?.id,
                total: number * item.priceProduct,
                update: true,
                sumUpdate: item?.sum
            })
        )
        // }
        // }
    }, [])

    const showProduct = () => {
        navigation.navigate('ProductScreen', {
            id: item?.id
        })
    }

    const handleChangeNumber = (val: number) => {
        val === 0
            ? dispatch(RemoveCart({ id: item?.id }))
            : dispatch(
                  AddCart({
                      id: item?.id,
                      update: true,
                      sumUpdate: val,
                      total: val * item.priceProduct
                  })
              )
        setNumber(val)
        ShowToast('Cập nhật giỏ hàng thành công')
    }

    // if (loading) {
    //     return <></>
    // }

    return (
        <TouchableOpacity onPress={showProduct} style={styles.container}>
            <View style={styles.imgBox}>
                <View style={styles.iconLike}></View>
                <Image style={styles.img} source={{ uri: item.photoProduct }} />
            </View>

            <View style={styles.content}>
                <View style={styles.contentInfo}>
                    <Text numberOfLines={1} style={styles.contentName}>
                        {item.nameProduct}
                    </Text>
                    <Text numberOfLines={1}>{item.description}</Text>
                    {!cart && <Text numberOfLines={1}>Số lượng : {number}</Text>}
                    <Text numberOfLines={1} style={styles.contentPrice}>
                        Giá tiền : {cart ? Util.formatPriceNumber(number * item?.priceProduct) : Util.formatPriceNumber(item?.priceProduct)}
                    </Text>
                </View>
                {cart && (
                    <View style={styles.contentMore}>
                        <Quantify quantity={number} handleChangeNumber={(val) => handleChangeNumber(val)} small />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default ProductList

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        marginTop: 15
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    imgBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: Constant.COLORS.second,
        shadowColor: Constant.COLORS.main,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginHorizontal: 20,
        borderRadius: 15
    },
    content: {
        flex: 4,
        flexDirection: 'row'
    },
    contentName: {
        fontSize: 20
    },
    contentPrice: {
        color: Constant.COLORS.red
    },
    iconLike: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: Constant.COLORS.background,
        borderRadius: 8
    },
    contentInfo: {
        flex: 1.5,
        justifyContent: 'space-evenly'
    },
    contentMore: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 6
    },
    quantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quantity_button: {
        width: 35,
        height: 40,
        backgroundColor: Constant.COLORS.button,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantity_buttonText: {
        fontSize: 22
    }
})
