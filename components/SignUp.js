import { View,Text,ScrollView,KeyboardAvoidingView, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import logo from '../assets/clock.png'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { auth, db } from '../Config/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';

import { GoogleAuthProvider } from "firebase/auth";
import { async } from '@firebase/util';

const profilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU'
const SignUp = ({navigation}) => {

  const [_name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailExists, setEmailExists] = useState(false)
  const [signUpStatus, setSignUpStatus] = useState('');

  const provider = new GoogleAuthProvider();


 //google sign in

  // const SignIn = () =>{
  //   alert('pressed')
  //   signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  
  // }

  const checkEmailExists = async () => {
 
    const q = query (collection(db,'emails'), where('email', '==', email))
    const data = await getDocs(q);
   //console.log('data',data.empty)
    if(data.empty){
        setEmailExists(emailExists)
        console.log('status false')
        Alert.alert('We are sorry, but it looks like the email address you provided is not registered with our app.')
        
      }
      if(!data.empty){
        setEmailExists(!emailExists)
        console.log('status strue')
        Register()
      }
    data.forEach((results)=>{ 
      console.log('email from firebase',results.data())
      
 
     
    })

 
  
  console.log('from state', emailExists)
  
  }

 
  //function to register
  const Register = async() =>{
  try {

   


    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert('registered')
      navigation.navigate('Login')
  
      const userRef = collection(db, 'users')
      const userData = {
          name:_name,
          surname:surname,
          email:email,
          userId:user.uid,
          imageUrl: profilePic,
  
      }
  
       addDoc(userRef,userData)
  
      // ...
    })
      // Set the sign up status
      setSignUpStatus('success');
    
  } catch (error) {
    setSignUpStatus('error');
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message)
    
  }

   
  }

 



  useEffect(()=>{
   
  },[])



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
          
     <KeyboardAvoidingView
     behavior='position' >
     <View>
     <View style={{ display: "flex", alignItems: "center" }}>
              <Image
                style={{ width: 100, height: 100, marginTop: 50 }}
                source={logo}
              />
            
            </View>
              
              <TextInput style={styles.inputs} defaultValue={_name} placeholder='name' onChangeText={e=>setName(e)}/>
              <TextInput style={styles.inputs} defaultValue={surname} placeholder='surname' onChangeText={e=>setSurname(e)}/>
              <TextInput style={styles.inputs} defaultValue={email} placeholder='email' onChangeText={e=>setEmail(e)}/>
              <TextInput style={styles.inputs} secureTextEntry={true} defaultValue={password} placeholder='password' onChangeText={e=>setPassword(e)}/>

              <TouchableOpacity onPress={()=>checkEmailExists()}>
              <View style={styles.button}><Text style={{color:'white', alignSelf:'center', marginTop:15}} >REGISTER</Text></View>
              </TouchableOpacity>
             
          


             
              <View ><Text style={{alignSelf:'center', padding:10, color:'#4b97cb'}} onPress={()=>navigation.navigate('Login')}>Already have an account? Sign in</Text></View>
             </View>
     </KeyboardAvoidingView>
           
           
            
          </View>

        </View>
       
        </>
       
  
        
        
         
         
        
       
      
    )
}

export default SignUp

const styles = StyleSheet.create({
    main: {
            marginTop:100,
            backgroundColor:'white',
           
            width:'90%',
            alignSelf:'center',
            position:'absolute',
          
            elevation: 3,
            borderRadius:15
            
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