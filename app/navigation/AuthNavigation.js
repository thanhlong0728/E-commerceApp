import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { RegisterScreen , LoginScreen, ForgotPassScreen } from '../screens'

const Stack = createStackNavigator();

const AuthStackScreen=()=> {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown : false
      }}
    >
      <Stack.Screen name="LoginScreen" component={ LoginScreen } />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />

    </Stack.Navigator>
  );
}

export default AuthStackScreen;