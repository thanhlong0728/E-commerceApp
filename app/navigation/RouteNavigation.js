import React, { useState, useContext, useEffect } from 'react'
import TabStackScreen from './TabNavigation'
import { DrawerContent } from '../screens'
import AuthStackScreen from './AuthNavigation'
import { AuthContext } from './AuthProvider'
import 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'

import StorageManager from '../StorageManager/StorageManager'
import { setInfoUser } from '../store/slices/userSlice'

const Stack = createNativeStackNavigator()

const RouteNavigation = () => {
    const dispatch = useDispatch()
    const [initialRouteName, setInitialRouteName] = useState('TabStackScreen')
    const [initial, setInitial] = useState(true)

    const getData = async () => {
        // lấy thông tin user từ local
        await StorageManager.getData('user').then((user) => {
            if (user) {
                dispatch(setInfoUser(user)) // set thông tin user vào redux
                setInitialRouteName('TabStackScreen') // chuyển về tabbar nếu đã đăng nhập
            } else {
                setInitialRouteName('AuthStackScreen') // chuyển về login nếu chưa đăng nhập
            }
        })
        if (initial) {
            setInitial(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    if (initial) {
        return null
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={initialRouteName}
        >
            <Stack.Screen name='TabStackScreen' component={TabStackScreen} />
            <Stack.Screen name='AuthStackScreen' component={AuthStackScreen} />
        </Stack.Navigator>
    )
}

export default RouteNavigation
