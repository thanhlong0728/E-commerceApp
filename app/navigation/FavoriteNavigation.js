import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Constant from '../controller/Constant'
import  FavoriteScreen  from '../components/Favorite/FavoriteScreen'
import  Header  from '../components/common/Header/Header'
import 'react-native-gesture-handler';

const FavoriteStack = createStackNavigator();

const FavoriteStackScreen = (props) => {
    return (
      <FavoriteStack.Navigator
        screenOptions={{
          headerStyle : {
            backgroundColor : Constant.COLORS.primary
          },
          headerTintColor : Constant.COLORS.second
        }}
      >
        <FavoriteStack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{header : () => (<Header icon={'delete'} name={'Yêu thích'}/>)}}/>
    </FavoriteStack.Navigator>
    );z
}


export default FavoriteStackScreen