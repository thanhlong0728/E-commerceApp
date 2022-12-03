import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import IconHeart from '../iconHeart'
import { formatPriceNumber } from '../../help'
import Quantify from '../quantify'
import { AddCart, RemoveCart } from '../../store/slices/cart'
import { fetchSingleProduct } from '../../store/slices/products'
import { useDispatch, useSelector } from 'react-redux'
import { ShowToast } from '../../help/showToast'
import { IMAGES, MESSAGE } from '../../contains'

const ProductList = ({ item, cart, check }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
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

    const handleChangeNumber = (val) => {
        console.log(val)
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
                        Giá tiền :{' '}
                        {cart
                            ? formatPriceNumber(number * item?.priceProduct)
                            : formatPriceNumber(item?.priceProduct)}
                    </Text>
                </View>
                {cart && (
                    <View style={styles.contentMore}>
                        <Quantify
                            quantity={number}
                            handleChangeNumber={(val) => handleChangeNumber(val)}
                            small
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default ProductList
