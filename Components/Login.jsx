import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const handlelogin = async () => {
    if (email == '' || password == '') {
      return alert('Please Enter all fields');
    }
    try {
      const user = await axios.post(
        'https://instagram-hy5g.onrender.com/api/user/login',
        {
          email,
          password,
        },
      );
      console.log(user);
      const jsonValue = JSON.stringify(user.data.user);
      await AsyncStorage.setItem('user', jsonValue);
      alert(`Welcome back ${user.data.user.name}`);
      navigation.navigate('Home');
    } catch (err) {
      console.log(err.message);
      alert('login failed');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Friendify</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.inputbtn}
        onChangeText={val => setemail(val)}
        value={email}
      />
      <TextInput
        placeholder="Enter Your passwords"
        style={styles.inputbtn}
        secureTextEntry={true}
        value={password}
        onChangeText={val => setpassword(val)}
      />
      <View style={styles.forgetPassword}>
        <Text style={{color: 'blue', fontSize: 20, marginRight: 30}}>
          {' '}
          Forget?
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handlelogin}>
          Login
        </Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        You don't have an account?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 36,
    color: 'green',
    fontFamily: 'serif',
    marginBottom: 20,
  },
  inputbtn: {
    height: 50,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#af9f85',
  },
  forgetPassword: {
    alignSelf: 'flex-end', // Align the button to the righ
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  registerText: {
    fontSize: 20,
    fontFamily: 'serif',
  },
  registerLink: {
    fontSize: 24,
    fontFamily: 'serif',
    color: 'blue',
  },
});
