import { View, Text ,StyleSheet,Alert, Modal ,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Button } from 'react-native'
import { useToast } from "react-native-toast-notifications";
import { auth, db } from '../Config/Firebase';
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import moment from 'moment'
import AlertModal from './AlertModal';
const ClockIn = ({navigation, route}) => {
   const {setClockedIn, clockedIn} = route.params;

   const [modalVisible, setModalVisible] = useState(false);


   console.log('status in clockin', clockedIn)
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
            image:scanData.imageUrl,
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
      setClockedIn(true)
        const date = new Date().toLocaleString();
        const details = {
            name:'Moraswi',
            surname:'Tahbiso',
            time:date
        }
        if(clockedIn===true){
       
        //  alert('You have clocked in already, \n please clock out before clocking in again.')
        //  navigation.navigate('landing')
        setModalVisible(true)
          
        }else{
          setScanData(data=userInfo);
       
          console.log('data', data)
          
         
          console.log('data', type)
        }
       
       
        
     
       
    }
    console.log('clocked status', clockedIn)
  return (
    <>
     <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{`You have clocked in already,\nPlease clock out before clocking in again.`}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Okay Noted</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
       
        
        </View>
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
  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    
  }
});
  

export default ClockIn

