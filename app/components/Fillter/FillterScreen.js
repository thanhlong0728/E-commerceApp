import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import RangeSlider from 'react-native-range-slider'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { COLORS } from '../../contains'
import { FormatPrice } from '../app/help'
import { Fillter } from '../../store/slices/fillter'
import { ButtonFillter } from '../components'

const FillterScreen = () => {
    const navigation = useNavigation()
    const items = useSelector((state) => state.Fillter.items)
    const [fromValue, setFromValue] = useState(items.fromValue)
    const [toValue, setToValue] = useState(items.toValue)
    const [active, setActive] = useState(items.active)
    const dispatch = useDispatch()

    const activeButton = (title) => {
        setActive(title)
    }
    const apply = () => {
        dispatch(Fillter({ active, fromValue, toValue }))
        navigation.goBack()
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.fill}>
                    <Text style={styles.fillTitle}>Lọc theo sản phẩm</Text>
                    <View style={styles.fillProduct}>
                        <View style={styles.fillProductCol}>
                            <ButtonFillter
                                active={active}
                                onPress={activeButton}
                                title={'Mới nhất'}
                            />
                            <ButtonFillter
                                active={active}
                                onPress={activeButton}
                                title={'Giá giảm'}
                            />
                            <ButtonFillter
                                active={active}
                                onPress={activeButton}
                                title={'Giá tăng'}
                            />
                        </View>
                        <View style={styles.fillProductCol}>
                            <ButtonFillter
                                active={active}
                                onPress={activeButton}
                                title={'Cũ nhất'}
                            />
                            <ButtonFillter
                                active={active}
                                onPress={activeButton}
                                title={'Đang giảm giá'}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.categoryPrice}>
                    <Text style={styles.fillTitle}>Lọc theo giá</Text>
                    <View>
                        <RangeSlider
                            min={0}
                            max={50000000}
                            fromValueOnChange={(value) => setFromValue(value)}
                            toValueOnChange={(value) => setToValue(value)}
                            initialFromValue={fromValue}
                            initialToValue={toValue}
                        />
                        <View style={styles.viewPrice}>
                            <Text style={styles.price}>
                                Giá từ : {formatPriceNumber(fromValue)}
                            </Text>
                            <Text style={styles.price}>Giá đến : {formatPriceNumber(toValue)}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.apply}>
                <TouchableOpacity onPress={apply} style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Áp dụng</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default FillterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20
    },
    fill: {
        marginBottom: 20
    },
    fillTitle: {
        fontSize: 22,
        marginBottom: 30
    },
    fillProductCol: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    categoryPrice: {
        marginBottom: 20
    },
    apply: {
        alignItems: 'center',
        marginBottom: 20
    },
    applyButton: {
        backgroundColor: COLORS.main,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 120,
        paddingVertical: 20,
        borderRadius: 15,
        marginBottom: 10
    },
    applyButtonText: {
        color: COLORS.white,
        fontSize: 20
    },
    viewPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    price: {
        color: COLORS.button,
        fontSize: 16
    }
})
