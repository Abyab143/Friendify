import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, Text, Image} from 'react-native';
const UserComents = ({item}) => {
  const [user, setuser] = useState({});
  useEffect(() => {
    const getuser = async () => {
      const user = await axios.get(
        `https://instagram-hy5g.onrender.com/api/user/users/${item.userid}`,
      );
      setuser(user.data.user);
    };
    if (item.userid) {
      getuser();
    }
  }, [item]);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              borderRadius: 60,
              backgroundColor: '#ffff',
              width: 60,
              height: 60,
            }}>
            <Image
              source={require('../Image/man.png')}
              style={{width: 60, height: 60}}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 15, fontFamily: 'serif'}}>
              {user.name}
            </Text>
            <Text style={{fontSize: 20, fontFamily: 'serif'}}>
              {item.coments}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserComents;
