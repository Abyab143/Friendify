import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import FollowingUser from './FollowingUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Following = ({navigation}) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const userData = jsonValue ? JSON.parse(jsonValue) : null;
        if (userData) {
          const response = await axios.get(
            `https://instagram-hy5g.onrender.com/api/user/users/${userData._id}`,
          );
          if (response.data.user && response.data.user.following) {
            setFollowing(response.data.user.following);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, [navigation]);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          gap:20,
          alignItems: 'center',
          marginBottom: 20,
          marginLeft:10
        }}>
        {following.map(id => (
          <FollowingUser key={id} id={id} navigation={navigation}/>
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

export default Following;
