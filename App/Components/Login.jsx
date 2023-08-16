import { View, Text, Platform ,StatusBar, KeyboardAvoidingView,StyleSheet, TextInput, TouchableOpacity,ScrollView, SafeAreaView} from 'react-native'
import React, { useState } from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async ()=>{
        setLoading(true);

        try {
            const response = await signInWithEmailAndPassword(auth,email,password);
        } catch (error) {
            alert(error);
        }finally{
            setLoading(false);
        }
    }
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{flex:1}}>
        <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{ flexGrow: 1 }}>
        {Platform.OS ==='android' && <View style={{height:StatusBar.currentHeight}}/>}
            <View style={styles.formContainer}>
                <View style={styles.formHeader}>
                    <Text style={styles.headerTitle}>LOGIN</Text>
                </View>
                <View style={styles.loginForm}>
                    <View style={styles.inputForm}>
                        <TextInput style={styles.loginInput} placeholder='Email' autoCapitalize='none' onChangeText={(e)=>setEmail(e)}/>
                        <TextInput style={styles.loginInput} placeholder='Password' onChangeText={(e)=>setPassword(e)}/>
                    </View>
                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInBtn} onPress={signIn}>
                        <Text style={styles.signInTxt}>SIGN-IN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signInCmdContainer}>
                   
                    <Text style={styles.orText}>OR</Text>
                    <TouchableOpacity style={styles.googleBtn}>
                        <Text style={styles.googleTxt}>Sign in with Google</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpTxt}>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text style={{fontWeight:'bold',fontSize:15}}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
            </View>
       
        </KeyboardAwareScrollView>
            
    </View>
    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    formContainer:{
        flex:1,
        flexDirection:'column',
        width:'80%',
        marginLeft:'auto',
        marginRight:'auto'
    },
    formHeader:{
        height:'25%',
        alignItems:'center',
        justifyContent:'center'
    },
    headerTitle:{
        fontSize:30,
    },
    loginForm:{
        flex:1,
        
    },
    loginInput:{
        height: 50,
        borderWidth:1,
        padding:10,
        backgroundColor:'#fff',
        borderColor: '#F6F6F6',
        marginVertical:10,
        borderRadius:10,
       
    },
    inputForm:{
        
        flexDirection:'column',
        width:'100%'
    },
    signInBtn:{
        marginTop:10,
        justifyContent:'center',
        width:'100%',
        backgroundColor:'#27ae60',
        padding:15,
        borderRadius:10,
        alignItems:'center'
    },
    signInTxt:{
        color:'#fff'
    },
    forgotBtn:{
        alignItems:'flex-end',
        width:'100%',
    },
    signInCmdContainer:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    orText:{
        fontSize:15,
        marginTop:30
    },
    googleBtn:{
        marginTop:30,
        borderWidth:1,
        padding:15,
        borderRadius:10,
   
    },
    googleTxt:{
        fontWeight:'bold',
        fontSize:20
    },
    signUpContainer:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
    },
    signUpTxt:{
       fontSize:15,
    }

})
export default Login