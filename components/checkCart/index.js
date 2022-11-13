import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import ProductList from '../productList'

import ProgessBarShip from '../progessBarShip'

const CheckCart = () => {
    return (
        <View style={styles.container}>
           <View style={styles.yourCart}>
                <Text style={styles.title}>Đơn hàng của bạn</Text>
                <ProductList />
           </View>
           <View style={styles.yourShip}>
               <Text style={styles.titleShip}>Tình trạng đơn hàng</Text>
               <ProgessBarShip />
           </View>
        </View>
    )
}

export default CheckCart
