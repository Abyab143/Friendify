import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import First from './First';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Search from './Search';
import Add from './Add';
import Profile from './Profile';
import Coment from './Coment';
import Userdetails from './Userdetails';

const Stack = createNativeStackNavigator();

const Menu = () => {
  return (
    <Stack.Navigator initialRouteName="First">
      <Stack.Screen
        name="First"
        component={First}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="add" component={Add} options={{headerShown: false}} />
      <Stack.Screen
        name="search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="user"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="coment"
        component={Coment}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="userdetails"
        component={Userdetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Menu;

const styles = StyleSheet.create({});
