import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconLogin from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLORS } from '../../contains'

const TextBox = ({ name, iconName, style, editable = true, value, onChange }) => {
    const [showPass, setShowPass] = useState(false)

    let obj = {
        name: name,
        placeholder: `${name}...`,
        autoCapitalize: 'none',
        style: { ...style },
        editable: editable,
        secureTextEntry: showPass,
        icon: <></>
    }
    switch (name) {
        case 'Nhập lại mật khẩu':
        case 'Nhập mật khẩu':
            obj.secureTextEntry = !showPass
            obj.icon = (
                <Icon
                    name={showPass ? 'eye' : 'eye-slash'}
                    onPress={() => setShowPass(!showPass)}
                    size={15}
                    color={COLORS.icon}
                />
            )
            break
        default:
            break
    }
    return (
        <>
            <View style={styles.container}>
                <IconLogin name={iconName} size={24} style={styles.icon} />
                <TextInput
                    placeholder={obj.placeholder}
                    autoCapitalize={obj.autoCapitalize}
                    style={[styles.textInput, obj.style]}
                    editable={obj.editable}
                    secureTextEntry={obj.secureTextEntry}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                />
            </View>
            <View style={styles.iconShowPass}>{obj.icon}</View>
        </>
    )
}

export default TextBox

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: 'orange',
        borderWidth: 2,
        borderColor: 'white',
        width: width / 1.1
    },
    textInputLabel: {
        color: COLORS.title
    },
    textInput: {
        marginBottom: 10,
        marginLeft: 20
    },
    iconShowPass: {
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    icon: {}
})
