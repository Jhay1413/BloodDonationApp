import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView,ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { collection,query,where ,getDocs} from 'firebase/firestore'
import { UserContext } from '../../Components/Context'
import { db } from '../../Config/FirebaseConfig'
import { list } from 'firebase/storage'

const RequestList = () => {
    const [data,setData] = useState()
    const user = useContext(UserContext)
    
    useEffect(()=>{
        const getList = async ()=>{
            try {
                const listRef = collection(db,'requests');
                const q = query(listRef,where("uid", "==",user.uid))

                const querySnapshot = await getDocs(q);
                const datas = querySnapshot.docs.map((doc)=> doc.data());

                setData(datas);
               
            } catch (error) {
                console.log(error);
            }
        }
        getList();
    },[])
  return (
    <SafeAreaView style={{flex:1}}>
        <ScrollView style={styles.scrollView}>
            <View style={{flex:1}}>
                <View style={styles.requestContainer}>
                    {data 
                    ? 
                    (<>{data.map((item)=>(
                        <TouchableOpacity style={styles.requestList} key={item.downloadURL}>
                        <Text>Blood Request</Text>
                        <Text style={styles.requestTxt}>{item.status}</Text>
                        </TouchableOpacity>
                    ))}</>): <ActivityIndicator/> }
               
            
                </View>
      
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    requestContainer:{
        flex:1,
      
        padding:20,
    },
    requestList:{
        marginVertical:10,
        backgroundColor:'white',
        padding:20,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    requestTxt:{
        fontSize:20,
        color:'#b71540'
    }
})
export default RequestList