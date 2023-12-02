import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AuthContext } from '../../navigation/AuthProvider'
import { InputStyle } from '../components'

import Constant from '../../controller/Constant'

const InfoShipScreen = () => {
    const { user, updateInfo } = useContext(AuthContext)
    const { displayName, email } = user
    const [emailInfo, setEmail] = useState(email)
    const [nickName, setNickName] = useState(displayName)

    const updateIF = () => {
        updateInfo(nickName)
    }

    return (
        <KeyboardAwareScrollView enableOnAndroid={true} style={styles.container}>
            <View style={styles.formInput}>
                <InputStyle
                    name={'Họ tên'}
                    value={nickName}
                    onChange={(value) => setNickName(value)}
                />
            </View>
            <View style={styles.formInput}>
                <InputStyle
                    name={'Email'}
                    value={emailInfo}
                    onChange={(value) => setEmail(value)}
                    editable={false}
                />
            </View>

            <TouchableOpacity style={styles.footterSubmit} onPress={updateIF}>
                <Text style={styles.textFootterSubmit}>Cập nhật</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

export default InfoShipScreen

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
