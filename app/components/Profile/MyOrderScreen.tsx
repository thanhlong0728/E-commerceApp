import React, { useState, useContext, useEffect } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Alert, ScrollView, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import auth from '@react-native-firebase/auth'
import RNProgressHud from 'progress-hud'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import Util from '../../controller/Util'

const MyOderScreen = () => {
    const navigation = useNavigation<any>()
    const { uid } = auth().currentUser
    const [userName, setUserName] = useState('')
    const [dataOrder, setDataOrder] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
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

    const getOrder = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('order')
        const snapshot = await ref.where('uid', '==', uid).get()
        const list = []
        snapshot.forEach((doc: any) => {
            list.push({
                cartID: doc.cartID,
                ...doc.data()
            })
        })
        setDataOrder(list)
        RNProgressHud.dismiss()
    }

    const onRefreshing = () => {
        getOrder()
        getProfile()
    }

    useEffect(() => {
        getOrder()
        getProfile()
    }, [isRefresh])

    const showItems = ({ item }) => {
        const createdAt = item.createdAt.toDate()
        let mm = createdAt.getMonth() + 1
        let dd = createdAt.getDate()
        let yyyy = createdAt.getFullYear()
        let hours = createdAt.getHours()
        let minutes = createdAt.getMinutes()

        const deleteOrder = () => {
            RNProgressHud.show()
            var postsRef = firestore().collection('order')
            var query = postsRef
                .where('cartID', '==', item.cartID)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        var deleteDoc = firestore().collection('order').doc(doc.id).delete()
                        RNProgressHud.showSuccessWithStatus('Hủy đơn hàng thành công', null)
                        setRefresh(!isRefresh)
                    })
                })
                .catch((err) => {
                    console.log('Error getting documents', err)
                    setTimeout(() => {
                        RNProgressHud.dismiss()
                    }, 1500)
                })
                .finally(() => {
                    setTimeout(() => {
                        RNProgressHud.dismiss()
                    }, 1500)
                })
        }

        return (
            <View style={styles.boxProductOrder}>
                {item?.cartItems.map((e, index, row) => (
                    <View key={'product' + index}>
                        <View style={styles.productOrder}>
                            <View style={styles.infoOrder}>
                                <View style={styles.boxImg}>
                                    <Image source={{ uri: e.photoProduct }} style={styles.imgOrder} />
                                </View>
                                <View>
                                    <Text style={styles.textInfo}>{userName}</Text>
                                    <Text style={styles.textInfo}>{e.nameProduct}</Text>
                                    <Text style={styles.textInfo}>Giá: {Util.formatPriceNumber(e.priceProduct)}</Text>
                                    <Text style={styles.textInfo}>Số lượng: {e.sum}</Text>
                                    <Text style={[styles.textInfo, styles.textRed]}>Tổng cộng: {Util.formatPriceNumber(e.total)}</Text>
                                </View>
                            </View>
                            {index + 1 === row.length && (
                                <View style={{ paddingTop: 10 }}>
                                    <Text style={[styles.textInfo, styles.textGreen]}>
                                        Ngày đặt: {dd + '/' + mm + '/' + yyyy}
                                        {'  '}
                                        {hours + ':' + minutes}
                                    </Text>
                                    {item.status === 'confirmed' ? (
                                        <View style={styles.statusOrder}>
                                            <Text style={styles.textStatus}>Đang chờ duyệt</Text>
                                        </View>
                                    ) : (
                                        <View></View>
                                    )}
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert('Thông báo !', 'Bạn có muốn hủy đơn hàng không?', [
                                                {
                                                    text: 'Hủy',
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: 'Đồng ý',
                                                    onPress: deleteOrder
                                                }
                                            ])
                                        }}
                                    >
                                        <View style={styles.boxHuy}>
                                            <Text style={styles.textHuy}>Hủy đơn hàng</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshing} />}>
            <FlatList data={dataOrder} renderItem={showItems} keyExtractor={(Orders, uid) => 'Orders+' + uid} />
        </ScrollView>
    )
}

export default MyOderScreen

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxProductOrder: {
        flex: 1,
        borderRadius: 20,
        marginVertical: 20
    },
    imgOrder: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    boxImg: {
        width: 100,
        height: 120,
        marginRight: 20
    },
    productOrder: {
        flex: 1,
        width: width,
        marginTop: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingVertical: 5
    },

    infoOrder: {
        flexDirection: 'row'
    },
    textInfo: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2
    },
    textRed: {
        color: 'red'
    },
    textGreen: {
        color: 'green',
        textAlign: 'center'
    },
    boxtext: {
        alignItems: 'center',
        marginTop: 7
    },
    textStatus: {
        fontSize: 16
    },
    statusOrder: {
        backgroundColor: '#F5B455',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 10
    },
    boxHuy: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 3,
        paddingVertical: 5
    },
    textHuy: {
        color: 'red',
        fontSize: 17,
        paddingVertical: 5
    }
})
