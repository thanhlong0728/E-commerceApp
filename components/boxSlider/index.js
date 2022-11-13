import React , {useState, useEffect} from 'react'
import { View ,Image } from 'react-native'

import styles from './styles'
import Carousel , { Pagination } from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux'
import {fetchSlider} from '../../store/slices/slider'


const BoxSlider = () => {
    const dispatch = useDispatch()
    const [activeSlide, setActiveSlide] = useState(0)
    const dataSlider = useSelector(state => state.Slider.items)
    const [entries, setEntries] = useState(dataSlider ? dataSlider.length : 0)

    useEffect(() => {
      dispatch(fetchSlider())
    }, [])

    const renderItems = (item) => {
      return (
        <View style={styles.slider}>
            <Image style={styles.img} source={{uri: item.item.image}} />
        </View>
      )
  }
  const pagination  = () => {
    return (
        <Pagination
          dotsLength={entries}
          activeDotIndex={activeSlide}
          containerStyle={styles.pagiContainer}
          dotStyle={styles.dotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
  }

    return (
       <View style={styles.container}>
            <Carousel
              data={dataSlider}
              renderItem={renderItems}
              sliderWidth={350}
              itemWidth={350}
              onSnapToItem={(index) => setActiveSlide(index) }
              loop={true}
              autoplay={true}
              enableSnap={true}
            />
            <View style={styles.pagination}>
              { pagination() }
            </View>
       </View>
    )
}

export default BoxSlider
