import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider'

const SignInScreen = () => {
    const navigation = useNavigation()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true)

    const { register } = useContext(AuthContext)

    const handleRegister = () => {
        if (!userName) {
            Alert.alert('Thông báo', 'Vui lòng nhập username')
            return
        }
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
        if (password === confirmPassword) {
            register(userName, email, password)
        } else {
            ShowToast('Nhập lại mật khẩu không đúng')
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.text_footer}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color='#05375a' size={20} />
                        <TextInput
                            value={userName}
                            placeholder='Your Username'
                            style={styles.textInput}
                            onChangeText={setUserName}
                            autoCapitalize='none'
                        />
                    </View>
                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Email
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome name='envelope-o' color='#05375a' size={20} />
                        <TextInput
                            value={email}
                            placeholder='Your Email'
                            style={styles.textInput}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                        />
                    </View>

                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Password
                    </Text>
                    <View style={styles.action}>
                        <Feather name='lock' color='#05375a' size={20} />
                        <TextInput
                            value={password}
                            placeholder='Your Password'
                            secureTextEntry={secureTextEntry ? true : false}
                            style={styles.textInput}
                            onChangeText={setPassword}
                            autoCapitalize='none'
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            {secureTextEntry ? (
                                <Feather name='eye-off' color='grey' size={20} />
                            ) : (
                                <Feather name='eye' color='grey' size={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={[
                            styles.text_footer,
                            {
                                marginTop: 35
                            }
                        ]}
                    >
                        Confirm Password
                    </Text>
                    <View style={styles.action}>
                        <Feather name='lock' color='#05375a' size={20} />
                        <TextInput
                            value={confirmPassword}
                            placeholder='Confirm Your Password'
                            secureTextEntry={confirmSecureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
                        >
                            {secureTextEntry ? (
                                <Feather name='eye-off' color='grey' size={20} />
                            ) : (
                                <Feather name='eye' color='grey' size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>By signing up you agree to our</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
                            {' '}
                            Terms of service
                        </Text>
                        <Text style={styles.color_textPrivate}> and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
                            {' '}
                            Privacy policy
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn} onPress={handleRegister}>
                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: '#fff'
                                        }
                                    ]}
                                >
                                    Sign Up
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
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
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    )
}

export default SignInScreen
