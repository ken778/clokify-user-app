import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import logo from './assets/clock.png'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import ClockIn from './components/ClockIn'
import ClockOut from './components/ClockOut'
import { ToastProvider } from 'react-native-toast-notifications'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Slash from './components/Slash';
import Profile from './components/Profile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from './components/Landing';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
export default function App() {


  return (
    <>
 
       <NavigationContainer>
      <Stack.Navigator>
     
      <Stack.Screen name="slash" component={Slash} options={{headerShown:false}} />
        <Stack.Screen name='Login'  component={Login} options={{headerShown:false}} /> 
        <Stack.Screen name='profile'  component={Profile} options={{headerShown:false}} /> 
        
        <Stack.Screen name="signup" component={SignUp} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Clokin" component={ClockIn} options={{headerShown:false}} />
        <Stack.Screen name="lockout" component={ClockOut} options={{headerShown:false}} />
        <Stack.Screen name="landing" component={Landing} options={{headerShown:false}} />
         
      </Stack.Navigator>
    </NavigationContainer> 


{/* <NavigationContainer>
<Tab.Navigator>

      <Tab.Screen name="Home" component={Login}
       options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Entypo name="home" size={24} color={color} />
        ),
      }} />
      
  </Tab.Navigator>
</NavigationContainer> */}


    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center',
  },
});
