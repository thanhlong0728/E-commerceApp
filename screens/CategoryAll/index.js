import React, { useEffect, useState } from 'react'
import { View, FlatList, RefreshControl, ScrollView } from 'react-native'

import { BoxSlider, Product } from '../../components'
import styles from './styles'
import { fetchProduct } from '../../store/slices/products'
import { useDispatch, useSelector } from 'react-redux'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'

const CategoryAllScreen = () => {
    const dispatch = useDispatch()
    const itemsFillter = useSelector((state) => state.Fillter.items)
    const [allProductList, setAllProductList] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    const getAllProductList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('product')
        const snapshot = await ref.get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setAllProductList(list)
        RNProgressHud.dismiss()
    }

    const onRefreshing = () => {
        getAllProductList()
    }

    useEffect(() => {
        getAllProductList()
    }, [])

    useEffect(() => {
        let min_price = itemsFillter.fromValue
        let max_price = itemsFillter.toValue
        let sortBy, order
        switch (itemsFillter?.active) {
            case 'Giá giảm':
                sortBy = 'price'
                order = 'desc'
                break
            case 'Giá tăng':
                sortBy = 'price'
                order = 'asc'
                break
            case 'Mới nhất':
                sortBy = 'id'
                order = 'asc'
                break
            case 'Cũ nhất':
                sortBy = 'id'
                order = 'desc'
                break
            case 'Đang giảm giá':
                sortBy = 'price_sale_off'
                order = 'desc'
                break
            default:
                break
        }
        dispatch(fetchProduct({ sortBy, order, min_price, max_price }))
    }, [itemsFillter])
    const showItems = ({ item }) => {
        return <Product data={item} />
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshing} />}
            style={styles.container}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={allProductList}
                renderItem={showItems}
                keyExtractor={(item) => item.name.toString()}
                numColumns={2}
                nestedScrollEnabled={true}
                ListHeaderComponent={<BoxSlider />}
            />
        </ScrollView>
    )
}

export default CategoryAllScreen
