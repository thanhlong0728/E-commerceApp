import React, { useEffect } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { RootSiblingParent } from 'react-native-root-siblings'
import store from './app/redux/store'
import RouteNavigation from './app/navigation/RouteNavigation'

export default function App(props) {
    useEffect(() => {
        LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core'])
    }, [])
    return (
        <Provider store={store}>
            <RootSiblingParent>
                <NavigationContainer>
                    <StatusBar hidden={true} />
                    <RouteNavigation />
                </NavigationContainer>
            </RootSiblingParent>
        </Provider>
    )
}
