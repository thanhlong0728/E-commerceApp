import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    Linking,
    Image
} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ActionSheet from 'react-native-actionsheet'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'

import { AuthContext } from '../../navigation/AuthProvider'

import { COLORS } from '../../contains'

const list = [
    {
        id: 1,
        name: 'Thông tin cá nhân'
    },
    {
        id: 2,
        name: 'Đơn hàng của tôi'
    },
    {
        id: 3,
        name: 'Nhận xét của tôi'
    },
    {
        id: 4,
        name: 'Thay đổi mật khẩu'
    }
]

const ProfileScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const infoUser = useSelector((state) => state.user.data)
    const { logout } = useContext(AuthContext)
    const [avatarUser, setAvatarUser] = useState(auth().currentUser.photoURL)
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')

    const handleOnClickLogout = () => {
        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn đăng xuất?', [
            {
                text: 'Cancel',
                onPress: () => {
                    console.log('Cancel Pressed')
                }
            },
            {
                text: 'OK',
                onPress: () => {
                    logout()
                }
            }
        ])
    }

    const handleOnClickItem = (item) => {
        switch (item.id) {
            case 1:
                navigation.navigate('ProfileInfoScreen')
                break
            case 2:
                navigation.navigate('MyOderScreen')
                break
            case 3:
                navigation.navigate('MyCommentScreen')
                break
            case 4:
                // navigation.navigate('ChangePassScreen')
                break
            default:
                break
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
            <View
                style={{
                    padding: 30,
                    backgroundColor: COLORS.main
                }}
            >
                <Text style={styles.text}>Thông tin cá nhân</Text>
            </View>
            <View style={styles.viewInformation}>
                <TouchableOpacity style={styles.view}>
                    <Image
                        source={{
                            uri: avatarUser
                        }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                <View style={styles.viewText}>
                    <Text style={styles.text1}>{userName}</Text>
                    <Text style={styles.text2}>{phone}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen')}>
                        <Text style={styles.text3}>Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {list.map((item, index) => (
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={index}
                    onPress={() => handleOnClickItem(item)}
                >
                    <View style={styles.problem}>
                        <Text style={styles.textProblems}>{item.name}</Text>
                        <Icon style={styles.iconHandling} name='angle-right' size={15} />
                    </View>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                onPress={() => {
                    handleOnClickLogout()
                }}
            >
                <View style={styles.problems1}>
                    <Text style={styles.textProblems1}>Đăng xuất</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F8'
    },
    icon: {
        color: '#fff',
        fontSize: 15
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    viewInformation: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: -20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20
    },
    viewText: {
        paddingHorizontal: 20
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 2
    },
    text2: {
        fontSize: 16,
        color: '#666666',
        marginVertical: 2
    },
    text3: {
        fontSize: 16,
        color: '#3C7BF4',
        marginVertical: 2
    },
    problem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8'
    },
    problems1: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 5,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 15
    },
    textProblems: {
        color: '#000',
        fontSize: 16
    },
    textProblems1: {
        color: '#000',
        fontSize: 16
    },
    avatar: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 10
    }
})
