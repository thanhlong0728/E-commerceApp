import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles'
import { useNavigation } from '@react-navigation/native';

const HeaderMini = ({name}) => {
  const navigation = useNavigation()
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
            <Ionicons name="ios-home-outline" size={24} color='white' />
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={styles.textHeader}>{name}</Text>
          </View>
        </View>
      </View>
    )
}

export default HeaderMini
