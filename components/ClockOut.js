import { View, Text ,StyleSheet,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Button } from 'react-native'

import { auth, db } from '../Config/Firebase';
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import moment from 'moment'
import ClockIn from './ClockIn';


const ClockOut = ({navigation, route}) => {
  const {setClockedIn, setClockedOut,clockedIn} = route.params;
    const [hasPermission, setHasPermission] = useState(false)
    const [scanData, setScanData] = useState()
    const [userInfo, setInfo] = useState({})

    useEffect(()=>{
      (async()=>{
          const {status} = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status==='granted')
      })

           //getting current logged user
           const user = auth.currentUser;

           const getUserData = async() =>{
             const userRef = collection(db,'users')
             const q = query(collection(db,'users'), where('userId', '==', user.uid))
             const data = await getDocs(q);
             data.forEach((results)=>{
               console.log(results.data())
               setInfo(results.data())
             })        
     
     
           }
           getUserData()
    },[])

     //adding attendance data to firebase
     function ClockOut(){
      const userRef = collection(db, 'clockout')
      var clockoutTime = moment().format('LT');

      const attendanceDetails = {

            name:scanData.name,
            surname:scanData.surname,
            email:scanData.email,
            userId:scanData.userId,
            date:moment().format('LL'),
            time:moment().format('LT'),

      }

      addDoc(userRef,attendanceDetails).then(()=>{
        console.log('data added')
       }).catch((error)=>{
          console.log(error.message)
       })
  
    }

    if(hasPermission){
        return(
            <>
                <View style={styles.container}>
                  <Text>Please grand camera permission!</Text>
               </View>
            </>
        )
    }

    const handleBarCodeScanner = ({type,data}) =>{
   
      setClockedOut(true)
        const date = new Date().toLocaleString();
        const details = {
            name:'Moraswi',
            surname:'Tahbiso',
            timeIn:date
        }
       if(clockedIn!=true){
        alert('You can not clock out without clocking in')
        navigation.navigate('landing')
       }else{
        setScanData(data=userInfo);
       
        console.log('data', data)
        console.log('data', type)
        setClockedIn(false)
       }
       
    }
  return (
    <>
    <View style={styles.container}>
     <BarCodeScanner
      style={StyleSheet.absoluteFillObject}
      onBarCodeScanned = {scanData? undefined : handleBarCodeScanner}
     />
      {scanData && navigation.navigate('landing') }

{
    scanData&&  Alert.alert(
     "Good bye",
     `"You have successfully clocked out \n\n  Time: ${moment().format('LT')}" `,
     [
     
       { text: "OK" }
     ]
   )
}
{
 scanData && ClockOut()
}

     
   </View>
</>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
  });
  





export default ClockOut