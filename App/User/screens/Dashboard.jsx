import { View, Text, SafeAreaView ,Platform,StatusBar, StyleSheet,Image, Button, TouchableOpacity,ScrollView, ActivityIndicator} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../../Config/FirebaseConfig'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Firestore, getDoc,getDocs,doc, collection ,query,where} from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../Components/Context';
const Dashboard = ({route}) => {
    const id = route.params
    const [data,setData] = useState();
    const user = useContext(UserContext)
    const [loading,setLoading] = useState(true);
    const navigation = useNavigation()
  

    useEffect(()=>{
        const GetData = async () =>{
            try {
                if (user) {
                    const uid = user.uid;
                    const docRef = doc(db,'users',uid);
                    const docSnap = await getDoc(docRef);
                    
                    if(docSnap.exists()){

                        setData(docSnap.data());
                       
                    }
                    else{
                        console.log("sadasd");
                    }
                   
                   
                  } else {
                    console.log('No user is signed in');
                  }
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false);
            }
        }
        GetData();
          
        }, []);
  return (
    <>
        {loading ?
         <> 
         <View style= {styles.indicatorContainer}>
            <ActivityIndicator size="large" color="#00ff00" />
         </View>
           
         </>
         :
         <>
             <SafeAreaView style={{flex:1}}>
        {Platform.OS ==='android' && <View style={{height:StatusBar.currentHeight}}/>}
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.dashboardContainer}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerContentContainer}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.headerName}>{data.firstName}</Text>
                            </View>
                            <View style={styles.headerRight}>
                            
                                <View style={styles.headerRightsides}>
                                    <View>
                                        <Text style={styles.headerRightTxt}>BLOOD </Text>
                                        <Text style={styles.headerRightTxt}>TYPE</Text>
                                    </View>
                                    <Text style={styles.txtValue}>{data.bloodType}</Text>
                                
                                </View>
                                <View style={styles.headerRightsides}>
                                    <View>
                                    <Text style={styles.headerRightTxt}>UNITS</Text>
                                    <Text style={styles.headerRightTxt}>DONATED</Text>
                                    </View>
                                    <Text style={styles.txtValue}>0</Text>
                                </View>
                            
                            </View>
                        </View>
                        
                                
                    </View>
                    <View style={styles.banner}>
                            <View style={styles.bannerContainer}>
                                <View style={styles.bannerTitle}>
                                    <Text style={styles.bannerTitleTxt}>Make your first donation</Text>
                                </View>
                                <View style={styles.bannerContent}>
                                    <View>  
                                        <Text style={styles.bannerTxt1}>Each Donations can impact up to three lives.</Text>
                                        <Text style={styles.bannerTxt2}>Every 2 seconds someone needs blood.</Text>
                                    </View>
                                    <View style={styles.imageContent}>
                                        <Image source={require('../../../assets/blood-donation-image.jpg')}
                                            style={styles.image1}
                                            resizeMode='contain'
                                        
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.scheduleBtn}>
                                        <Text style={styles.scheduleBtnTxt}>SCHEDULE NEW APPOINTMENT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> 
                    <View style={styles.navigation}>
                        <TouchableOpacity style={styles.navigationContent} onPress={()=>navigation.navigate('Request')}>
                            <View style={styles.navLeft}>
                                <Ionicons name="file-tray-outline" size={32} color="#b71540" />
                            </View>
                            <View style={styles.navRight}>
                                <Text style={styles.navTxt1}>Request blood</Text>
                                <Text style={styles.navTxt2}>Submit the request</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navigationContent}  onPress={()=>navigation.navigate('RequestList')} >
                            <View style={styles.navLeft}>
                                <Ionicons name="menu-outline" size={32} color="#b71540" />
                            </View>
                            <View style={styles.navRight}>
                                <Text style={styles.navTxt1}>Manage Request</Text>
                                <Text style={styles.navTxt2}>Reschedule, cancel and share</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navigationContent}  onPress={()=>alert("Under Development ! ")} >
                            <View style={styles.navLeft}>
                                <Ionicons name="location-outline" size={32} color="#b71540" />
                            </View>
                            <View style={styles.navRight}>
                                <Text style={styles.navTxt1}>Nearby Blood Donation</Text>
                                <Text style={styles.navTxt2}>Select nearby blood donation</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navigationContent}  onPress={()=>alert("Under Development ! ")} >
                            <View style={styles.navLeft}>
                                <Ionicons name="clipboard-outline" size={32} color="#b71540" />
                            </View>
                            <View style={styles.navRight}>
                                <Text style={styles.navTxt1}>Records</Text>
                                <Text style={styles.navTxt2}>Track your records</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
   
         </>}
    </>
   
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    dashboardContainer:{
        width:'100%',
        flexDirection:'column',
        flex:1,
        height:'100%',
        
       
    },
    headerContent:{
        backgroundColor:'#b71540',
        width:'100%',
        height:150,
      
    },
    headerContentContainer:{
        width:'80%',
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:'100%'
      
    },
    headerName:{
        color:'#f3f3f3',
        fontSize:20,
        fontWeight:'bold'
    },
    headerLeft:{
        width:'50%',
      
    },
    headerRight:{
        display:'flex',
        width:'50%',    
        flexDirection:'row',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    headerRightsides:{
        width:'50%',
        borderStartWidth:2,
        paddingLeft:10,
        flexDirection:'column',
        borderColor:'#f3f3f3'
        
    },
    headerRightTxt:{
        fontSize:10,
        color:'white'
    },
    txtValue:{
        color:'#f3f3f3',
        fontWeight:'bold',
        fontSize:30
    },
    banner:{
        backgroundColor:'white',
        width:'100%',
      paddingVertical:10 
       

    },
    bannerContainer:{
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
    },
    bannerTitle:{
        paddingVertical:20
    },
    bannerTitleTxt:{
        fontWeight:'bold',
        fontSize:20
    },

    bannerContent:{
        alignItems:'center',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#f4f4f4',
        borderRadius:10,
        width:'100%',
        padding:20,
       
    },
    bannerTxt1:{
        fontWeight:'bold',
        fontSize:15,
        textAlign:'center'
    },
    bannerTxt2:{
        
    },
    imageContent:{
        paddingVertical:10,
        width:'100%',
    },
        image1:{
        height:200,
        width:'100%',
        borderRadius:10,
        
    },
    scheduleBtn:{
        width:'100%',
        padding:10,
        backgroundColor:'#b71540',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    scheduleBtnTxt:{
        fontWeight:'bold',
        fontSize:13,
        color:'white'
    },
    navigation:{
        marginTop:20,
        marginBottom:20,
      
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
        alignItems:'center',
       
    },
    navigationContent:{
        backgroundColor:'white',
        flexDirection:'row',
        padding:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        width:'100%',
        marginBottom:10,
    },
    navLeft:{
        width:'25%',
        alignItems:'center',
        justifyContent:'center'
    },
    navRight:{
        width:'75%',
        justifyContent:'center'
    },
    navTxt1:{
        fontWeight:'bold',
    },
    navTxt2:{
        fontWeight:'200'
    },
    indicatorContainer:{
        flex:1,
        justifyContent:'center'
    }

  
})

export default Dashboard;