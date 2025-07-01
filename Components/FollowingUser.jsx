import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const FollowingUser = ({id, navigation}) => {
  const [user, setuser] = useState({});
  useEffect(() => {
    const getuser = async () => {
      const user = await axios.get(
        `https://instagram-hy5g.onrender.com/api/user/users/${id}`,
      );
      setuser(user.data.user);
    };
    getuser();
  }, [id]);

  return (
    <View>
      <View
        style={{
          borderRadius: 60,
          backgroundColor: '#ffff',
          width: 60,
          height: 60,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('userdetails', {id: id})}>
          <Image
            source={
              user.profilePic
                ? {uri: user.profilePic}
                : require('../Image/man.png')
            }
            style={{width: 60, height: 60, borderRadius: 50}}
          />
          <Text style={{fontFamily: 'serif', fontSize: 15}}>{user.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FollowingUser;
