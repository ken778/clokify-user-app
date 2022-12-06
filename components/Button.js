import { View, Text ,StyleSheet,Alert, Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'

import {Dimensions} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Button = ({onPress})=>{
    return(
        <>
        <Pressable onPress={onPress}>
             <View style={styles.moreButton}>

            <Text style={{color:'white', textAlign:'center'}}>tesing</Text></View>
           </Pressable>
        </>
    )
}

export default Button;

const styles = StyleSheet.create({

    moreButton:{
      width:windowWidth*0.3,
      backgroundColor:'#4b97cb',
      padding:12,
      marginTop:10,
      alignSelf:'center',
      borderRadius:15
    },
})