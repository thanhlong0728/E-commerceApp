import React , { useState } from 'react'
import {DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Drawer } from 'react-native-paper';
import { View, Text , Image } from 'react-native'

import { IMAGES  } from '../../contains'
import styles from './styles'
import { DrawerItemComponent } from '../../components'


const DrawerContent = () => {
    const navigation = useNavigation()
    const [active, setActive] = useState('Home')

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerBox}>
                    <Image style={styles.img} source={IMAGES.avatar} />
                </View>
                <Text style={styles.headerTitle}>Bond SHOP</Text>
            </View>
            <DrawerContentScrollView style={styles.body} >
                <DrawerItemComponent name={'Home'}   setActive={(value) => setActive(value)} active={active}/>
               <DrawerItemComponent name={'Category'}   setActive={(value) => setActive(value)} active={active}/>
               <DrawerItemComponent name={'Logout'} setActive={(value) => setActive(value)} active={active}/>
            </DrawerContentScrollView>
            
        </View>
    )
}

export default DrawerContent
