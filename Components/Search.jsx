import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomNavigationBar from './BottomNavigationBar';
import User from './User';
import axios from 'axios';

const Search = ({navigation}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          'https://instagram-hy5g.onrender.com/api/user/users',
        );
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUser();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{margin: 10}}>
          <TextInput
            placeholder="Search User here with name or username"
            style={styles.inputbtn}
          />
          <Button title="Search" color="green" />
          <View style={styles.line} />
        </View>
        <ScrollView>
          <View style={{padding: 5, gap: 10}}>
            {/* Corrected mapping of user array */}
            {user.map(userData => (
              <User key={userData._id} userData={userData} navigation={navigation}/>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* Render the BottomNavigationBar only if the navigation prop exists */}
      {navigation && <BottomNavigationBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputbtn: {
    height: 50,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#af9f85',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
});

export default Search;
