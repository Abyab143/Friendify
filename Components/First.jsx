import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const First = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      getUser();
    }, 5000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      navigation.navigate(userData ? 'Home' : 'Login');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const logo = require('../Image/friendify.png');

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.name}>Friendify</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
  name: {
    fontSize: 30,
    color: 'green',
    fontFamily: 'serif',
  },
});

export default First;
