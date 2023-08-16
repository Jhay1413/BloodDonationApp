import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import React , { useContext, useEffect, useState }  from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../Config/FirebaseConfig';
import {getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { UserContext } from '../../Components/Context';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';



const Request = () => {
  const user = useContext(UserContext)
  const [image, setImage] = useState(null);
  const [loading,setLoading] = useState(false);


  const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1,
    });

    console.log(result)

    if(!result.canceled){
      setImage(result.assets[0].uri)
    }
  }
  const handleUpload = async()=>{
    const {uid} = user;
    const status = "PENDING";
    try {
      setLoading(true);
      const storageRef = ref(storage,`images/${image}`);

      await uploadBytes(storageRef,image);
  
      const downloadURL = await getDownloadURL(storageRef);
      if(downloadURL){
        await addDoc(collection(db,'requests'),{
          uid,
          downloadURL,
          status
        })
      }
      setImage('');
      alert("Transaction Success ! ")
    
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  return (
    <View style={{flex:1}}>
        <View style={styles.schedContainer}>
          <View style={styles.uploadContainerUp}>
            <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
                <Ionicons name="cloud-upload-outline" size={80}  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleUpload}>
              {loading ? <ActivityIndicator/>:  <Text style={styles.submitTxt}>SUBMIT REQUEST</Text>}
               
            </TouchableOpacity>
          </View>
          <View style={styles.uploadContainerDown}>
            {image && <Image source={{uri:image}} style={{width:'100%',height:'100%'}}/>}
          </View>
          
        </View>
    </View>
  )
}
const styles = StyleSheet.create({

  schedContainer:{
    
    width: '90%',
    flex:1,
    marginLeft:'auto',
    marginRight:'auto',
    padding:20,
    flexDirection:'column',
    backgroundColor:'white',
    marginVertical:20,
    borderRadius:10,
  },
  uploadContainer:{
  
    width:'100%',
    height:'50%',
    backgroundColor:'#f3f3f3',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  uploadContainerUp:{
    width:'100%',
    flex:1,
   
    justifyContent:'center',
    alignItems:'center'
  },
  uploadContainerDown:{
    width:'100%',
    flex:1,
  },
  submitBtn:{
    width:'100%',
    padding:10,
    backgroundColor:'#b71540',
    marginVertical:20,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
  },
  submitTxt:{
    color:'white',
    fontWeight:'bold'
  }

})
export default Request