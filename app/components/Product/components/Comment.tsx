import React, { useEffect, useContext, useState } from 'react'
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, LogBox, Alert, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

import commentModel from '../../common/model/commentModel'
import Constant from '../../../controller/Constant'

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

type Props = {
    productId: string
    productImg: string
}

const Comment = (props: Props) => {
    const { productId, productImg } = props
    const navigation = useNavigation()
    const { photoURL, uid } = auth().currentUser
    const createdAt = new Date()
    const [textComment, setTextComment] = useState('')
    const [commentList, setCommentList] = useState([])
    const [userName, setUserName] = useState('')
    const [isRefresh, setRefresh] = useState(false)

    const getProfile = async () => {
        RNProgressHud.show()
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get()
            .then((data) => {
                setUserName(data?.data()?.userName)
            })
            .catch((error) => {
                console.log('Error getting documents: ', error)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    const getCommentList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('comment')
        const snapshot = await ref.where('productId', '==', productId).get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                ...doc.data()
            })
        })
        setCommentList(list)
        RNProgressHud.dismiss()
    }

    useEffect(() => {
        getProfile()
        getCommentList()
    }, [isRefresh, productId])

    const handleComment = () => {
        commentModel
            .addComment({ uid, productId, photoURL, userName, textComment, createdAt, productImg })
            .then(() => {
                setTextComment('')
                setRefresh(!isRefresh)
            })
            .catch((err) => {
                console.log('errr::', err)
            })
    }

    const showItems = ({ item }) => {
        const createdAt = item.createdAt.toDate()
        let mm = createdAt.getMonth() + 1
        let dd = createdAt.getDate()
        let yyyy = createdAt.getFullYear()
        let hours = createdAt.getHours()
        let minutes = createdAt.getMinutes()

        const deleteComment = () => {
            RNProgressHud.show()
            var postsRef = firestore().collection('comment')
            var query = postsRef
                .where('uid', '==', item?.uid)
                .where('createdAt', '==', item.createdAt)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        var deleteDoc = firestore().collection('comment').doc(doc.id).delete()
                        RNProgressHud.showSuccessWithStatus('Xóa nhận xét thành công', null)
                        setRefresh(!isRefresh)
                    })
                })
                .catch((err) => {
                    console.log('Error getting documents', err)
                    RNProgressHud.dismiss()
                })
                .finally(() => {
                    RNProgressHud.dismiss()
                })
        }

        return (
            <View style={styles.conment}>
                <View style={styles.conment_avatar}>
                    <Image style={styles.conment_avatar_img} source={{ uri: item.photoURL }} />
                </View>
                <View style={styles.content}>
                    <View>
                        <Text numberOfLines={1} style={styles.name}>
                            {item.userName}
                        </Text>
                    </View>
                    <Text style={styles.textDayComment}>
                        {dd + '/' + mm + '/' + yyyy} {'  '}
                        {hours + ':' + minutes}
                    </Text>
                    <Text numberOfLines={3} style={styles.data}>
                        {item.textComment}
                    </Text>
                </View>
                <View style={styles.deleteComment}>
                    {item.uid == uid ? (
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert('Thông báo !', 'Bạn có muốn xóa nhận xét không?', [
                                    {
                                        text: 'Hủy',
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Đồng ý',
                                        onPress: deleteComment
                                    }
                                ])
                            }}
                        >
                            <Text style={styles.textDelete}>Xóa</Text>
                        </TouchableOpacity>
                    ) : (
                        <View></View>
                    )}
                </View>
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Nhận xét sản phẩm</Text>
                <View>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen' as never)}>
                            <View style={styles.boxImg}>
                                <Image source={{ uri: photoURL }} style={styles.img} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.input}>
                            <TextInput value={textComment} onChangeText={(textComment) => setTextComment(textComment)} placeholder='Nhập bình luận' style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.buttonComment}>
                        <TouchableOpacity onPress={handleComment}>
                            <View style={styles.button}>
                                <Icon name={'comment'} size={24} color='white' />
                                <Text style={styles.textButtonComment}>Bình luận</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {commentList.length === 0 && (
                    <View>
                        <Text style={styles.textNodata}>Chưa có comment nào</Text>
                    </View>
                )}

                <FlatList data={commentList} renderItem={showItems} keyExtractor={(comment, uid) => 'comment+' + uid} />
            </View>
        </>
    )
}

export default Comment

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    conment: {
        flex: 1,
        height: 120,
        marginBottom: 50,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    conment_avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 30,
        flex: 0.25
    },
    conment_avatar_img: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    content: {
        justifyContent: 'space-around',
        flex: 0.65
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    boxImg: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 10
    },
    input: {
        flex: 1,
        borderWidth: 0.7,
        marginLeft: 10,
        width: width / 1.4,
        height: 70,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    box: {
        flexDirection: 'row'
    },
    textInput: {
        marginLeft: 5
    },
    buttonComment: {
        flex: 1,
        alignItems: 'flex-end',
        marginVertical: 10
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Constant.COLORS.main,
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2
    },
    textButtonComment: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5
    },

    data: {
        fontSize: 17,
        marginTop: 10
    },
    textDayComment: {
        fontSize: 12,
        color: 'green'
    },
    textNodata: {
        fontSize: 24
    },
    deleteComment: {
        flex: 0.1,
        height: '100%',
        marginTop: 30
    },
    textDelete: {
        color: 'red',
        fontSize: 18
    }
})
