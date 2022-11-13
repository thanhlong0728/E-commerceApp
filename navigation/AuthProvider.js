import { useNavigation } from '@react-navigation/native'
import React, { createContext, useState } from 'react'
import { auth } from '../firebase'
import { ShowToast } from '../help/showToast'
import 'react-native-gesture-handler'
import RNProgressHud from 'progress-hud'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login: async (email, password) => {
                    RNProgressHud.show()
                    await auth
                        .signInWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            RNProgressHud.showSuccessWithStatus('đăng nhập thành công')
                            var user = userCredential.user
                            setUser(user)
                        })
                        .catch((error) => {
                            console.log(error)
                            ShowToast(error.message)
                        })
                        .finally(() => {
                            RNProgressHud.dismiss()
                        })
                },
                register: async (displayname, email, password) => {
                    RNProgressHud.show()
                    await auth
                        .createUserWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            userCredential.user
                                .updateProfile({
                                    displayName: displayname,
                                    photoURL:
                                        'https://firebasestorage.googleapis.com/v0/b/shopbond-cc6cb.appspot.com/o/default%2Favatar_default.png?alt=media&token=e1cad5ef-fdf4-464c-b308-8b92fb48485b'
                                })
                                .then(() => {
                                    RNProgressHud.showSuccessWithStatus('đăng ký thành công')
                                    navigation.navigate('LoginScreen')
                                })
                                .catch((error) => {})
                                .finally(() => {
                                    RNProgressHud.dismiss()
                                })
                        })
                        .catch((error) => {
                            ShowToast(error.message)
                        })
                    setLoading(false)
                },
                logout: async () => {
                    RNProgressHud.show()
                    await auth
                        .signOut()
                        .then(() => {
                            RNProgressHud.showSuccessWithStatus('đăng xuất thành công')
                            setUser(null)
                        })
                        .catch((error) => {
                            ShowToast(error.message)
                        })
                        .finally(() => {
                            RNProgressHud.dismiss()
                        })
                },
                updateInfo: async (displayName) => {
                    setLoading(true)
                    await auth.currentUser
                        .updateProfile({
                            displayName: displayName
                        })
                        .then(() => {
                            ShowToast('Cập nhật thành công!!!')
                        })
                        .catch((error) => {
                            ShowToast(error.message)
                        })
                    setLoading(false)
                },
                forgotPassword: async (email) => {
                    RNProgressHud.show()
                    await auth
                        .sendPasswordResetEmail(email)
                        .then(function (user) {
                            RNProgressHud.showSuccessWithStatus('Lấy mật khẩu thành công')
                            alert('Lấy mật khẩu thành công. Vui lòng kiểm tra email...')
                        })
                        .catch(function (e) {
                            ShowToast('Email chưa đăng ký')
                        })
                        .finally(() => {
                            RNProgressHud.dismiss()
                        })
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
