import { Alert, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { createContext, useState } from 'react'
import { ShowToast } from '../help/showToast'
import 'react-native-gesture-handler'
import RNProgressHud from 'progress-hud'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import firestore from '@react-native-firebase/firestore'

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
                            if (error.code === 'auth/user-not-found') {
                                Alert.alert('Thông báo', 'Email không tồn tại')
                            } else if (error.code === 'auth/wrong-password') {
                                Alert.alert('Thông báo', 'Mật khẩu không đúng')
                            }
                            ToastAndroid.show('Đăng nhập không thành công', ToastAndroid.SHORT)
                            setTimeout(() => {
                                RNProgressHud.dismiss()
                            }, 1500)
                        })
                        .finally(() => {
                            setTimeout(() => {
                                RNProgressHud.dismiss()
                            }, 1500)
                        })
                },
                register: async (userName, email, password) => {
                    RNProgressHud.show()
                    await auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            const user = auth().currentUser
                            if (user) {
                                firestore()
                                    .collection('users')
                                    .doc(user.uid)
                                    .set({
                                        userName: userName,
                                        phone: '',
                                        address: '',
                                        avatarUser:
                                            'https://firebasestorage.googleapis.com/v0/b/shopbond-cc6cb.appspot.com/o/default%2Favatar_default.png?alt=media&token=e1cad5ef-fdf4-464c-b308-8b92fb48485b'
                                    })
                                    .then(() => {
                                        console.log('Đã thêm thành công')
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            }
                            RNProgressHud.showSuccessWithStatus('đăng ký thành công')
                            navigation.navigate('LoginScreen')

                            // userCredential.user
                            //     .updateProfile({
                            //         displayName: displayname,
                            //         photoURL:
                            //             'https://firebasestorage.googleapis.com/v0/b/shopbond-cc6cb.appspot.com/o/default%2Favatar_default.png?alt=media&token=e1cad5ef-fdf4-464c-b308-8b92fb48485b'
                            //     })
                            //     .then(() => {
                            //         RNProgressHud.showSuccessWithStatus('đăng ký thành công')
                            //         navigation.navigate('LoginScreen')
                            //     })
                            //     .catch((error) => {})
                            //     .finally(() => {
                            //         setTimeout(() => {
                            //             RNProgressHud.dismiss()
                            //         }, 1500)
                            // })
                        })
                        .catch((error) => {
                            if (error.code === 'auth/email-already-in-use') {
                                Alert.alert('Thông báo', 'Email đã được sử dụng')
                            }
                            if (error.code === 'auth/invalid-email') {
                                Alert.alert('Thông báo', 'Email không hợp lệ')
                            }
                            setTimeout(() => {
                                RNProgressHud.dismiss()
                            }, 1500)
                        })
                        .finally(() => {
                            setTimeout(() => {
                                RNProgressHud.dismiss()
                            }, 1500)
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
                            console.log(error.message)
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
