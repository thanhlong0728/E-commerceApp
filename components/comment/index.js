import React, { useEffect, useContext, useState } from 'react'
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, LogBox } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

import styles from './styles'
import { AuthContext } from '../../navigation/AuthProvider'
import { commentModel } from '../../model'
// import { firebase, auth, db } from '../../firebase'

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

const Comment = ({ productId, productImg }) => {
    const navigation = useNavigation()
    const { photoURL, displayName, uid } = auth().currentUser
    const createdAt = new Date()
    const [textComment, setTextComment] = useState('')
    const [commentList, setCommentList] = useState([])
    console.log('commentList::', commentList)

    const getCommentList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('comment')
        const snapshot = await ref.get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                uid: doc.uid,
                ...doc.data()
            })
        })
        setCommentList(list)
        RNProgressHud.dismiss()
    }

    useEffect(() => {
        getCommentList()
    }, [])

    const handleComment = () => {
        console.log(uid)
        console.log(productId)
        console.log(photoURL)
        console.log(displayName)
        console.log(textComment)
        console.log(createdAt)
        console.log(productImg)
        commentModel.addComment(
            uid,
            productId,
            photoURL,
            displayName,
            textComment,
            createdAt,
            productImg
        )
        setTextComment('')
    }

    const showItems = ({ item }) => {
        let mm = item.createdAt.getMonth() + 1
        let dd = item.createdAt.getDate()
        let yyyy = item.createdAt.getFullYear()
        return (
            <View style={styles.conment}>
                <View style={styles.conment_avatar}>
                    <Image style={styles.conment_avatar_img} source={{ uri: item.photoURL }} />
                </View>
                <View style={styles.content}>
                    <View style={styles.nameComment}>
                        <Text numberOfLines={1} style={styles.name}>
                            {item.displayName}
                        </Text>
                    </View>
                    <Text style={styles.textDayComment}>
                        {dd + '/' + mm + '/' + yyyy} {'  '}
                        {item.createdAt.toLocaleTimeString('vi_VN')}
                    </Text>
                    <Text numberOfLines={3} style={styles.data}>
                        {item.textComment}
                    </Text>
                </View>
                <View style={styles.deleteComment}>
                    {item.uid == uid ? (
                        <TouchableOpacity
                            onPress={() => {
                                var deleteC = db.collection('comment')
                                deleteC = deleteC.where('uid', '==', item.uid)
                                deleteC = deleteC.where('createdAt', '==', item.createdAt)
                                deleteC
                                    .get()
                                    .then((snapshot) => {
                                        snapshot.forEach((doc) => {
                                            var deleteDoc = db
                                                .collection('comment')
                                                .doc(doc.id)
                                                .delete()
                                        })
                                    })
                                    .catch((err) => {
                                        console.log('Error getting documents', err)
                                    })
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
                        <TouchableOpacity onPress={() => navigation.navigate('InfoScreen')}>
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
