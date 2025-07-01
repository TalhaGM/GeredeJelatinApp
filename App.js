import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AdminScreen from './Screens/AdminScreen';
import UserScreen from './Screens/UserScreen';
import LoginScreen from './Screens/LoginScreen';
import HomePage from './Screens/HomePage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        //<Stack.Screen name="Deneme1" component={HomePage} />
        //<Stack.Screen name="Deneme2" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Buraya ekleyecen**
