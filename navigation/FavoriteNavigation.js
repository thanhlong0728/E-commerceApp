import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../contains'
import { FavoriteScreen } from '../screens'
import { Header } from '../components'
import 'react-native-gesture-handler';

const FavoriteStack = createStackNavigator();

const FavoriteStackScreen = (props) => {
    return (
      <FavoriteStack.Navigator
        screenOptions={{
          headerStyle : {
            backgroundColor : COLORS.primary
          },
          headerTintColor : COLORS.second
        }}
      >
        <FavoriteStack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{header : () => (<Header icon={'delete'} name={'Yêu thích'}/>)}}/>
    </FavoriteStack.Navigator>
    );z
}


export default FavoriteStackScreen