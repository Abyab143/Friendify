import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Postuser = ({id, navigation}) => {
  const [user, setuser] = useState({});
  useEffect(() => {
    const getuser = async () => {
      const user = await axios.get(
        `https://instagram-hy5g.onrender.com/api/user/users/${id}`,
      );
      setuser(user.data.user);
    };
    if (id) {
      getuser();
    }
  }, [id]);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('userdetails', {id: id})}
          style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <View
            style={{
              borderRadius: 60,
              backgroundColor: '#ffff',
              width: 60,
              height: 60,
              alignItems: 'center',
            }}>
            <Image
              source={
                user.profilePic
                  ? {uri: user.profilePic}
                  : require('../Image/man.png')
              }
              style={{width: 60, height: 60,borderRadius:50}}
            />
          </View>
          <Text style={{fontSize: 20, fontFamily: 'serif'}}>{user.name}</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../Image/more.png')}
        style={{width: 30, height: 30}}
      />
    </View>
  );
};

export default Postuser;
