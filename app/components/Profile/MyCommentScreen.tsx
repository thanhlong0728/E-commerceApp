import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import RNProgressHud from 'progress-hud'

const MyCommentScreen = () => {
    const navigation = useNavigation<any>()
    const { uid } = auth().currentUser
    const [dataAllComment, setAllDataComment] = useState([])

    const getAllComment = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('comment')
        const snapshot = await ref.where('uid', '==', uid).get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                ...doc.data()
            })
        })
        setAllDataComment(list)
        RNProgressHud.dismiss()
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getAllComment()
        })
    }, [])

    const showItems = ({ item }) => {
        const createdAt = item?.createdAt.toDate()
        let mm = createdAt.getMonth() + 1
        let dd = createdAt.getDate()
        let yyyy = createdAt.getFullYear()
        let hours = createdAt.getHours()
        let minutes = createdAt.getMinutes()

        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ProductScreen', {
                        id: item?.productId
                    })
                }}
            >
                <View style={styles.myComment}>
                    <View style={styles.boxImg}>
                        <Image source={{ uri: item.photoURL }} style={styles.img} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.nameAndDate}>
                            <View style={styles.nameUser}>
                                <Text style={styles.textUser}>{item.displayName}</Text>
                            </View>
                            <Text style={styles.textDay}>
                                {dd + '/' + mm + '/' + yyyy}
                                {'  '}
                                {hours + ':' + minutes}
                            </Text>
                        </View>
                        <View>
                            <Text>{item.textComment}</Text>
                        </View>
                    </View>
                    <View style={styles.boxImgProduct}>
                        <Image source={{ uri: item.productImg }} style={styles.imgProduct} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList data={dataAllComment} renderItem={showItems} keyExtractor={(comment, uid) => 'comment+' + uid} />
        </View>
    )
}

export default MyCommentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    myComment: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5
    },
    boxImg: {
        width: 80,
        height: 80,
        flex: 0.2,
        justifyContent: 'center'
    },
    img: {
        width: '80%',
        height: '75%',
        resizeMode: 'contain',
        borderRadius: 40
    },
    boxImgProduct: {
        width: 80,
        height: 80,
        flex: 0.2
    },
    imgProduct: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    content: {
        flex: 0.6,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    nameAndDate: {
        flexDirection: 'row'
    },
    nameUser: {},
    date: {
        width: '40%',
        alignItems: 'flex-end'
    },
    textDay: {
        color: 'gray'
    },
    textUser: {
        fontSize: 18
    }
})
