import React, { useEffect, useState } from 'react'
import { View , FlatList } from 'react-native'
import {  Product  } from '../../components'
import {useDispatch, useSelector} from 'react-redux'

import styles from './styles'

const FavoriteScreen = () => {
    const product = useSelector(state => state.Product.items)
    const favoriteData = useSelector(state => state.Favorite.items)
    const [items, setItems] = useState([])
    useEffect(() => {
        let itemsFavorite = product.filter(item => favoriteData.indexOf(item.id) !== -1)
        setItems(itemsFavorite)
    }, [favoriteData])
    const showItems = ({item}) => {
        return (
            <Product data={item} />
        )
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
