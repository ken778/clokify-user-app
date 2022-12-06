import { StyleSheet, Text, View,Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Profile from './Profile';

import { auth, db } from '../Config/Firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const named = 'kekekekekeke'
const Testing = () =>{
   
  alert('pressed')
    
}




const Landing = ({navigation, route}) =>{

    const [userInfo, setInfo] = useState({})
    const [docData, setdocData] = useState()

    const [users, setUsers] = useState([]);
    useEffect(()=>{

      
     
        //getting current logged user
        const user = auth.currentUser;
         console.log(auth.currentUser.uid)
        const getUserData = async() =>{
          const userRef = collection(db,'users')
          const q = query(collection(db,'users'), where('userId', '==', user.uid))
          const data = await getDocs(q);
          setdocData( data.id)
          data.forEach((results)=>{ 
            console.log('user',results.data())
            setInfo({...results.data(), id:results.id})
          })        
    
    
        }
        const getUsers = onSnapshot(collection(db,'users'), where('userId', '==', user.uid ),(data)=>{
          console.log('data',data.docs.map((doc)=>({...doc.data(), id:doc.id})))
          setInfo(data.docs.map((doc)=>({...doc.data(),id:doc.id})).filter(x=>x.userId === user.uid))
        
          
        })
      
        // getUserData()

        // const userCollectionRef = collection(db, "users")

        // const getUsers = async () => {
        //   const data = await getDocs(userCollectionRef);
        //   setUsers(
        //     data.docs.map((doc) => ({
        //       name: doc.data().name,
           
        //       userId: doc.data().userId,
        //       email: doc.data().email,
        //       surname: doc.data().surname,
            
        //     }))
        //   );
        // }
        // getUsers();
       
      },[])

      // let userInfo = [];
      // // for (let i = 0; i < users.length; i++) {
      // //   if (users[i].userId === auth.currentUser.uid) {
      // //     userInfo.push(users[i]);
    
      // //   }
        
    
    
      // }
    
   console.log('here',userInfo)

  //  const userData = userInfo.filter(x=>x.userId ==='sdsdsds')
  // if(userInfo!=undefined){
  //   const user = auth.currentUser;
  //   const userData = userInfo.filter(x=>x.userId === user.uid)
   
  //   console.log('doc data', userData)
  // }
  // console.log('doc data', userData)
    return(
        <>
  
<Tab.Navigator>
      <Tab.Screen name="Home" component={Home} 
       options={{
        headerShown:false,
       
        tabBarIcon: ({ color, size }) => (
          <Entypo name="home" size={24} color={color} />
        ),
      }} />
      <Tab.Screen  name="profile" children={()=><Profile  userInfo={userInfo} />}
       options={{
        headerShown:false,
      
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
        ),
      }} />
  </Tab.Navigator>

        </>
    )
}

export default Landing;

