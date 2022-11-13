import { useRoute } from '@react-navigation/native'
import React,{useState, useEffect} from 'react'
import { View , FlatList } from 'react-native'
import { Loading, Product } from '../../components'
import {fetchProduct} from '../../store/slices/products'
import {useDispatch, useSelector} from 'react-redux'
import {EmptyData} from '../../common'
import HighlightText from '@sanar/react-native-highlight-text';

import styles from './styles'


const InfoCartScreen = () => {
    const route = useRoute()
    const {search} = route.params
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState({})

    useEffect(() => {
        setLoading(true)
        dispatch(fetchProduct({search}))
            .then(res =>{
                if (!res.error) {
                    setItems(res.payload)
                    setLoading(false)
                }
            })
    }, [search])

    const highlightName = (string) =>{
        return (
            <HighlightText
                highlightStyle={{ backgroundColor: 'yellow' }}
                searchWords={[search]}
                textToHighlight={string}
            />
        )
    }

    const showItems = ({item}) => {
        let product = {
            ...item,
            name : highlightName(item.name)
        }
        return (
            <Product data={product} />
        )
    }
    if(loading){
        return <Loading />
    }
    return (
        <>
        {
            items.length > 0 ? ( <View style={styles.container}>
                <View style={styles.aside}>
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={items}
                        renderItem={showItems}
                        keyExtractor={(item) => item.name.toString()}
                        numColumns={2}
                    />
                </View>
            </View>) : (
                <EmptyData />
            )
        }
        </>
        
    )
}

export default InfoCartScreen
