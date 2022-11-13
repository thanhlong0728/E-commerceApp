import React , { useContext, useEffect, useState } from 'react'
import { View , Text, TouchableOpacity, FlatList, Image  } from 'react-native'
import {commentModel} from '../../model'
import styles from './styles'
import {AuthContext} from '../../navigation/AuthProvider'
import { useNavigation } from '@react-navigation/native'

const MyCommentScreen = () => {
    const navigation = useNavigation()
    const {user} = useContext(AuthContext)
    const {uid} = user
    const [dataAllComment, setAllDataComment] = useState([])
    useEffect(() => {
        commentModel.getAllComment(uid,(dataAllComment) => setAllDataComment(dataAllComment))
    }, [])

    const showItems =({item}) =>{
        let mm = item.createdAt.getMonth() + 1;
        let dd = item.createdAt.getDate();
        let yyyy = item.createdAt.getFullYear();
        return(
            <TouchableOpacity onPress={() =>{
                navigation.navigate('ProductScreen',{
                    id: item.productId
                })
            }}>
                <View style={styles.myComment}>
                    <View style={styles.boxImg}>
                        <Image source={{uri: item.photoURL }} style={styles.img} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.nameAndDate}>
                            <View style={styles.nameUser}>
                                <Text style={styles.textUser}>{item.displayName}</Text>
                            </View>
                            <View style={styles.date}>
                                <Text style={styles.textDay}>{dd + '/' + mm + '/' + yyyy}</Text>
                            </View>
                        </View>
                        <View style={styles.contentComment}>
                            <Text style={styles.textComment}>{item.textComment}</Text>
                        </View>
                    </View>
                    <View style={styles.boxImgProduct}>
                        <Image source={{uri: item.productImg}} style={styles.imgProduct} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return(
        <View style={styles.container}>
            <FlatList 
                data={dataAllComment}
                renderItem={showItems}
                keyExtractor={(comment, uid) => 'comment+' + uid}
            />
        </View>
    )
}

export default MyCommentScreen
