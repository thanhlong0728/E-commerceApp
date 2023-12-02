import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import  CategoryAllScreen from '../components/CategoryAll/CategoryAllScreen'
import  Constants  from '../controller/Constant'
import  Header  from '../components/common/Header/Header'
import 'react-native-gesture-handler'

const Stack = createStackNavigator()

const CategoryStackScreen = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Constants.COLORS.primary
                },
                headerTintColor: Constants.COLORS.second
            }}
        >
            <Stack.Screen
                name='CategoryAllScreen'
                component={CategoryAllScreen}
                options={{ header: () => <Header name={'Danh mục'} product /> }}
            />
        </Stack.Navigator>
    )
}

export default CategoryStackScreen
