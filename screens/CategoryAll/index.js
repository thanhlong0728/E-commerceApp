import React,{ useEffect} from 'react'
import { View , FlatList } from 'react-native'

import {  BoxSlider , Product  } from '../../components'
import styles from './styles'
import {fetchProduct} from '../../store/slices/products'
import {useDispatch, useSelector} from 'react-redux'


const CategoryAllScreen = () => {
    const dataProduct = useSelector(state => state.Product.items)
    const itemsFillter = useSelector(state => state.Fillter.items)
    const dispatch = useDispatch()


    useEffect(() => {
        let min_price = itemsFillter.fromValue
        let max_price = itemsFillter.toValue
        let sortBy, order;
        switch (itemsFillter?.active) {
            case 'Giá giảm':
                sortBy = 'price'
                order = 'desc'
                break;
            case 'Giá tăng':
                sortBy = 'price'
                order = 'asc'
                break;
            case 'Mới nhất':
                sortBy = 'id'
                order = 'asc'
                break;
            case 'Cũ nhất':
                sortBy = 'id'
                order = 'desc'
                break;
            case 'Đang giảm giá':
                sortBy = 'price_sale_off'
                order = 'desc'
                break;
            default:
                break;
        }
        dispatch(fetchProduct({sortBy,order,min_price,max_price}))
    }, [itemsFillter])
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
                        data={dataProduct}
                        renderItem={showItems}
                        keyExtractor={(item) => item.name.toString()}
                        numColumns={2}
                        nestedScrollEnabled={true}
                        ListHeaderComponent={<BoxSlider />}
                    />
                </View>
            </View>
    )
    
}



export default CategoryAllScreen
