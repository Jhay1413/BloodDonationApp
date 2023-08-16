import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../../Components/Context';

import MainNavigator from './MainNavigator';
import Login from '../../Components/Login';

const Stack = createNativeStackNavigator();;
const OutsideNavigator = () => {
    const user = useContext(UserContext);
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName='Login'>
          {user ? ( <Stack.Screen name="MainNavigator" component= {MainNavigator}options={{headerShown:false}}/>):( <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>)}

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default OutsideNavigator;