import { View, Text ,StyleSheet,Alert , } from 'react-native'
import React,{useState,useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Button } from 'react-native'
import { useToast } from "react-native-toast-notifications";
import { auth, db } from '../Config/Firebase';
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import moment from 'moment'
const ClockIn = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(false) 
    const [scanData, setScanData] = useState()
    const [userInfo, setInfo] = useState({})
    const [regDetails, setRegDetails] = useState({})

    //getting current logged in user
    // function userDetails(){
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/firebase.User
    //       const uid = user.uid;
    //       console.log(uid)
    //       console.log(user)
    //       // ...
    //     } else {
    //       // User is signed out
    //       // ...
    //     }
    //   });
    // }

   
    

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
    function Register(){
      const userRef = collection(db, 'clockIn')

      const attendanceDetails = {
            name:scanData.name,
            surname:scanData.surname,
            email:scanData.email,
            userId:scanData.userId,
            date:moment().format('LL'),
            time:moment().format('LT'),

      }

      addDoc(userRef,attendanceDetails, scanData.userId).then(()=>{
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
        const date = new Date().toLocaleString();
        const details = {
            name:'Moraswi',
            surname:'Tahbiso',
            timeIn:date
        }
       
        setScanData(data=userInfo);
       
        console.log('data', data)
        

        console.log('data', type)

       
    }
  return (
    <>
    {/* <View style={styles.container}>
    
  
     <BarCodeScanner
      
       
      style={StyleSheet.absoluteFill}
      onBarCodeScanned = {scanData? undefined : handleBarCodeScanner}
     />
   
    
     {scanData && navigation.navigate('Home') }

       {
           scanData&&  Alert.alert(
            "Welcome",
           ` "You have successfully clocked in \n\n  Time: ${moment().format('LT')}" `,
            [
            
              { text: "OK" }
            ]
          )
       }
       {
        scanData && Register()
       }

     
   </View> */}

<BarCodeScanner
        onBarCodeRead={(scan) => alert(scan.data)}
        style={[StyleSheet.absoluteFill, styles.container]}
        onBarCodeScanned = {scanData? undefined : handleBarCodeScanner}
      />
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      {scanData && navigation.navigate('landing')}

      {
        scanData && Alert.alert(
          "Welcome",
          ` "You have successfully clocked in \n\n  Time: ${moment().format('LT')}" `,
          [

            { text: "OK" }
          ]
        )
      }
      {
        scanData && Register()
      }
    
</>

  )
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'white',
//       alignItems: 'center', 
//       justifyContent: 'center',
//     },
   
//   });

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
    
  },
  layerTop: {
  flex:1.2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
   
  },
  layerLeft: {
    flex: 1.5,
    backgroundColor: opacity
  
  },
  focused: {
    flex: 12,
    
  },
  layerRight: {
    flex: 1.5,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    
  
    borderColor:'white',

    backgroundColor: opacity
  },
});
  

export default ClockIn

