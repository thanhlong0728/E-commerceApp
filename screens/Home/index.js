import React, {useEffect} from 'react'
import { View , ScrollView } from 'react-native'

import {  BoxSlider , Category , CategorySpecial} from '../../components'
import styles from './styles'
import {fetchCategories} from '../../store/slices/category'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductSpec,fetchProductIsNew } from '../../store/slices/products'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const dataCategories = useSelector(state => state.Categories.items)
    const dataProductSpec = useSelector(state => state.Product.itemsSpec)
    const dataProductIsNew = useSelector(state => state.Product.itemsIsNew)
    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchProductSpec())
        dispatch(fetchProductIsNew())
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <BoxSlider />
                <View style={styles.aside}>
                    <Category items={dataCategories} />
                    <CategorySpecial nameCategory={'Danh mục nổi bật'} items={dataProductSpec} />
                    <CategorySpecial nameCategory={'Danh mục sản phẩm mới'} items={dataProductIsNew}/>
                </View>
            </ScrollView> 
        </View>
       
    )
}

export default HomeScreen
