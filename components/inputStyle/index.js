import React, { useState } from 'react'
import { TextInput, Text, View } from 'react-native'
import styles from './styles'
import { COLORS } from '../../contains'
import Ionicons from 'react-native-vector-icons/Ionicons'

const InputStyle = ({ name, style, editable = true, value, onChange, placeholder }) => {
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
            obj.icon = (
                <Ionicons
                    size={18}
                    color={COLORS.icon}
                    name={showPass ? 'ios-eye' : 'ios-eye-off'}
                    onPress={() => setShowPass(!showPass)}
                />
            )
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
