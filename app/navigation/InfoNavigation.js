import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { COLORS } from '../contains'

import {
    ProfileScreen,
    InfoShipScreen,
    InfoCartScreen,
    MyOderScreen,
    ChangePassScreen,
    MyCommentScreen
} from '../screens'
import { Header, HeaderScreen } from '../components'
import { HeaderMini } from '../components'
import 'react-native-gesture-handler'

const InfoStack = createStackNavigator()

const InfoStackScreen = (props) => {
    return (
        <InfoStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.primary
                },
                headerTintColor: COLORS.second
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
