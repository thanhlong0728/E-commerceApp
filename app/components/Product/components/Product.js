import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'

import IconHeart from './iconHeart'
import { Favorite } from '../../../store/slices/favorite'
import { AddCart } from '../../../store/slices/cart'
import { formatPriceNumber, SalePercent } from '../../../help'
import { IMAGES } from '../../../contains'
import { ShowToast } from '../../../help/showToast'
import Constant from '../../../controller/Constant'

const Product = ({ data, sale = true }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [heart, setHeart] = useState(false)

    const favoriteData = useSelector((state) => state.Favorite.items)

    useEffect(() => {
        favoriteData.indexOf(data.id) !== -1 ? setHeart(true) : setHeart(false)
    }, [favoriteData])

    const showProduct = () => {
        navigation.navigate('ProductScreen', {
            id: data?.id,
            categoryID: data?.categoryID
        })
    }

    const onHeart = () => {
        setHeart(!heart)
        dispatch(Favorite({ id: data?.id }))
    }
    const handleCart = () => {
        dispatch(
            AddCart({
                id: data?.id,
                photoProduct: data?.image,
                nameProduct: data?.name,
                priceProduct: data?.price_sale_off,
                description: data?.description
            })
        )
        ShowToast('Đã thêm sản phẩm vào giỏ hàng')
    }

    return (
        <TouchableOpacity onPress={showProduct} style={styles.container}>
            <View style={styles.product}>
                <View style={styles.boxImg}>
                    <Image style={styles.imgItem} source={{ uri: data.image }} />
                </View>
                <View style={styles.titleCategory}>
                    <Text numberOfLines={1} style={styles.name}>
                        {data.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.title}>
                        {data.summary}
                    </Text>
                    {sale && <Text style={styles.oldPrice}>{formatPriceNumber(data.price)}</Text>}
                    <Text style={styles.price}>{formatPriceNumber(data.price_sale_off)}</Text>
                </View>
                <View style={styles.iconLike}>
                    <TouchableOpacity onPress={onHeart}>
                        <IconHeart heart={heart} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.iconShoping} onPress={handleCart}>
                    <Ionicons name={'ios-cart'} size={24} color={'red'} />
                </TouchableOpacity>
                {sale && (
                    <View style={styles.sale}>
                        <Image style={styles.saleImg} source={IMAGES.sale} />
                        <Text style={styles.salePr}>
                            {SalePercent(data.price, data.price_sale_off)}
                        </Text>
                        <Text style={styles.saleOf}>GIẢM GIÁ</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default Product

const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 5,
        height: 250,
        marginBottom: 10
    },
    product: {
        backgroundColor: Constant.COLORS.second,
        width: '100%',
        height: '100%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        padding: 10
    },
    boxImg: {
        width: '100%',
        height: '65%',
        borderRadius: 10,
        alignItems: 'center'
    },
    imgItem: {
        width: '60%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'contain'
    },
    titleCategory: {
        height: '35%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        marginTop: 5
    },
    iconLike: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    iconShoping: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        bottom: 0,
        right: 0
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: '#8B8080'
    },
    price: {
        color: Constant.COLORS.red
    },
    sale: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 45,
        height: 55,
        alignItems: 'center'
    },
    saleImg: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    salePr: {
        fontSize: 12,
        color: Constant.COLORS.red,
        marginTop: 2
    },
    saleOf: {
        fontSize: 8,
        color: Constant.COLORS.red,
        marginTop: 2
    }
})
