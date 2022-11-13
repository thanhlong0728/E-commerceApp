import React , { useContext, useState } from 'react'
import { View , Text, TouchableOpacity  } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {AuthContext} from '../../navigation/AuthProvider'
import styles from './styles'
import { InputStyle } from '../../components'
import {userModel} from '../../model'

const ChangePassScreen = () => {
    const {user} = useContext(AuthContext)
    const {displayName, email} = user
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const updatePass = () => {
        userModel.changePass(oldPass,newPass,confirmPass)
        setOldPass('')
        setNewPass('')
        setConfirmPass('')
    }


    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            style={styles.container}
        >
            <View style={styles.formInput}>
                <InputStyle name={'Nhập mật khẩu cũ'} value={oldPass} onChange={(value) => setOldPass(value)} />
            </View>
            <View style={styles.formInput}>
                <InputStyle name={'Nhập mật khẩu mới'} value={newPass} onChange={(value) => setNewPass(value)} />
            </View>
            <View style={styles.formInput}>
                <InputStyle name={'Nhập lại mật khẩu mới'} value={confirmPass} onChange={(value) => setConfirmPass(value)} />
            </View>
            <TouchableOpacity style={styles.footterSubmit} onPress={updatePass} >
                    <Text style={styles.textFootterSubmit} >Cập nhật</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
)
}

export default ChangePassScreen
