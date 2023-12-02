import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import InputStyle from '../common/InputStyle'
import { addAddress } from '../../redux/slices/address'
import { ShowToast } from '../common/ShowToast'
import Constant from '../../controller/Constant'

const AddressScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const changeCart = () => {
        dispatch(addAddress({ phone, address }))
        navigation.navigate('CartScreen')
        ShowToast('Thêm địa chỉ thành công')
    }

    return (
        <KeyboardAwareScrollView enableOnAndroid={true} style={styles.container}>
            <View style={styles.formInput}>
                <InputStyle name={'Số điện thoại'} value={phone} onChange={(value) => setPhone(value)} />
            </View>
            <View style={styles.formInput}>
                <InputStyle name={'Địa chỉ'} value={address} onChange={(value) => setAddress(value)} />
            </View>
            <TouchableOpacity style={styles.footterSubmit} onPress={changeCart}>
                <Text style={styles.textFootterSubmit}>Xác nhận</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 20
    },

    formInput: {
        marginBottom: 20
    },
    footterSubmit: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Constant.COLORS.main,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 5,
        marginTop: 300
    },
    textFootterSubmit: {
        color: 'white',
        fontSize: 20
    }
})
