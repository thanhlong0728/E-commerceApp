import { useNavigation } from '@react-navigation/native'
import React,{useState, useEffect, useContext} from 'react'
import { ScrollView, View , Text ,  TouchableOpacity, FlatList,LogBox  } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EmptyData } from '../../common'
import IconRight from 'react-native-vector-icons/AntDesign';
import {  ProductList  } from '../../components'
import styles from './styles'
import {FormatPrice} from '../../help'
import { orderModel }  from '../../model'
import { ShowToast } from '../../help/showToast';
import {AuthContext} from '../../navigation/AuthProvider'
import {RemoveAll} from '../../store/slices/cart'

const CartScreen = () => {
    const dispatch = useDispatch()
    const {user} = useContext(AuthContext)
    const {uid, displayName} = user
    const name = displayName
    const navigation = useNavigation()
    const cartItems = useSelector(state => state.Cart.cart)
    const createdAt = new Date()
    const cartID = uid.toString() + createdAt.toString()
    const [total, setTotal] = useState(0)   
    const dataAddress = useSelector(state => state.Address.items)
    const { phone, address} = dataAddress
    useEffect(() => {
        let totalCurrent = 0;
        cartItems.map(item => {
            totalCurrent += item.total
        })
        setTotal(totalCurrent)
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [cartItems])
    
    
    const handleRender = ({item}) =>{
        return <ProductList item={item} cart />
    }
    const changeAddress = () =>{
        navigation.navigate('AddressScreen')
    }
    const handleBuy = () => {
        if(dataAddress.length == 0){
            navigation.navigate('AddressScreen')
            ShowToast('Vui lòng nhập địa chỉ')
        }else{
            orderModel.addOrder({uid,cartID, phone, address,createdAt, total, cartItems})
            navigation.navigate('HomeScreen')
            dispatch(RemoveAll())
            
        }
    }


    return (
        <>
            <View style={styles.boxAddress}>
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color='white' style={styles.iconBack} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentAddress} onPress={changeAddress}>
                        {
                            dataAddress.length == 0 ? (
                                <Text style={styles.textAddress}>Vui lòng nhập địa chỉ</Text>
                            ) : (
                                <Text style={styles.textAddress}>Tên: {name}, Số điện thoại: {phone}, Địa chỉ: {address}</Text>
                            )
                        }
                        
                </TouchableOpacity>
                <View>
                    <IconRight name="right" size={20} color='white' />
                </View>
            </View>
            <ScrollView style={styles.container}>
                {
                    cartItems.length == 0 ? (
                        <Text style={styles.textEmpty}>Chưa có sản phẩm trong giỏ hàng</Text>
                    ) : (
                        <FlatList
                        data={cartItems}
                        renderItem={handleRender}
                        keyExtractor={(item) => item.id.toString()}
                        />
                    )
                }
               
            </ScrollView >
            <View style={styles.apply}>
                <View style={styles.sum}>
                    <Text style={styles.contentPrice}>Tổng đơn hàng: </Text>
                    <Text numberOfLines={1} style={styles.contentPrice}>{FormatPrice(total)}</Text>
                </View>
                <TouchableOpacity onPress={handleBuy} style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Xác nhận đơn hàng</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default CartScreen
