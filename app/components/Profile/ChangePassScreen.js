import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import InputStyle from '../../components/common/InputStyle'
import userModel from '../../components/common/model/userModel'
import Constant from '../../controller/Constant'

const ChangePassScreen = () => {
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const updatePass = () => {
        userModel.changePass(oldPass, newPass, confirmPass)
    }

    return (
        <KeyboardAwareScrollView enableOnAndroid={true} style={styles.container}>
            <View style={styles.formInput}>
                <InputStyle name='Mật khẩu hiện tại' placeholder='Nhập mật khẩu hiện tại' value={oldPass} onChange={(value) => setOldPass(value)} />
            </View>
            <View style={styles.formInput}>
                <InputStyle name='Mật khẩu mới' placeholder='Nhập mật khẩu mới' value={newPass} onChange={(value) => setNewPass(value)} />
            </View>
            <View style={styles.formInput}>
                <InputStyle name='Xác nhận mật khẩu mới' placeholder='Nhập xác nhận mật khẩu mới' value={confirmPass} onChange={(value) => setConfirmPass(value)} />
            </View>
            <TouchableOpacity style={styles.footterSubmit} onPress={updatePass}>
                <Text style={styles.textFootterSubmit}>Cập nhật</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

export default ChangePassScreen

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
        marginTop: 200
    },
    textFootterSubmit: {
        color: 'white',
        fontSize: 20
    }
})
