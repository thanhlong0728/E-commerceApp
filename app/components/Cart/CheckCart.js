import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ProductList from '../Product/components/ProductList'
import ProgessBarShip from './components/ProgessBarShip'

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

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    titleShip: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop: 40
    }
})
