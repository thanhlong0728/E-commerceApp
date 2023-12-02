import { useRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HighlightText from '@sanar/react-native-highlight-text'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'

import Loading from '../common/Loading'
import Product from '../Product/components/Product'
import { EmptyData } from '../common/EmptyData'

const InfoCartScreen = () => {
    const route = useRoute()
    const { search } = route.params
    const dispatch = useDispatch()
    const [items, setItems] = useState({})

    const getAllProductList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('product')
        const snapshot = await ref
            .orderBy('name')
            .startAt(search)
            .endAt(search + '\uf8ff')
            .get()
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
        getAllProductList()
    }, [search])

    const highlightName = (string) => {
        return <HighlightText highlightStyle={{ backgroundColor: 'yellow' }} searchWords={[search]} textToHighlight={string} />
    }

    const showItems = ({ item }) => {
        let product = {
            ...item,
            name: highlightName(item.name)
        }
        return <Product data={product} />
    }

    return (
        <>
            {items.length > 0 ? (
                <View style={styles.container}>
                    <View style={styles.aside}>
                        <FlatList showsVerticalScrollIndicator={false} data={items} renderItem={showItems} keyExtractor={(item) => item.name.toString()} numColumns={2} />
                    </View>
                </View>
            ) : (
                <EmptyData />
            )}
        </>
    )
}

export default InfoCartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 20
    },

    boxCode: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
