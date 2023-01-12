import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CategoryAllScreen } from '../screens'
import { COLORS } from '../contains'
import { Header } from '../components'
import 'react-native-gesture-handler'

const Stack = createStackNavigator()

const CategoryStackScreen = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.primary
                },
                headerTintColor: COLORS.second
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
