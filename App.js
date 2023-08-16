import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Components/Login';
import Signup from './App/Components/Signup';
import { useContext, useEffect,useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './App/Config/FirebaseConfig';
import MainNavigator from './App/User/Navigation/MainNavigator';
import UserProvider from './App/Components/UserProvider';
import { UserContext } from './App/Components/Context';
import OutsideNavigator from './App/User/Navigation/OutsideNavigator';


const Stack = createNativeStackNavigator();
export default function App() {
  const user = useContext(UserContext);
 
  return (
    <>
     <UserProvider>
        <OutsideNavigator/>
    </UserProvider>
    
    </>
   
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
