import { View, Text,Image } from 'react-native'
import React,{useEffect} from 'react'
import logo from '../assets/clock.png'
import { auth, db } from '../Config/Firebase';


const Slash = ({navigation}) => {

    useEffect(()=>{
        const user = auth.currentUser;
    },[])

    setTimeout(()=>{
      const user = auth.currentUser;
         console.log('next page')
         if(user){
          navigation.navigate('landing')
         }else{
          navigation.navigate('Login')
         }
       
    },3000)

  return (
    <View style={{backgroundColor:'#4b97cb', height:'100%'}}>
           <View style={{ flex:1, justifyContent:'center', alignItems: "center" }}>
            <Image
              style={{ width: 100, height: 100, marginTop: 50 }}
              source={logo}
            />
          
          </View>
    </View> 
  )
}

export default Slash