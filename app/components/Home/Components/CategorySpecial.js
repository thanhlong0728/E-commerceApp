import React from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import RatingComponent from '../Components/Rating'
import Util from '../../../controller/Util'

const CategorySpecial = ({ nameCategory, items }) => {
    const navigation = useNavigation()

    const goProduct = (item) => {
        navigation.navigate('ProductScreen', {
            id: item?.id,
            categoryID: item?.categoryID
        })
    }

    const showItems = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => goProduct(item)} style={styles.box}>
                <View style={styles.boxCategory}>
                    <Image style={styles.imgItem} source={{ uri: item?.image }} />
                </View>
                <View style={styles.info}>
                    <Text numberOfLines={1} style={[styles.infoName]}>
                        {item?.name}
                    </Text>
                    <Text numberOfLines={1}>{item?.summary}</Text>
                    <Text numberOfLines={1}>
                        <RatingComponent />
                    </Text>
                    <Text numberOfLines={1} style={[styles.infoPrice]}>
                        {Util.formatPriceNumber(item?.price)}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{nameCategory}</Text>
            </View>
            <FlatList data={items} renderItem={showItems} keyExtractor={(item) => item?.name.toString()} horizontal={true} showsHorizontalScrollIndicator={false} />
        </View>
    )
}

export default CategorySpecial

const styles = StyleSheet.create({
    container: {
        marginBottom: 30
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        marginBottom: 15
    },
    box: {
        flexDirection: 'row',
        marginRight: 25,
        borderRadius: 15,
        width: 230
        // backgroundColor: 'red'
    },
    boxCategory: {
        width: 110,
        height: 110,
        borderRadius: 15
    },
    imgItem: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'contain'
    },
    info: {
        marginLeft: 15,
        justifyContent: 'space-around'
    },
    infoName: {
        fontWeight: 'bold'
    },
    infoPrice: {
        fontWeight: 'bold',
        color: 'red'
    }
})
