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
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import FastImage from 'react-native-fast-image'

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
    // {
    //     id: 5,
    //     name: 'Giải quyết khiếu nại'
    // }
]

const Profile = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const infoUser = useSelector((state) => state.user.data)
    const { logout } = useContext(AuthContext)

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
                navigation.navigate('InfoShipScreen')
                break
            case 2:
                navigation.navigate('MyOderScreen')
                break
            case 3:
                navigation.navigate('MyCommentScreen')
                break
            case 4:
                navigation.navigate('ChangePassScreen')
                break
            default:
                break
        }
    }
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
                <View style={styles.view}>
                    <Image
                        source={{
                            uri: 'https://res.cloudinary.com/teepublic/image/private/s--YHcR2U-W--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1635629206/production/designs/25244985_0.jpg'
                        }}
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.text1}>{infoUser.name}</Text>
                    <Text style={styles.text2}>{infoUser.phone}</Text>
                    <TouchableOpacity>
                        <Text style={styles.text3}>Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {list.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleOnClickItem(item)}>
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

export default Profile

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
        resizeMode: 'contain'
        // borderRadius: 60
    }
})
