import React, { useState } from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Constant from '../../controller/Constant'

type Props = {
    name: String
    style?: any
    editable?: Boolean
    value: any
    onChange: (value: any) => void
    placeholder?: String
}

const InputStyle = (props: Props) => {
    const { name, style, editable = true, value, onChange, placeholder } = props
    const [showPass, setShowPass] = useState(false)

    let obj = {
        name: name,
        placeholder: placeholder,
        autoCapitalize: 'none',
        style: { ...style },
        editable: editable,
        secureTextEntry: showPass,
        icon: <></>,
        multiline: false,
        numberOfLines: 1
    }

    switch (name) {
        case 'ConfirmPassword':
        case 'Password':
        case 'Mật khẩu hiện tại':
        case 'Mật khẩu mới':
        case 'Xác nhận mật khẩu mới':
            obj.secureTextEntry = !showPass
            obj.icon = <Ionicons size={18} color={Constant.COLORS.icon} name={showPass ? 'ios-eye' : 'ios-eye-off'} onPress={() => setShowPass(!showPass)} />
            break
        case 'Địa chỉ':
            obj.multiline = true
            obj.numberOfLines = 4
            break
        default:
            break
    }

    return (
        <>
            <Text style={styles.textInputLabel}>{obj.name}</Text>
            <TextInput
                multiline={obj.multiline}
                numberOfLines={obj.numberOfLines}
                placeholder={obj.placeholder}
                autoCapitalize={obj.autoCapitalize}
                style={[styles.textInput, obj.style]}
                editable={obj.editable}
                secureTextEntry={obj.secureTextEntry}
                value={value}
                onChangeText={(value) => onChange(value)}
            />
            <View style={styles.iconShowPass}>{obj.icon}</View>
        </>
    )
}

export default InputStyle

const styles = StyleSheet.create({
    textInputLabel: {
        color: Constant.COLORS.black,
        fontSize: 16
    },
    textInput: {
        marginTop: 10,
        height: 40,
        borderColor: Constant.COLORS.main,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10
    },
    iconShowPass: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
})
