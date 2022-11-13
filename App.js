import React, { useEffect } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './store'
import MyNavigation from './navigation'
import { RootSiblingParent } from 'react-native-root-siblings'

export default function App(props) {
    useEffect(() => {
        LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core'])
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
