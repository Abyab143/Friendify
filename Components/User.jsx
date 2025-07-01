import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = ({userData, navigation}) => {
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const storedUser = jsonValue ? JSON.parse(jsonValue) : null;
        if (storedUser) {
          const response = await axios.get(
            `https://instagram-hy5g.onrender.com/api/user/users/${storedUser._id}`,
          );
          setUser(response.data.user);
          if (response.data.user) {
            const following = response.data.user.following.includes(
              userData._id,
            );
            setIsFollowing(following);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, [userData]);

  const followUser = async () => {
    if (!user) {
      return alert('Please login to follow');
    }

    try {
      const response = await axios.put(
        `https://instagram-hy5g.onrender.com/api/user/follow/${userData._id}/${user._id}`,
      );
      setIsFollowing(!isFollowing);
      alert(response.data.message);
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('userdetails', {id: userData._id})
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderRadius: 60,
                backgroundColor: '#ffff',
                width: 60,
                height: 60,
              }}>
              <Image
              source={
                userData.profilePic
                  ? {uri: userData.profilePic}
                  : require('../Image/man.png')
              }
              style={{width: 60, height: 60,borderRadius:50}}
            />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 15, fontFamily: 'serif'}}>
                {userData.name}
              </Text>
              <Text style={{fontSize: 20, fontFamily: 'serif'}}>
                {userData.username}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: isFollowing ? 'red' : 'blue',
            borderRadius: 10,
            padding: 10,
          }}
          onPress={followUser}>
          <Text style={{color: 'white', fontSize: 20}}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default User;
