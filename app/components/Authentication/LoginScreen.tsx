import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, StatusBar, Alert, StyleSheet, Platform } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider'
import Constant from '../../controller/Constant'

const LoginScreen = () => {
    const navigation = useNavigation()
    const { colors } = useTheme()
    const { login }: any = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const handleLogin = () => {
        if (!email) {
            Alert.alert('Thông báo', 'Vui lòng nhập email')
            return
        }
        if (!password) {
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu')
            return
        }
        if (password.length < 6) {
            Alert.alert('Thông báo', 'Mật khẩu phải nhiều hơn 6 kí tự')
            return
        }
        login(email, password)
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation='fadeInUpBig'
                style={[
                    styles.footer,
                    {
                        backgroundColor: Constant.COLORS.background
                    }
                ]}
            >
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: Constant.COLORS.text
                        }
                    ]}
                >
                    Email
                </Text>
                <View style={styles.action}>
                    <FontAwesome name='envelope-o' color={Constant.COLORS.text} size={20} />
                    <TextInput
                        value={email}
                        placeholder='Your Email'
                        placeholderTextColor='#666666'
                        style={[
                            styles.textInput,
                            {
                                color: Constant.COLORS.text
                            }
                        ]}
                        autoCapitalize='none'
                        onChangeText={setEmail}
                    />
                </View>

                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: Constant.COLORS.text,
                            marginTop: 35
                        }
                    ]}
                >
                    Password
                </Text>
                <View style={styles.action}>
                    <Feather name='lock' color={Constant.COLORS.text} size={20} />
                    <TextInput
                        value={password}
                        placeholder='Your Password'
                        placeholderTextColor='#666666'
                        secureTextEntry={secureTextEntry ? true : false}
                        style={[
                            styles.textInput,
                            {
                                color: Constant.COLORS.text
                            }
                        ]}
                        autoCapitalize='none'
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {secureTextEntry ? <Feather name='eye-off' color='grey' size={20} /> : <Feather name='eye' color='grey' size={20} />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forget Password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={handleLogin}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: '#fff'
                                    }
                                ]}
                            >
                                Sign In
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('RegisterScreen ' as never)}
                        style={[
                            styles.signIn,
                            {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }
                        ]}
                    >
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: '#009387'
                                }
                            ]}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    imgLogo: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 20
    }
})
