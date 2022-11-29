import { useNavigation } from '@react-navigation/native'
import React, { createContext, useState } from 'react'
import { ShowToast } from '../help/showToast'
import 'react-native-gesture-handler'
import RNProgressHud from 'progress-hud'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'

import { getProfileUser } from '../firebase/user'
import { setInfoUser } from '../store/slices/userSlice'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    return (
        <AuthContext.Provider
            value={{
                loading,
                login: async (email, password) => {
                    RNProgressHud.show()
                    auth()
                        .signInWithEmailAndPassword(email, password)
                        .then(async () => {
                            // lấy thông tin user từ database
                            await getProfileUser(auth().currentUser.uid)
                                .then((data) => {
                                    if (data) {
                                        // lưu data vào data redux
                                        dispatch(setInfoUser(data))
                                        RNProgressHud.showSuccessWithStatus('đăng nhập thành công')
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'TabStackScreen' }]
                                        })
                                        setTimeout(() => {
                                            RNProgressHud.dismiss()
                                        }, 1500)
                                    }
                                })
                                .catch((error) => {
                                    console.log(error)
                                    setTimeout(() => {
                                        RNProgressHud.dismiss()
                                    }, 1500)
                                })
                        })
                        // .then((userCredential) => {
                        //     dispatch(setInfoUser(data))
                        //     RNProgressHud.showSuccessWithStatus('đăng nhập thành công')
                        //     var user = userCredential.user
                        //     setUser(user)
                        // })
                        .catch((error) => {
                            console.log(error)
                        })
                        .finally(() => {
                            setTimeout(() => {
                                RNProgressHud.dismiss()
                            }, 1500)
                        })
                },
                register: async (displayname, email, password) => {
                    RNProgressHud.show()
                    await auth()
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
                                    setTimeout(() => {
                                        RNProgressHud.dismiss()
                                    }, 1500)
                                })
                        })
                        .catch((error) => {
                            console.log(error.message)
                        })
                },
                logout: async () => {
                    RNProgressHud.show()
                    await auth()
                        .signOut()
                        .then(() => {
                            RNProgressHud.showSuccessWithStatus('đăng xuất thành công')
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'AuthStackScreen' }]
                            })
                            dispatch(setInfoUser(null))
                        })
                        .catch((error) => {
                            ShowToast(error.message)
                        })
                        .finally(() => {
                            setTimeout(() => {
                                RNProgressHud.dismiss()
                            }, 1500)
                        })
                }
                // updateInfo: async (displayName) => {
                //     setLoading(true)
                //     await auth()
                //         .currentUser.updateProfile({
                //             displayName: displayName
                //         })
                //         .then(() => {
                //             ShowToast('Cập nhật thành công!!!')
                //         })
                //         .catch((error) => {
                //             ShowToast(error.message)
                //         })
                //     setLoading(false)
                // },
                // forgotPassword: async (email) => {
                //     RNProgressHud.show()
                //     await auth()
                //         .sendPasswordResetEmail(email)
                //         .then(function (user) {
                //             RNProgressHud.showSuccessWithStatus('Lấy mật khẩu thành công')
                //             alert('Lấy mật khẩu thành công. Vui lòng kiểm tra email...')
                //         })
                //         .catch(function (e) {
                //             ShowToast('Email chưa đăng ký')
                //         })
                //         .finally(() => {
                //             RNProgressHud.dismiss()
                //         })
                // }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
