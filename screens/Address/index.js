import React , { useContext, useState } from 'react'
import { View , Text, TouchableOpacity  } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {AuthContext} from '../../navigation/AuthProvider'
import styles from './styles'
import { InputStyle } from '../../components'
import { useNavigation } from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import { addAddress } from '../../store/slices/address'
import { ShowToast } from '../../help/showToast'

const AddressScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')


    const changeCart = () => {
        dispatch(addAddress({ phone, address}))
        navigation.navigate('CartScreen')
        ShowToast('Thêm địa chỉ thành công')
    }


    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            style={styles.container}
        >
            <View style={styles.formInput}>
                <InputStyle name={'Số điện thoại'} value={phone} onChange={(value) => setPhone(value)} />
            </View>
            <View style={styles.formInput}>
                <InputStyle name={'Địa chỉ'} value={address} onChange={(value) => setAddress(value) } />
            </View>
            <TouchableOpacity style={styles.footterSubmit} onPress={changeCart} >
                    <Text style={styles.textFootterSubmit} >Xác nhận</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
)
}

export default AddressScreen
