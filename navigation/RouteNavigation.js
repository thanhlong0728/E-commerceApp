import React,{useState, useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabStackScreen from './TabNavigation'
import { DrawerContent } from '../screens'
import AuthStackScreen from './AuthNavigation'
import {AuthContext} from './AuthProvider'
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

function RouteNavigation() {
  const {user} = useContext(AuthContext)
  return (
      user ? (
          <Drawer.Navigator
            screenOptions={{
              headerShown: false
            }}
            drawerContent={props => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="TabStackScreen" component={TabStackScreen} />
          </Drawer.Navigator>
      ): (
          <AuthStackScreen />
      )
  );
}

export default RouteNavigation
