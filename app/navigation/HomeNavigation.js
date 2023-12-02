import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Constant from '../controller/Constant'
import  HomeScreen from '../components/Home/HomeScreen'
import  CategoryScreen from '../components/Home/CategoryScreen'
import  Header  from '../components/common/Header/Header'
import  HeaderNameScreen  from '../components/common/Header/HeaderName'
import 'react-native-gesture-handler'

const HomeStack = createStackNavigator()

const HomeStackScreen = (props) => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerTintColor: Constant.COLORS.main,
                headerStyle: {
                    height: 120
                },
                headerTitleStyle: {
                    fontSize: 30
                }
            }}
        >
            <HomeStack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{ header: () => <Header name={'Home'} /> }}
            />
            <HomeStack.Screen
                name='CategoryScreen'
                component={CategoryScreen}
                options={{ header: () => <HeaderNameScreen /> }}
            />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen
