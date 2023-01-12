import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { Product } from '../components'
import { fetchProductInCategories } from '../../store/slices/category'
import { useDispatch, useSelector } from 'react-redux'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'

import { COLORS } from '../../contains'

const CategoryScreen = () => {
    const dispatch = useDispatch()
    const route = useRoute()
    const { id } = route.params

    const [items, setItems] = useState([])

    const getProductCategory = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('product')
        const snapshot = await ref.where('categoryID', '==', id).get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setItems(list)
        RNProgressHud.dismiss()
    }

    useEffect(() => {
        getProductCategory()
    }, [])

    // const itemsFillter = useSelector((state) => state.Fillter.items)
    // useEffect(() => {
    //     let min_price = itemsFillter.fromValue
    //     let max_price = itemsFillter.toValue
    //     let sortBy, order
    //     switch (itemsFillter?.active) {
    //         case 'Giá giảm':
    //             sortBy = 'price'
    //             order = 'desc'
    //             break
    //         case 'Giá tăng':
    //             sortBy = 'price'
    //             order = 'asc'
    //             break
    //         case 'Mới nhất':
    //             sortBy = 'id'
    //             order = 'asc'
    //             break
    //         case 'Cũ nhất':
    //             sortBy = 'id'
    //             order = 'desc'
    //             break
    //         case 'Đang giảm giá':
    //             sortBy = 'price_sale_off'
    //             order = 'desc'
    //             break
    //         default:
    //             break
    //     }
    //     dispatch(fetchProductInCategories({ id, sortBy, order, min_price, max_price }))
    // }, [itemsFillter])
    const showItems = ({ item }) => {
        return <Product data={item} />
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={items}
                renderItem={showItems}
                keyExtractor={(item) => item.name.toString()}
                numColumns={2}
            />
        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.background,
        paddingTop: 10
    },
    contentContainerStyle: {},
    aside: {
        flex: 2
    }
})
