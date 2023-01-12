import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect, useContext } from 'react'
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    LogBox,
    Alert,
    StyleSheet,
    Dimensions
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import RNProgressHud from 'progress-hud'

import { EmptyData } from '../common'
import IconRight from 'react-native-vector-icons/AntDesign'
import { ProductList } from '../components'
import { formatPriceNumber } from '../app/help'
import { orderModel } from '../../model'
import { ShowToast } from '../app/help/showToast'
import { AuthContext } from '../../navigation/AuthProvider'
import { RemoveAll } from '../../store/slices/cart'
import { COLORS } from '../../contains'

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

const CartScreen = () => {
    const dispatch = useDispatch()
    const { uid } = auth().currentUser
    const navigation = useNavigation()
    const cartItems = useSelector((state) => state.Cart.cart)
    // console.log('cartItems:alalal', cartItems)
    const createdAt = new Date()
    const cartID = uid.toString() + createdAt.toString()
    const [total, setTotal] = useState(0)

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
        let totalCurrent = 0
        cartItems.map((item) => {
            totalCurrent += item?.total
        })
        setTotal(totalCurrent)
    }, [cartItems])

    const handleRender = ({ item }) => {
        return <ProductList item={item} cart />
    }
    const changeAddress = () => {
        navigation.navigate('ProfileEditScreen')
    }
    const handleBuy = () => {
        if (phone == '' || address == '') {
            navigation.navigate('ProfileEditScreen')
            alert('Vui lòng nhập địa chỉ')
        } else {
            Alert.alert('Thông báo', 'Bạn có chắc chắn muốn đặt đơn hàng？', [
                {
                    text: 'No'
                },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => {
                        orderModel
                            .addOrder({
                                uid,
                                cartID,
                                phone,
                                address,
                                createdAt,
                                total,
                                cartItems
                            })
                            .then(() => {
                                navigation.navigate('HomeScreen')
                                dispatch(RemoveAll())
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
            ])
        }
    }

    const getProfile = async () => {
        RNProgressHud.show()
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get()
            .then((data) => {
                setUserName(data?.data()?.userName)
                setPhone(data?.data()?.phone)
                setAddress(data?.data()?.address)
            })
            .catch((error) => {
                console.log('Error getting documents: ', error)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getProfile()
        })
    }, [])

    return (
        <>
            <View style={styles.boxAddress}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back' size={24} color='white' style={styles.iconBack} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentAddress} onPress={changeAddress}>
                    {phone == '' || address == '' ? (
                        <Text style={styles.textAddress}>Vui lòng nhập địa chỉ</Text>
                    ) : (
                        <Text numberOfLines={3} style={styles.textAddress}>
                            Tên: {userName}, Số điện thoại: {phone}, Địa chỉ: {address}
                        </Text>
                    )}
                </TouchableOpacity>
                <View>
                    <IconRight name='right' size={20} color='white' />
                </View>
            </View>
            <ScrollView style={styles.container}>
                {cartItems.length == 0 ? (
                    <Text style={styles.textEmpty}>Chưa có sản phẩm trong giỏ hàng</Text>
                ) : (
                    <FlatList
                        data={cartItems}
                        renderItem={handleRender}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </ScrollView>
            <View style={styles.apply}>
                <View style={styles.sum}>
                    <Text style={styles.contentPrice}>Tổng đơn hàng: </Text>
                    <Text numberOfLines={1} style={styles.contentPrice}>
                        {formatPriceNumber(total)}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleBuy} style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Xác nhận đơn hàng</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default CartScreen

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 10
    },
    boxAddress: {
        backgroundColor: COLORS.main,
        flexDirection: 'row',
        width: width,
        alignItems: 'center',
        height: 90,
        justifyContent: 'space-between'
    },

    textAddress: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    contentAddress: {
        justifyContent: 'center',
        width: width / 1.3,
        alignItems: 'center'
    },
    apply: {
        alignItems: 'center'
    },
    applyButton: {
        width: '90%',
        backgroundColor: COLORS.main,
        justifyContent: 'center',
        alignItems: 'center',
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
    sum: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 20,
        paddingBottom: 10
    },
    contentPrice: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textEmpty: {
        fontSize: 20
    }
})
