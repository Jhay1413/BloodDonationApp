import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../screens/Dashboard';
import { FIREBASE_AUTH } from '../../Config/FirebaseConfig';
import Request from '../screens/Request';
import RequestList from '../screens/RequestList';

const InsideStack = createNativeStackNavigator();
const MainNavigator = () => {
 
  return (
    <InsideStack.Navigator initialRouteName='Dashboard'>
        <InsideStack.Screen name='Dashboard' component={Dashboard} options={{headerShown:false}} ></InsideStack.Screen>
        <InsideStack.Screen name='Request' component={Request}/>
        <InsideStack.Screen name='RequestList' component={RequestList}/>
    </InsideStack.Navigator>
  )
}

export default MainNavigator