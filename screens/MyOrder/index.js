import React, { useState, useContext, useEffect } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider'
import { orderModel } from '../../model'
import styles from './styles'
import { formatPriceNumber } from '../../help'
import { firebase, auth, db } from '../../firebase'

const MyOderScreen = () => {
    const { user } = useContext(AuthContext)
    const { uid, displayName } = user
    const [dataOrder, setDataOrder] = useState([])
    useEffect(() => {
        orderModel.getOrder(uid, (dataOrder) => setDataOrder(dataOrder))
    }, [])

    const showItems = ({ item }) => {
        let mm = item.createdAt.getMonth() + 1
        let dd = item.createdAt.getDate()
        let yyyy = item.createdAt.getFullYear()
        return (
            <View style={styles.boxProductOrder}>
                {item.cartItems.map((e, index) => (
                    <View style={styles.boxOrder} key={'product' + index}>
                        <View style={styles.productOrder}>
                            <View style={styles.infoOrder}>
                                <View style={styles.boxImg}>
                                    <Image
                                        source={{ uri: e.photoProduct }}
                                        style={styles.imgOrder}
                                    />
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.textInfo}>{displayName}</Text>
                                    <Text style={styles.textInfo}>{e.nameProduct}</Text>
                                    <Text style={styles.textInfo}>
                                        Giá: {formatPriceNumber(e.priceProduct)}
                                    </Text>
                                    <Text style={styles.textInfo}>Số lượng: {e.sum}</Text>

                                    <Text style={[styles.textInfo, styles.textGreen]}>
                                        Ngày đặt: {dd + '/' + mm + '/' + yyyy}
                                        {'  '}
                                        {item.createdAt.toLocaleTimeString('vi_VN')}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.boxtext}>
                                <Text style={[styles.textInfo, styles.textRed]}>
                                    Tổng cộng: {formatPriceNumber(e.total)}
                                </Text>
                            </View>
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
                                            onPress: () => {
                                                var postsRef = db.collection('order')
                                                var query = postsRef
                                                    .where('cartID', '==', item.cartID)
                                                    .get()
                                                    .then((snapshot) => {
                                                        snapshot.forEach((doc) => {
                                                            var deleteDoc = db
                                                                .collection('order')
                                                                .doc(doc.id)
                                                                .delete()
                                                        })
                                                    })
                                                    .catch((err) => {
                                                        console.log('Error getting documents', err)
                                                    })
                                            }
                                        }
                                    ])
                                }}
                            >
                                <View style={styles.boxHuy}>
                                    <Text style={styles.textHuy}>Hủy đơn hàng</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={dataOrder}
                renderItem={showItems}
                keyExtractor={(Orders, uid) => 'Orders+' + uid}
            />
        </View>
    )
}

export default MyOderScreen
