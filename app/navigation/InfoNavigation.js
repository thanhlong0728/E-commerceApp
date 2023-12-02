import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Constant from '../controller/Constant'
import ProfileScreen from '../components/Profile/ProfileScreen'
import InfoCartScreen from '../components/Cart/InfoCartScreen'
import MyOderScreen from '../components/Profile/MyOrderScreen'
import ChangePassScreen from '../components/Profile/ChangePassScreen'
import MyCommentScreen from '../components/Profile/MyCommentScreen'
import  HeaderMini  from '../components/common/Header/HeaderMini'
import 'react-native-gesture-handler'

const InfoStack = createStackNavigator()

const InfoStackScreen = (props) => {
    return (
        <InfoStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Constant.COLORS.primary
                },
                headerTintColor: Constant.COLORS.second
            }}
        >
            <InfoStack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <InfoStack.Screen
                name='InfoCartScreen'
                component={InfoCartScreen}
                options={{ headerShown: false }}
            />
            <InfoStack.Screen
                name='MyOderScreen'
                component={MyOderScreen}
                options={{ header: () => <HeaderMini name={'Đơn hàng của tôi'} /> }}
            />
            <InfoStack.Screen
                name='ChangePassScreen'
                component={ChangePassScreen}
                options={{ header: () => <HeaderMini name={'Đổi mật khẩu'} /> }}
            />
            <InfoStack.Screen
                name='MyCommentScreen'
                component={MyCommentScreen}
                options={{ header: () => <HeaderMini name={'Nhận xét của tôi'} /> }}
            />
        </InfoStack.Navigator>
    )
}

export default InfoStackScreen
