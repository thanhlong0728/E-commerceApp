import React, { useEffect, useState } from 'react'
import {
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { formatPriceNumber } from '../../help'
import { RatingComponent, ProductHorizital, Comment, Quantify } from '../../components'
import styles from './styles'
import { ShowToast } from '../../help/showToast'
import { AddCart } from '../../store/slices/cart'
import Constants from './../../controller/Constant'
import ImgQrCode from './components/ImgQrCode'

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
            <ScrollView
                style={styles.container}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            >
                <ImgQrCode
                    value={product?.name}
                    dataQR={`{"app": "Spray", "id": "${product?.id}"}`}
                    isModalVisible={isModalVisible}
                    setModalVisible={(value) => setModalVisible(value)}
                />
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
                            <Text style={styles.oldPrice}>{formatPriceNumber(product?.price)}</Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>
                                {formatPriceNumber(product?.price_sale_off)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.view}>
                    <TouchableOpacity
                        onPress={onQrcode}
                        activeOpacity={0.8}
                        style={styles.buttonQr}
                    >
                        <Image source={Constants.icons.qrcode} style={styles.qrcodeImg} />
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
                        <Quantify
                            handleChangeNumber={(val) => handleChangeNumber(val)}
                            quantity={number}
                        />
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
                    <Text style={styles.addBuyPrice}>
                        {formatPriceNumber(number * product?.price_sale_off)}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ProductScreen
