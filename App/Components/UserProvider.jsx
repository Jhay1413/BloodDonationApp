import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { UserContext } from './Context'
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';
const UserProvider = ({children}) => {
    const [user,setUser] = useState('');

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH,(user)=>{
            setUser(user);
        });
        return ()=> unsubscribe();
    },[user])
  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  )
}

export default UserProvider