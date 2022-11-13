import React, {useContext}  from 'react'
import {DrawerItem } from '@react-navigation/drawer';
import { COLORS } from '../../contains'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../../navigation/AuthProvider'


const DrawerItemComponent = ({name,setActive,active}) => {
    const {logout} = useContext(AuthContext)
    const navigation = useNavigation()

    let icon,label;
    switch (name) {
        case 'Home':
            icon = 'ios-home-outline';
            label = "Trang chủ";
            break;
        case 'Category':
            icon = 'ios-copy-outline';
            label = "Danh mục sản phẩm";
            break;
        case 'Logout':
            icon = 'ios-log-out-outline';
            label = "Đăng Xuất";
            break;
        default:
            break;
    }

    return (
        <DrawerItem
            focused={active == name ? true : false}
            activeTintColor={COLORS.primary}
            icon={({color, size }) => (
                <Ionicons name={icon} size={size} color={color} />
            )}
            label={label}
            onPress={() => {
                if(name === 'Logout'){
                    setActive('Logout')
                    logout()
                }
                else{
                    setActive(name)
                    navigation.navigate(name)
                }
                
            }}
        />
    )
}

export default DrawerItemComponent
