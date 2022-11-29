import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ProductList, InputStyle } from '../../components'
import { formatPriceNumber } from '../../help'

import styles from './styles'

const BuyScreen = () => {
    return (
        <>
            <ScrollView>
                <View style={styles.product}>
                    <ProductList />
                    <ProductList />
                    <ProductList />
                    <View style={styles.sum}>
                        <Text>Tổng đơn hàng</Text>
                        <Text numberOfLines={1} style={styles.contentPrice}>
                            {formatPriceNumber(4000000)}
                        </Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <InputStyle name={'Mã giảm giá (nếu có)'} />
                    <Text style={styles.salePrice}>
                        Bạn đã được giảm : {formatPriceNumber(4000000)}
                    </Text>
                </View>
                <View style={styles.form}>
                    <InputStyle name={'Phí vận chuyển'} />
                    <Text style={styles.salePrice}>
                        Bạn đã được giảm : {formatPriceNumber(4000000)}
                    </Text>
                </View>
                <View style={styles.sumALl}>
                    <Text>Tổng Thanh toán</Text>
                    <Text numberOfLines={1} style={styles.contentPrice}>
                        {formatPriceNumber(4000000)}
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.apply}>
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Mua hàng</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default BuyScreen
