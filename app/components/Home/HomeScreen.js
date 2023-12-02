import React, { useEffect, useState } from 'react'
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

import BoxSlider from '../../components/common/Header/components/BoxSlider'
import Category from './Components/Category'
import CategorySpecial from './Components/CategorySpecial'
import Constant from '../../controller/Constant'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const [categoryList, setCategoryList] = useState([])
    const [productSpecList, setProductSpecList] = useState([])
    const [productIsNewList, setProductIsNewList] = useState([])

    const [isRefreshing, setIsRefreshing] = useState(false)

    const getCategoryList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('category')
        const snapshot = await ref.get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setCategoryList(list)
        RNProgressHud.dismiss()
    }

    const getProductSpecList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('product')
        const snapshot = await ref.where('is_new', '==', true).get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setProductSpecList(list)
        RNProgressHud.dismiss()
    }

    const getProductIsNewList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('product')
        const snapshot = await ref.where('special', '==', true).get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setProductIsNewList(list)
        RNProgressHud.dismiss()
    }

    const onRefreshing = () => {
        getCategoryList()
        getProductSpecList()
        getProductIsNewList()
    }

    useEffect(() => {
        getCategoryList()
        getProductSpecList()
        getProductIsNewList()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshing} />}>
                <BoxSlider />
                <View style={styles.aside}>
                    <Category items={categoryList} />
                    <CategorySpecial nameCategory={'Danh mục nổi bật'} items={productSpecList} />
                    <CategorySpecial nameCategory={'Danh mục sản phẩm mới'} items={productIsNewList} />
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Constant.COLORS.background,
        paddingTop: 10
    },
    aside: {
        flex: 2
    }
})
