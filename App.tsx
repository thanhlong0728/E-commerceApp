import React, { useEffect } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { RootSiblingParent } from 'react-native-root-siblings'
import store from './app/redux/store'
import MyNavigation from './app/navigation'

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core', 'VirtualizedLists should never be nested inside plain ScrollViews'])
    }, [])
    return (
        <Provider store={store}>
            <RootSiblingParent>
                <NavigationContainer>
                    <StatusBar hidden={true} />
                    <MyNavigation />
                </NavigationContainer>
            </RootSiblingParent>
        </Provider>
    )
}
