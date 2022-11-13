import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import styles from './styles'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider'

const LoginScreen = () => {
    const navigation = useNavigation()
    const { colors } = useTheme()
    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('longadmin@gmail.com')
    const [password, setPassword] = useState('123456')
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
                        backgroundColor: colors.background
                    }
                ]}
            >
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text
                        }
                    ]}
                >
                    Email
                </Text>
                <View style={styles.action}>
                    <FontAwesome name='envelope-o' color={colors.text} size={20} />
                    <TextInput
                        value={email}
                        placeholder='Your Email'
                        placeholderTextColor='#666666'
                        style={[
                            styles.textInput,
                            {
                                color: colors.text
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
                            color: colors.text,
                            marginTop: 35
                        }
                    ]}
                >
                    Password
                </Text>
                <View style={styles.action}>
                    <Feather name='lock' color={colors.text} size={20} />
                    <TextInput
                        value={password}
                        placeholder='Your Password'
                        placeholderTextColor='#666666'
                        secureTextEntry={secureTextEntry ? true : false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text
                            }
                        ]}
                        autoCapitalize='none'
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {secureTextEntry ? (
                            <Feather name='eye-off' color='grey' size={20} />
                        ) : (
                            <Feather name='eye' color='grey' size={20} />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassScreen')}>
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
                        onPress={() => navigation.navigate('RegisterScreen')}
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
