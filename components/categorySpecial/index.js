import React from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { formatPriceNumber } from '../../help'
import RatingComponent from '../rating'
import styles from './styles'

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
                        {formatPriceNumber(item?.price)}
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
            <FlatList
                data={items}
                renderItem={showItems}
                keyExtractor={(item) => item?.name.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default CategorySpecial
