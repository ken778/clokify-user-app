
import { View,Text,ScrollView,KeyboardAvoidingView,ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import logo from '../assets/clock.png'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { auth, db } from '../Config/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const Login = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsloading] = useState(false)


    //function to register
    const Register = () =>{

      setIsloading(!isLoading)
      signInWithEmailAndPassword(auth, email, password).then((userCred)=>{
           console.log(userCred)
          //  alert('signed in ')
           setIsloading(!isLoading)
           navigation.navigate('landing')
      }).catch((error)=>{ 
       alert(error.message)
      })
 
}
  return (
      <>
     <View style={{height:'100%'}}>
                   <View
            style={{
              backgroundColor: "#4b97cb",
              height: 250,
              borderTopRightRadius:400,
              position:'absolute',
              bottom:0,
              width:'100%',
              elevation: 3,
            }}
          >
            <View style={{ display: "flex", alignItems: "center" }}>
              <Image
                style={{ width: 100, height: 100, marginTop: 50 }}
               
              />
            
            </View>
          </View>
          
          <View
            style={{
              backgroundColor: "#4b97cb",
              height: 250,
              elevation: 3,
              borderBottomStartRadius: 315,
            }}
          >
            
          </View>
        
     
  
        
        
         <View
            style={styles.main}
              
          >
          
    
     <View>
     <View style={{ display: "flex", alignItems: "center" }}>
    
              <Image
                style={{ width: 100, height: 100, marginTop: 50 }}
                source={logo}
              />
            
            </View>
              
             
              <TextInput  keyboardType='email-address' style={styles.inputs} placeholder='email' onChangeText={e=>setEmail(e)}></TextInput>
              <TextInput keyboardType='default' secureTextEntry={true} style={styles.inputs} placeholder='password' onChangeText={e=>setPassword(e)}></TextInput>
             
              <View style={styles.button}><Text style={{color:'white', alignSelf:'center', marginTop:15}} onPress={()=>Register()}>{isLoading? <ActivityIndicator size="small" color="white" /> : 'LOGIN'}</Text></View>
              <View ><Text style={{alignSelf:'center', padding:10, color:'#4b97cb'}} onPress={()=>navigation.navigate('signup')}>Don't have an account? Sign up now</Text></View>
             </View>

           
            
          </View>

        </View>
      </>
  )
}

export default Login



const styles = StyleSheet.create({
  main: {
          marginTop:100,
          backgroundColor:'white',
         
          width:'90%',
          alignSelf:'center',
          position:'absolute',
        
          elevation: 3,
          borderRadius:15,
          
          
  },
  buttons:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
  },
  inputs:{
      margin:10,
      borderWidth:1,
      borderColor:'#4b97cb',
      
      padding:10,
      borderRadius:15,
      color:'black'

  },
  button:{
      height:50,
   
    
      width:'70%',
      alignSelf:'center',
      borderRadius:15,
      marginTop:20,
      backgroundColor:'#4b97cb',
      elevation: 10,
marginBottom:25
  }
});