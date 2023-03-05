import { View,Text,Modal,ScrollView,KeyboardAvoidingView,ActivityIndicator, Pressable, Alert, StyleSheet,Image, TextInput, TouchableOpacity, Platform } from 'react-native'
import React,{useState,useEffect} from 'react'
import { auth, db,storage } from '../Config/Firebase';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { FontAwesome5 } from '@expo/vector-icons'; 
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import ClockInInformation from './ClockInInformation';
import ClockOutInformation from './ClockOutInformation';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileModal from './ProfileModal';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';

import { MaterialIcons } from '@expo/vector-icons';

const profilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU'


function Profile({navigation,userInfo}){
    
  console.log('profile data',userInfo)

    const [activeTab, setActiveTab] = useState('clock-in')
    const [clockinselected, setclockinSelected] = useState(true)
    const [clockoutselected, setclockoutSelected] = useState(false)
    const [imageUrl, setImage] = useState(
      userInfo[0].imageUrl
    );

    const [modalDataIn, setModalDataIn] = useState([])
    const [modalDataOut, setModalDataOut] = useState([])
   
 
    const [name, setName] = useState(userInfo[0].name)
    const [surname, setSurname] = useState(userInfo[0].surname)
    const [email, setEmail] = useState(userInfo[0].email)
    const [image, setImageUri] = useState(userInfo[0].imageUrl)
    const [clock, setClock] = useState([])
    const [clockout, setClockOut] = useState([])
    const [isLoading, setIsloading] = useState(false)
    
    const [modalVisible, setModalVisible] = useState(false);

    const [picked, setPicked] = useState(null);

    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        console.log(result);
        setImageUri(result.uri);
        
      } else {
        alert('You did not select any image.');
      }
    };


    
  // const updateUser = async () => {
  //     const userRef = doc(db, 'users', userInfo[0].id)

  //     const user = {
  //       name:name,
  //       surname:surname
  //     }

  //    await updateDoc(userRef,user).then(()=>{
  //       alert('updated')
  //     }).catch((error)=>{
  //       alert(error.message)
  //     })

  // };

  //Picking image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateUser = async () => {
    setIsloading(true)
    const storageRef = ref(
      storage,
      `/images/${Date.now()}image`
    );
    const response = await fetch(image);
  const blob = await response.blob();

  await uploadBytesResumable(storageRef, blob).then((uploadTask)=>{
    getDownloadURL(uploadTask.ref).then(async(url) => {
      setPicked(url)
      await updateDoc(doc(db,'users',userInfo[0].id),{
              name:name,
              surname:surname,
              imageUrl: url,
    
              
            }).then(()=>{
                console.log('FROM STORAGE', url)
            }).catch(e=>{
              alert(e.message);
             
            });
     
  }).then(()=>{
    setIsloading(false)
    Alert.alert(
      "Success",
      "Profile Updaded",
      [

        { text: "OK" }
      ]
    )
  
  })
  })
  };


  
  let modalInfo = []
  let modalClockInInfo = []
  let modalSelectedInfo = []




  
  useEffect(()=>{
  
     
  //   //getting current logged user
    const user = auth.currentUser;
     
    const getUserData = async() =>{
      const userRef = collection(db,'users')
      const q = query(collection(db,'users'), where('userId', '==', user.uid))
      const data = await getDocs(q);
      // console.log(data)
      data.forEach((results)=>{ 
        // console.log('user',results.data())
        setInfo(results.data())
      })        


    }


//  onSnapshot(collection(db,'clockIn'), where('userId', '==', user.uid ),(data)=>{
//     // console.log('data in',data.docs.map((doc)=>({...doc.data(), id:doc.id})))
//     setClock(data.docs.map((doc)=>({...doc.data(),id:doc.id,icon:clockOInIcon})));
    
//   })


   const getLogOutData = async() =>{
    const q = query(collection(db,'clockout'), where('userId', '==', user.uid ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((results)=>{
      // setModalDataOut( results.data())
      modalInfo.push({...results.data(), icon:clockOutIcon})
      console.log('inside',modalInfo.length)
      setModalDataOut(modalInfo)
    })
   }

   const getLogInData = async() =>{
    const q = query(collection(db,'clockIn'), where('userId', '==', user.uid ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((results)=>{
    //  setModalData( results.data())
     modalClockInInfo.push({...results.data(), icon:clockOInIcon})
      console.log('insidefffff',modalClockInInfo.length)
      setModalDataIn(modalClockInInfo)
    })
   }

   getLogInData()
   getLogOutData()
  


  // const outData = onSnapshot(collection(db,'clockout'), where('userId', '==', user.uid ),(data)=>{
  //   // console.log('data out',data.docs.map((doc)=>({...doc.data(), id:doc.id})))
   
  //   setClockOut(data.docs.map((doc)=>({...doc.data(),id:doc.id, icon:clockOutIcon})));
    
  // })

  
  //   getUserData()
      setImage(userInfo.imageUrl)
  
   },[])

   console.log('log out data', modalDataOut)
      



     const openModal = () =>{
        setModalVisible(true)

     }
   

    const clockOutIcon = <Feather name="arrow-up-right" size={13} color="red" />
    const clockOInIcon =  <MaterialCommunityIcons name="arrow-bottom-right" size={13} color="green" />
    // const clock =[
    //     {
    //     date:'12 feb 2020',
    //     time:'09:00',
    //           icon: clockOInIcon
    //        },
    //        {
    //           date:'13 feb 2020',
    //           time:'09:00',
    //           icon: clockOInIcon
    //              },
    //              {
    //                 date:'14 feb 2020',
    //                 time:'09:00',
    //                 icon: clockOInIcon
    //                    },
    //                    {
    //                       date:'15 feb 2020',
    //                       time:'09:00',
    //                       icon: clockOInIcon
    //                          },
    //                          {
    //                             date:'16 feb 2020',
    //                             time:'09:00',
    //                             icon: clockOInIcon
    //                                },
        
        
        
    //     ]
    // const clockout =[
        
    //     {
    //     date:'12 feb 2020',
    //     time:'14:00',
    //     icon :clockOutIcon,
    //        },
    //        {
    //           date:'13 feb 2020',
    //           time:'14:00',
    //           icon :clockOutIcon,
    //              },
    //              {
    //                 date:'14 feb 2020',
    //                 time:'16:00',
    //                 icon :clockOutIcon,
    //                    },
    //                    {
    //                       date:'15 feb 2020',
    //                       time:'16:00',
    //                       icon :clockOutIcon,
    //                          },

    //                          {
    //                             date:'16 feb 2020',
    //                             time:'16:00',
    //                             icon :clockOutIcon,
    //                          }
                                   
                                
        
        
        
    //     ]

    const clockoutHeading = ['Date', 'Time out']
    const clockinHeading = ['Date', 'Time in']


    



   //function to set clock in selected true
   function clockinSelected (){
    setclockinSelected(true)
    setclockoutSelected(false)
   
   }

   //function to set clock out selected true
   function clockoutSelected(){
    setclockinSelected(false)
    setclockoutSelected(true)
   
   }

   //logout function
    const logout = (navigation) => {
       auth.signOut().then(()=>{
          navigation.navigate('Login')
           console.log(auth.user)
       }).catch((error)=>{
        alert(error)
       })
    }
    // console.log('on tap',activeTab) 
    // console.log('lenght of clock in data in profile screen' ,clock) 

    //passinf data on tab
    if(activeTab =="clock-out"){
    
         
      

    }
    if(activeTab =="clock-in"){
 
      
    }
    // console.log('shdshdhs', clock)

    return(


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

                    <View >
                        <View style={styles.modalView}>
                            <Pressable style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.closeButtonText}><MaterialIcons name="cancel" size={30}  /></Text>
                            </Pressable>
                     
                           
                           <View>
                               <View style={styles.profilePic}>
                                      <Image style={styles.picture}
                                       source={{uri:profilePic}} 
                                      />
                                      <Pressable onPress={pickImageAsync}>
                                      <FontAwesome style={styles.cameraIcon} name="camera" size={24} color="black" />
                                      </Pressable>
                        
                               </View>
                               
                           </View>

                           {/* <Pressable onPress={uploadImage}>
                           <View><Text>update</Text></View>
                           </Pressable>
                            */}
                          

                          <View style={styles.userInputContainer}>
                            <TextInput style={styles.userInput} 
                              onChangeText={setName}
                              value={name}
                            placeholder='name'></TextInput>
                            <TextInput style={styles.userInput}
                            onChangeText={setSurname}
                            value={surname}
                            placeholder='surname '></TextInput>
                           
                          </View>
                            <TouchableOpacity onPress={updateUser}>
                            <View style={styles.moreButton}>
             
                             <Text style={{color:'white', textAlign:'center'}}>{ isLoading? <ActivityIndicator/> : 'update'}</Text></View>
                            </TouchableOpacity>
                         

                        </View>
                    </View>


                </Modal>

            </View>

         <View style={styles.profileBanner}>
            <Text style={styles.profileName}>Profile</Text>
         </View>
         <View style={styles.profileCard}>
           <View style={styles.profileContainer}>
            <View style={styles.buttons}>
              <Pressable onPress={(e)=>logout(navigation)}>
              <View><View  style={styles.logoutButton}><Text style={{color:'white'}}>Logout</Text></View></View>                       
              </Pressable>
               
                 <Pressable  onPress={() => setModalVisible(true)}>
                 <View><Text><FontAwesome5 name="user-edit" size={24} color="#4b97cb" /></Text></View>
                 </Pressable>
                
            </View>
               <View>
                {
                  image ?   <Image
                 
                  style={{ width: 100, height: 100,  borderRadius:50, alignSelf:'center' }}
                   source ={{
                      uri: image
                   }}
                /> :   <Image
                 
                style={{ width: 100, height: 100,  borderRadius:50, alignSelf:'center' }}
                 source ={{
                    uri: profilePic
                 }}
              /> 
                }
                 
                
              
            <Text style={{alignSelf:'center', padding:10, fontSize:20, fontWeight:'bold'}}>{`${name + ' ' + surname  }`}</Text>
                 
               </View>
           </View>
           </View>
           <View style={styles.attendenceContainer}>
            <View style={styles.tabs}>
                <Pressable onPress={()=>{setActiveTab('clock-in'), clockinSelected()}}>
                    {
                        clockinselected ?   <View style={styles.selected}><Text style={{color:'white'}}>Clock in</Text></View> :   <View style={styles.unselected}><Text>Clockin</Text></View>
                    }
              
                </Pressable>
             <Pressable onPress={()=>{setActiveTab('clock-out'),clockoutSelected()}}>
             {
                        clockoutselected?   <View style={styles.selected}><Text style={{color:'white'}}>Clock out</Text></View> :   <View style={styles.unselected}><Text>Clock out</Text></View>
                    }
             </Pressable>
              
            </View>
            
            </View>
            <View>
                 {
                    activeTab ==='clock-in' && modalDataIn.length===0 ? <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}><Text style={{fontSize:30, padding:50}}>No Data yet!</Text></View>  : activeTab ==='clock-in' && modalDataIn.length!=0 ? <ClockInInformation modalDataIn={modalDataIn}/>
                  
                        : activeTab ==='clock-out' && modalDataOut.length===0 ? <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}><Text style={{fontSize:30, padding:50}}>No Data yet!</Text></View> : activeTab ==='clock-out' && modalDataOut.length!=0 ?<ClockOutInformation modalDataOut={modalDataOut} /> :<View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}><Text style={{fontSize:30, padding:50}}>No Data yet!</Text></View> 
                 
                    
                 }

            </View>
        </>
    )
}



export default Profile;
const styles = StyleSheet.create({
    profileBanner:{
        backgroundColor:'#4b97cb',
        height:Dimensions.get('window').height * 0.3
    },
    profileName:{
      alignSelf:'center',
      padding:50,
      color:'white',
      fontSize:20
    },
    profileCard:{
        backgroundColor:'white',
        height:Dimensions.get('window').height *0.3,
        width:windowWidth* 0.9,
        alignSelf:'center',
        position:'absolute',
        top:100,
        borderRadius:15,
        elevation: 10,

    },
    profileContainer:{
    
    },
    buttons:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       padding:10
    },
    logoutButton:{
        backgroundColor:'#4b97cb',
       color:'white',
        height:35 ,
        padding:7,
        borderRadius:15
    },
    attendenceContainer:{
         marginTop:110
    },
    tabs:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:30
    },
    selected:{
          backgroundColor:'#4b97cb',
          padding:10,
          borderRadius:15
    },
    unselected:{
        backgroundColor:'white',
        padding:10,
        borderRadius:15
    },
    Modalheaders:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:30,
        borderBottomWidth:2,
        borderBottomColor:'black',
        width: windowWidth*0.9,
        alignSelf:'center',
     },
  modalView: {
    ...Platform.select({
      ios:{
        marginTop:100,
        height:windowHeight*0.5,
      },
      android:{
        marginTop:100,
        height:windowHeight*0.8,
      }
    }),
       margin: 20,
       backgroundColor: "white",
       borderRadius: 20,
     
     
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2
       },
       shadowOpacity: 0.25,
       shadowRadius: 4,
       elevation: 5,
       
       width:windowWidth*0.9
     },
     button: {
       borderRadius: 20,
       padding: 10,
       elevation: 2
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
       textAlign: "center"
     },
     closeButton:{
      ...Platform.select({
       ios:{
       

       } 
      }),
      ...Platform.select({
        android:{
          
         } 
      }),
       
       width:'100%',
       padding:12,
       elevation:10
     },
 closeButtonText:{
    textAlign:'right',
    color:'#4b97cb',
    fontSize:20
 },
 profilePic:{
 width:150,
 height:150,

 alignSelf:'center',
 marginTop:19,
 borderRadius:76
 },
 picture:{
    width:150,
 height:150,
 borderRadius:76
 },
 cameraIcon:{
    color:'#4b97cb',
    marginLeft:110,
    marginTop:-20

 },
 userInputContainer:{
  width:windowWidth*0.8,
 
  
  alignSelf:'center',
  marginTop:15,
  padding:15
 },
 userInput:{
    padding:10,
    borderWidth:1,
  borderColor:'#4b97cb',
  marginTop:9,
  borderRadius:15,
   
    
    
 },
 moreButton:{
  width:windowWidth*0.3,
  backgroundColor:'#4b97cb',
  padding:12,
  marginTop:10,
  alignSelf:'center',
  borderRadius:15
},
centeredView:{
  ...Platform.select({
    ios:{
      
    }
  })
}

})