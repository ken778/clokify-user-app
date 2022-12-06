import { View,Text,Modal,ScrollView,KeyboardAvoidingView,ActivityIndicator, Pressable, Alert } from 'react-native'
import React,{useState} from 'react'
import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from './Button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ClockInInformation = ({clock}) =>{
   const [modalVisible, setModalVisible] = useState(false);

   const alertActive = () =>{
      alert('testing pressed')
   }
   const alertActive2 = () =>{
      alert('testing2 pressed')
   }

  console.log(clock.length)


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
         
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable  style={styles.closeButton}  onPress={() => setModalVisible(!modalVisible)}>
            <Text   style={styles.closeButtonText}>close</Text>
            </Pressable>
            {/* <View  style={styles.closeButton}><Text  style={styles.closeButtonText}>close</Text></View> */}
         
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
           
            <View style={styles.Modalheaders}>
                   <Text style={styles.headerText}>
                        date
                   </Text>
                   <Text  style={styles.headerText}>
                        Time
                   </Text>
                   
              </View>
              <ScrollView>
               
             

             

              {
                
               clock.map((res,index)=>
                  
               (
                     <>
                        <View style={styles.details}>
                           <Text style={styles.info}>
                             {res.date}
                           </Text>
                           <Text style={styles.info}>
                              {res.icon}{res.timeIn}
                           </Text>

                        </View>

                        
                    </>
            
                        
           

               ))
             }
              </ScrollView>
              
   
      

          </View>
        </View>

        
      </Modal>
     
    </View>
         
              <View style={styles.headers}>
                   <Text style={styles.headerText}>
                        Date
                   </Text>
                   <Text  style={styles.headerText}>
                        Time 
                   </Text>
                   
              </View>
             
             {
               clock.map((res,index)=>
                  index<4 &&
               (
                     <>
                        <View style={styles.details}>
                           <Text style={styles.info}>
                             {res.date}
                           </Text>
                           <Text style={styles.info}>
                              {res.icon}{res.timeIn}
                           </Text>

                        </View>

                        
                    </>
            
                        
           

               ))
             }
           
          {
            clock.length>=5 &&<Pressable  onPress={() => setModalVisible(true)}>
            <View style={styles.moreButton}>
             
             <Text style={{color:'white', textAlign:'center'}}>More</Text></View>
            </Pressable>
          }
        

           
           
             
            
              
             
              
    
          
         
        </>
    )
}

export default ClockInInformation;

const styles = StyleSheet.create({
    headers:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-around',
       marginTop:10,
       borderBottomWidth:2,
       borderBottomColor:'black',
       width: windowWidth*0.9,
       alignSelf:'center',
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
    details:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-around',
        borderBottomWidth:1,
       borderBottomColor:'#d6d4d4',
       width: windowWidth*0.9,
       alignSelf:'center',
       marginTop:18
    },
    headerText:{
        fontSize:16
    },
    moreButton:{
      width:windowWidth*0.3,
      backgroundColor:'#4b97cb',
      padding:12,
      marginTop:10,
      alignSelf:'center',
      borderRadius:15
    },

    modalView: {
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
      height:windowHeight*0.8,
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
    
      backgroundColor:'white',
      width:'100%',
      padding:12,
      elevation:10
    },
closeButtonText:{
   textAlign:'center',
   color:'#4b97cb',
   fontSize:20
}
}) 