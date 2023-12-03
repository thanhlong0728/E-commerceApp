import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import RNProgressHud from 'progress-hud'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import Constant from '../../../../controller/Constant'

const BoxSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0)
    const [sliderList, setSliderList] = useState([])
    const [entries, setEntries] = useState(3)
    const navigation = useNavigation()

    const getSilderList = async () => {
        RNProgressHud.show()
        const ref = firestore().collection('slider')
        const snapshot = await ref.get()
        const list = []
        snapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setSliderList(list)
        RNProgressHud.dismiss()
    }

    useEffect(() => {
        getSilderList()
    }, [])

    const renderItems = (item) => {
        return (
            <View style={styles.slider}>
                <Image style={styles.img} source={{ uri: item.item.image }} />
            </View>
        )
    }
    const pagination = () => {
        return <Pagination dotsLength={entries} activeDotIndex={activeSlide} containerStyle={styles.pagiContainer} dotStyle={styles.dotStyle} inactiveDotOpacity={0.4} inactiveDotScale={0.6} />
    }

    return (
        <View style={styles.container}>
            <Carousel data={sliderList} renderItem={renderItems} sliderWidth={350} itemWidth={350} onSnapToItem={(index) => setActiveSlide(index)} loop={true} autoplay={true} enableSnap={true} />
            <View style={styles.pagination}>{pagination()}</View>
        </View>
    )
}

export default BoxSlider

const styles = StyleSheet.create({
    container: {
        borderColor: '#ffffff',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        height: 200,
        borderRadius: 5
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    input: {
        backgroundColor: Constant.COLORS.inputSearch,
        borderRadius: 20
    },
    pagination: {
        position: 'absolute',
        top: '75%'
    },
    slider: {
        backgroundColor: 'red',
        borderRadius: 5,
        width: '100%'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },
    pagiContainer: {}
})
