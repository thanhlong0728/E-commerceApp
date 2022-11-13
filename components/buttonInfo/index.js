import React from 'react'
import { TouchableOpacity } from 'react-native'
import {Icon} from 'react-native-elements';
import { View, Text } from 'react-native'
import styles from './styles'

const ButtonInfo = ({name}) => {
    let iconname,type, color, label
    switch (name) {
        case 'FavoriteScreen':
            label = "Sản phẩm yêu thích"
            iconname = "favorite"
            color = "red" 
            break;
        case 'MyOderScreen':
            label = "Đơn hàng của tôi"
            iconname = "shopping-bag"
            color = "#517fa4"
            break;
        case 'MyComment':
            label = "Nhận xét của tôi"
            iconname = "star"
            color = "orange"
            break;
        case 'InfoShipScreen':
            label = "Thông tin cá nhân"
            iconname = "person"
            color = "#517fa4"
            break;
        case 'ChangePassScreen':
            label = "Đổi mật khẩu"
            iconname = "lock"
            color = "black"
            break;
        default:
            break;
    }
    
    return (
        <View style={styles.container}  >
            <View style={styles.eventButton}>
                <Icon name={iconname} type={type} color={color} style={styles.icon} />
                <Text style={styles.textInfo}>{label}</Text>
            </View>    
        </View>
    )
}

export default ButtonInfo
