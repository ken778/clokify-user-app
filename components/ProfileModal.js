import { View,Text,Modal,ScrollView,KeyboardAvoidingView,ActivityIndicator, Pressable, Alert, StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import { auth, db } from '../Config/Firebase';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ProfileModal = () =>{

    const [modalVisible, setModalVisible] = useState();
    return(
        <>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={setModalVisible}
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
               
             

             

             
              </ScrollView>
              
   
      

          </View>
        </View>

        
      </Modal>
     
    </View>
        
        </>
    )
}

export default ProfileModal;

const styles = StyleSheet.create({
   
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