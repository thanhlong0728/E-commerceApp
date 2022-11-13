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

const ForgotPassScreen = () => {
    const navigation = useNavigation()
    const { colors } = useTheme()
    const [email, setEmail] = useState('')
    const { forgotPassword } = useContext(AuthContext)

    const handleForgot = () => {
        if (!email) {
            Alert.alert('Thông báo', 'Vui lòng nhập email')
            return
        }
        forgotPassword(email)
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Forget Password</Text>
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

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={handleForgot}>
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
                </View>
            </Animatable.View>
        </View>
    )
}

export default ForgotPassScreen
