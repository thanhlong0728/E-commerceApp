import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

import { BoxSlider, Category, CategorySpecial } from '../../components'
import styles from './styles'
import { fetchProductSpec, fetchProductIsNew } from '../../store/slices/products'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const [categoryList, setCategoryList] = useState([])
    const [productSpecList, setProductSpecList] = useState([])
    const [productIsNewList, setProductIsNewList] = useState([])
    // console.log('productSpecList::', productSpecList)
    // console.log('productIsNewList:::', productIsNewList)

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

    useEffect(() => {
        getCategoryList()
        getProductSpecList()
        getProductIsNewList()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <BoxSlider />
                <View style={styles.aside}>
                    <Category items={categoryList} />
                    <CategorySpecial nameCategory={'Danh mục nổi bật'} items={productSpecList} />
                    <CategorySpecial
                        nameCategory={'Danh mục sản phẩm mới'}
                        items={productIsNewList}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen
