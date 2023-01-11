import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { Product } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'

import styles from './styles'

const FavoriteScreen = () => {
    const favoriteData = useSelector((state) => state.Favorite.items)
    const [items, setItems] = useState([])
    const [productList, setProductList] = useState([])

    const getProductList = async () => {
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
        setProductList(list)
        RNProgressHud.dismiss()
    }

    useEffect(() => {
        getProductList()
    }, [])

    useEffect(() => {
        try {
            RNProgressHud.show()
            let itemsFavorite = productList.filter((item) => favoriteData.indexOf(item.id) !== -1)
            setItems(itemsFavorite)
            RNProgressHud.dismiss()
        } catch (err) {
            console.log(err)
            RNProgressHud.dismiss()
        }
    }, [favoriteData])

    const showItems = ({ item }) => {
        return <Product data={item} />
    }

    return (
        <View style={styles.container}>
            <View style={styles.aside}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={items}
                    renderItem={showItems}
                    keyExtractor={(item) => item.name.toString()}
                    numColumns={2}
                />
            </View>
        </View>
    )
}

export default FavoriteScreen
