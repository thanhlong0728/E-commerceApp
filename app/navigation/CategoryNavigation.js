import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CategoryAllScreen from '../components/CategoryAll/CategoryAllScreen'
import Header from '../components/common/Header/Header'
import 'react-native-gesture-handler'
import Constant from '../controller/Constant'

const Stack = createStackNavigator()

const CategoryStackScreen = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Constant.COLORS.primary
                },
                headerTintColor: Constant.COLORS.second
            }}
        >
            <Stack.Screen name='CategoryAllScreen' component={CategoryAllScreen} options={{ header: () => <Header name={'Danh mục'} product /> }} />
        </Stack.Navigator>
    )
}

export default CategoryStackScreen
