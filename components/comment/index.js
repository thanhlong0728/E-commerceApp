import React, { useEffect, useContext, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    LogBox,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

import styles from './styles'
import { AuthContext } from '../../navigation/AuthProvider'
import { commentModel } from '../../model'

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

const Comment = ({ productId, productImg }) => {
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
                        RNProgressHud.showSuccessWithStatus('Xóa nhận xét thành công')
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
                    <View style={styles.nameComment}>
                        <Text numberOfLines={1} style={styles.name}>
                            {item.userName}
                        </Text>
                    </View>
                    <Text style={styles.textDayComment}>
                        {dd + '/' + mm + '/' + yyyy} {'  '}
                        {/* {item.createdAt.toLocaleTimeString('vi_VN')} */}
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
                <View style={styles.boxComment}>
                    <View style={styles.box}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                            <View style={styles.boxImg}>
                                <Image source={{ uri: photoURL }} style={styles.img} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.input}>
                            <TextInput
                                value={textComment}
                                onChangeText={(textComment) => setTextComment(textComment)}
                                placeholder='Nhập bình luận'
                                style={styles.textInput}
                            />
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
                    <View style={styles.noData}>
                        <Text style={styles.textNodata}>Chưa có comment nào</Text>
                    </View>
                )}

                <FlatList
                    data={commentList}
                    renderItem={showItems}
                    keyExtractor={(comment, uid) => 'comment+' + uid}
                />
            </View>
        </>
    )
}

export default Comment
