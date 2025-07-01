import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const TopHome = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'center', // Added to vertically center the items
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('add')}>
        <Image
          source={require('../Image/camra.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>

      <Text style={{fontSize: 20, fontFamily: 'serif', color: 'green'}}>
        Friendify
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('search')}>
        <Image
          source={require('../Image/send.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopHome;
