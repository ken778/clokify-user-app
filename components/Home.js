import { StyleSheet, Text, View,Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react'
import logo from '../assets/clock.png'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { auth, db } from '../Config/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { async } from '@firebase/util';
import moment from 'moment'

const profilePic = 'https://media.istockphoto.com/photos/headshot-portrait-of-smiling-male-employee-in-office-picture-id1309328823?b=1&k=20&m=1309328823&s=170667a&w=0&h=a-f8vR5TDFnkMY5poQXfQhDSnK1iImIfgVTVpFZi_KU='


const Home = ({navigation}) => {
  
  // console.log('time out', clockoutTime)
  //vaidating clockout time

  const [userInfo, setInfo] = useState({})
  const [clockInInfo, setclockInInfo] = useState()




  useEffect(()=>{
     
    //getting current logged user
    const user = auth.currentUser;
  console.log(auth.currentUser.uid)
    const getUserData = async() =>{
      const userRef = collection(db,'users')
      const q = query(collection(db,'users'), where('userId', '==', user.uid))
      const data = await getDocs(q);
      console.log('home',data)
      data.forEach((results)=>{ 
        console.log(results.data())
        setInfo(results.data())
      })        


    }

    getUserData()
    getClockInDetails()
  },[])
    
console.log('from home',userInfo)
  //getting clockin time
  const getClockInDetails = async() =>{
    const user = auth.currentUser;
    const q = query(collection(db,'clockIn'), where('userId', '==', user.uid))
    const data = await getDocs(q);
    console.log(data)
    data.forEach((results)=>{ 
      console.log(results.data())
      setclockInInfo(results.data())
    })           
  }
 
  return (
    <>
    
    <View
          style={{
            backgroundColor: "#4b97cb",
            height: 250,
            borderTopRightRadius:400,
            position:'absolute',
            bottom:0,
            width:'100%'
          }}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
          
            <Image
              style={{ width: 100, height: 100, marginTop: 50 }}
              source={logo}
            />
            
          
          </View>
        </View>
      <View style={{backgroundColor:'#f8f8fa'}}>
        <View
          style={{
            backgroundColor: "#4b97cb",
            height: 250,
         
            borderBottomStartRadius: 315,
          }}
        >
          <View style={{ display: "flex", alignItems: "center",  }} >
             
             <Pressable onPress={()=>navigation.navigate('profile')}>
             <Image 
            resizeMode='contain'
              style={{ width: 100, height: 100, marginTop: 50, borderRadius:50 }}
              source={{
                uri: userInfo.imageUrl,
              }}
            />
             </Pressable>
           
       
           
            <Text style={{ fontSize: 25, color:'white' }}>{userInfo.name} {userInfo.surname}</Text>
          </View>
        </View>
        

        <View
          style={styles.main}
            
        >
          <View style={{padding:10}}> 
          <Text
           style={styles.currentDate}
          >{moment().format('MMMM Do YYYY, h:mm:ss a')}</Text>
          </View>
         
             {/* <Text style={{alignSelf:'center', fontSize:32,padding:4,fontWeight:'bold'}}>16:00 PM</Text> */}
             <View style={styles.buttons}>
                  
           <TouchableOpacity onPress={()=>navigation.navigate('Clokin')}>
               
               <View
                 
                 style={{
                    marginTop:100,
                   backgroundColor: "#a3c157",
                   borderRadius: 15,
                   height: 150,
                   width: 150,
               
                 }}
               >
                 <View
                   style={{
                     flex: 1,
                     alignItems: "center",
                     justifyContent: "center",
                   }}
                 >
                   <Text style={{}}>
                     <Entypo name="login" size={80} color="black" />
                   </Text>
                 </View>
                 <Text style={{textAlign:'center',padding:5,color:'white'}}>IN</Text>
               </View>
               </TouchableOpacity>
              
      
               <TouchableOpacity onPress={()=>navigation.navigate('lockout')}>
               <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 15,
                  height: 150,
                  width: 150,
                  marginTop:100,
                
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>
                    <MaterialCommunityIcons name="logout" size={80} color="black" />
                  </Text>
                </View>
                <Text style={{textAlign:'center',padding:5,color:'white'}}>OUT</Text>
              </View>
               </TouchableOpacity>
             </View>
        
          
        </View>
       
      </View>
    </>
  );
}

export default Home

const styles = StyleSheet.create({
    main: {
        marginTop: 50,
          
            backgroundColor:'#f8f8fa',
            height:400,
            width:'90%',
            alignSelf:'center',
            position:'absolute',
            top:150,
            elevation: 3,
            borderRadius:15
            
    },
    buttons:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    currentDate:{
      alignSelf:'center',
      padding:10,
      marginBottom:-20,
      fontSize:18,
      fontWeight:'bold'
    }
  });