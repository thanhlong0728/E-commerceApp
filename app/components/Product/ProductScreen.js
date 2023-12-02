import React, { useEffect, useState } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity, FlatList, RefreshControl, StyleSheet } from 'react-native'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import RatingComponent from '../Home/Components/Rating'
import ProductHorizital from '../Product/components/ProductHorizital'
import Comment from '../Product/components/Comment'
import Quantify from '../Product/components/Quantify'
import { ShowToast } from '../common/ShowToast'
import { AddCart } from '../../redux/slices/cart'
import ImgQrCode from './components/ImgQrCode'
import Util from '../../controller/Util'
import Constant from '../../controller/Constant'

const ProductScreen = () => {
    const route = useRoute()
    const dispatch = useDispatch()
    const [number, setNumber] = useState(1)
    const { id, categoryID } = route.params

    const [productArray, setProductArray] = useState([])
    const product = Object.assign({}, ...productArray)
    const [productInCategoryList, setProductInCategoryList] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)

    const getProduct = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('product')
        const snapshot = await ref.where('id', '==', id).get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setProductArray(list)
        RNProgressHud.dismiss()
    }

    const getProductInCategoryList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('product')
        const snapshot = await ref.where('categoryID', '==', categoryID).get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setProductInCategoryList(list)
        RNProgressHud.dismiss()
    }

    useEffect(() => {
        getProduct()
        getProductInCategoryList()
    }, [id])

    const showItems = ({ item }) => {
        return <ProductHorizital data={item} />
    }
    const handleChangeNumber = (val) => {
        setNumber(val)
    }
    const handleAddCart = () => {
        dispatch(
            AddCart({
                sum: number,
                id,
                photoProduct: product.image,
                nameProduct: product.name,
                priceProduct: product.price_sale_off,
                description: product?.description
            })
        )
        setNumber(1)
        ShowToast('Thêm vào giỏ hàng thành công')
    }

    const onRefresh = () => {
        getProduct()
        getProductInCategoryList()
    }

    const onQrcode = () => {
        setModalVisible(true)
    }

    console.log(productInCategoryList)

    return (
        <>
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                <ImgQrCode value={product?.name} dataQR={`{"app": "Spray", "id": "${product?.id}"}`} isModalVisible={isModalVisible} setModalVisible={(value) => setModalVisible(value)} />
                <View style={styles.product}>
                    <View style={styles.productImg}>
                        <Image style={styles.img} source={{ uri: product?.image }} />
                    </View>
                    <View style={styles.productContent}>
                        <View>
                            <Text numberOfLines={2} style={styles.name}>
                                {product?.name}
                            </Text>
                        </View>
                        <View>
                            <RatingComponent product={true} />
                        </View>
                        <View>
                            <Text style={styles.oldPrice}>{Util.formatPriceNumber(product?.price)}</Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>{Util.formatPriceNumber(product?.price_sale_off)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.view}>
                    <TouchableOpacity onPress={onQrcode} activeOpacity={0.8} style={styles.buttonQr}>
                        <Image source={Constant.icons.qrcode} style={styles.qrcodeImg} />
                        <View>
                            <Text style={styles.textQr}>QR Code</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.view_main}>
                        <Text style={styles.title}> Thông tin sản phẩm </Text>
                        <Text style={styles.title_source}>{`${product?.description}`}</Text>
                    </View>

                    <View style={styles.view_main}>
                        <Text style={styles.title}> Số lượng </Text>
                        <Quantify handleChangeNumber={(val) => handleChangeNumber(val)} quantity={number} />
                    </View>
                    {productInCategoryList.length === 0 ? (
                        <View></View>
                    ) : (
                        <View style={styles.view_main}>
                            <Text style={styles.title}> Sản phẩm liên quan </Text>
                            <View style={styles.boxProduct}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={productInCategoryList}
                                    renderItem={showItems}
                                    keyExtractor={(item) => item.name.toString()}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>
                    )}

                    <View style={styles.view_main}>
                        <Comment productId={id} productImg={product?.image} />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.add}>
                <Text style={styles.addItem}>{number} item</Text>
                <TouchableOpacity style={styles.addBuy} onPress={handleAddCart}>
                    <Text style={styles.addBuyText}>Thêm vào giỏ hàng</Text>
                    <Text style={styles.addBuyPrice}>{Util.formatPriceNumber(number * product?.price_sale_off)}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.COLORS.pink,
        marginBottom: 60
    },
    product: {
        height: 200,
        width: '100%',
        flexDirection: 'row',
        zIndex: 1
    },
    view: {
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        flex: 1,
        backgroundColor: Constant.COLORS.white,
        paddingTop: 50,
        paddingHorizontal: 20
    },
    productImg: {
        width: '50%',
        height: '120%'
    },
    productContent: {
        height: '120%',
        width: '50%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Constant.COLORS.white
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: Constant.COLORS.white,
        fontSize: 16
    },
    price: {
        width: 180,
        height: 45,
        backgroundColor: Constant.COLORS.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    priceText: {
        color: Constant.COLORS.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    view_main: {
        marginBottom: 40
    },
    boxProduct: {
        height: 280
    },
    quantity: {
        flexDirection: 'row',
        width: 140,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quantity_button: {
        width: 50,
        height: 30,
        backgroundColor: Constant.COLORS.main,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantity_buttonText: {
        fontSize: 20
    },
    add: {
        width: '100%',
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#979797'
    },
    addItem: {
        color: Constant.COLORS.white,
        fontSize: 20
    },
    addBuy: {
        padding: 10,
        backgroundColor: '#B23F56',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addBuyText: {
        color: Constant.COLORS.white,
        fontSize: 16,
        marginBottom: 10
    },
    addBuyPrice: {
        fontSize: 20,
        color: Constant.COLORS.white,
        fontWeight: 'bold'
    },
    buttonQr: {
        height: 46,
        flex: 1,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#CCCCE3',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 30
    },
    qrcodeImg: {
        width: 23,
        height: 23,
        marginRight: 8,
        resizeMode: 'contain'
    },
    textOnQr: {
        fontSize: 10,
        color: 'black'
    },
    textQr: {
        fontSize: 24,
        color: 'black',
        includeFontPadding: false,
        marginTop: -4
    }
})
