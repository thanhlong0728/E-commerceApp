import { StyleSheet, Text, View, TouchableOpacity, Alert, ToastAndroid, Linking, ScrollView, Image, TextInput, LogBox } from 'react-native'
import React, { useContext, useState, useRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import RNProgressHud from 'progress-hud'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { AuthContext } from '../../navigation/AuthProvider'
import Constant from '../../controller/Constant'

LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'componentWillReceiveProps'])

const ProfileEditScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const infoUser = useSelector((state) => state.user.data)
    const { logout } = useContext(AuthContext)
    const [avatarUser, setAvatarUser] = useState(auth().currentUser.photoURL)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const handleUpdateProfile = async () => {
        RNProgressHud.show()
        const profile = {
            userName: userName,
            phone: phone,
            address: address
        }
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .set(profile)
            .then(() => {
                RNProgressHud.showSuccessWithStatus('cập nhật profile thành công')
                setTimeout(() => {
                    RNProgressHud.dismiss()
                }, 1500)
            })
            .catch((error) => {
                console.log('error::::', error)
            })
            .finally(() => {
                setTimeout(() => {
                    RNProgressHud.dismiss()
                }, 1500)
            })
    }

    const _refActionSheet = useRef()

    const onShowImageActionSheet = () => {
        _refActionSheet.current?.show(true)
    }

    const openCamera = () => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            width: 226,
            height: 278,
            cropping: true
        })
            .then((image) => {
                setAvatarUser(image?.path)
            })
            .catch((err) => {})
    }

    const openLibrary = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            width: 226,
            height: 278,
            cropping: true
        })
            .then((image) => {
                RNProgressHud.show()
                addImageToStorage(image?.path).then((url) => {
                    auth()
                        .currentUser.updateProfile({
                            photoURL: url
                        })
                        .then(() => {
                            RNProgressHud.showSuccessWithStatus('cập nhật avatar thành công')
                            setAvatarUser(url)
                        })
                        .catch((error) => {
                            console.log(error)
                            RNProgressHud.dismiss()
                        })
                        .finally(() => {
                            setTimeout(() => {
                                RNProgressHud.dismiss()
                            }, 1500)
                        })
                })
            })
            .catch((err) => {
                console.log(err)
                RNProgressHud.dismiss()
            })
    }
    const addImageToStorage = async (uri) => {
        const imageName = `${Date.now()}`
        const imageRef = storage().ref(`images/${imageName}`)
        await imageRef.putFile(uri)
        let url = await storage().ref(`images/${imageName}`).getDownloadURL()
        return url
    }

    const handlePickerImage = (index) => {
        if (index == 0) {
            openCamera()
        } else if (index == 1) {
            openLibrary()
        }
    }

    const getProfile = async () => {
        RNProgressHud.show()
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get()
            .then((data) => {
                setUserName(data?.data()?.userName)
                setPhone(data?.data()?.phone)
                setAddress(data?.data()?.address)
            })
            .catch((error) => {
                console.log('Error getting documents: ', error)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getProfile()
            setAvatarUser(auth().currentUser.photoURL)
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.viewInformation}>
                    <TouchableOpacity onPress={onShowImageActionSheet} style={styles.view}>
                        <Image source={{ uri: avatarUser }} style={styles.avatar} />
                        <Ionicons name='build-outline' size={20} color='black' style={styles.icEdit} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewProblems}>
                    <View style={styles.barCode}>
                        <Text style={styles.textProblemsTitle}>Email</Text>
                        <TextInput
                            placeholder='Nhập email'
                            style={styles.textProblems1}
                            value={auth().currentUser.email}
                            onChangeText={setEmail}
                            placeholderTextColor='#A9A9A9'
                            autoCapitalize='none'
                            editable={false}
                        />
                    </View>
                    <View style={styles.barCode}>
                        <Text style={styles.textProblemsTitle}>Họ và tên</Text>
                        <TextInput placeholder='Nhập họ tên' style={styles.textProblems1} value={userName} onChangeText={setUserName} placeholderTextColor='#A9A9A9' autoCapitalize='none' />
                    </View>
                    <View style={styles.barCode}>
                        <Text style={styles.textProblemsTitle}>Số điện thoại</Text>
                        <TextInput
                            placeholder='Nhập số điện thoại'
                            style={styles.textProblems1}
                            value={phone}
                            onChangeText={setPhone}
                            placeholderTextColor='#A9A9A9'
                            autoCapitalize='none'
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.barCode}>
                        <Text style={styles.textProblemsTitle}>Địa chỉ</Text>
                        <TextInput placeholder='Nhập địa chỉ' style={styles.textProblems1} value={address} onChangeText={setAddress} placeholderTextColor='#A9A9A9' autoCapitalize='none' />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                    <Text style={styles.textButton}>Save</Text>
                </TouchableOpacity>
            </ScrollView>

            <ActionSheet ref={_refActionSheet} title={'Chọn ảnh'} options={['Camera', 'Thư viện ảnh', 'Huỷ']} cancelButtonIndex={2} onPress={handlePickerImage} />
        </View>
    )
}

export default ProfileEditScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F8'
    },
    viewInformation: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20,
        justifyContent: 'center'
    },
    viewImage: {
        flexDirection: 'row',
        marginTop: 10
    },
    addImage: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 10,
        width: 60,
        height: 60,
        alignItems: 'center',

        marginHorizontal: 10
    },
    iconImage: {
        color: '#3C7BF4',
        fontSize: 20
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10
    },
    viewProblems: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    textProblems: {
        color: '#666',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10
    },
    barCode: {
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        marginHorizontal: 10,
        marginVertical: 5
    },
    textProblems1: {
        color: '#666',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5
    },
    textProblemsTitle: {
        color: '#666',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        fontWeight: 'bold'
    },

    problems1: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textProblems2: {
        color: '#666',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        marginHorizontal: 10
    },
    ViewProblems1: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    problems3: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: Constant.COLORS.pink,
        marginHorizontal: 16,
        borderRadius: 15,
        height: 51,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    avatar: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 5
    },
    icEdit: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
})
