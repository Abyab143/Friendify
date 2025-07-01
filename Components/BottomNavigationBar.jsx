import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNavigationBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../Image/home.png')}
          style={[styles.iconStyle,]}
        />
        <Text
          style={[
            styles.tabText,
            route.name === 'Home' && styles.activeTabText,
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('search')}>
        <Image
          source={require('../Image/search.png')}
          style={[styles.iconStyle]}
        />
        <Text
          style={[
            styles.tabText,
            route.name === 'search' && styles.activeTabText,
          ]}>
          Search
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('add')}>
        <Image
          source={require('../Image/plus.png')}
          style={[styles.iconStyle]}
        />
        <Text
          style={[
            styles.tabText,
            route.name === 'add' && styles.activeTabText,
          ]}>
          Add
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('user')}>
        <Image
          source={require('../Image/user.png')}
          style={[styles.iconStyle]}
        />
        <Text
          style={[
            styles.tabText,
            route.name === 'user' && styles.activeTabText,
          ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
  },
  iconStyle: {
    height: 30, // Adjust the height of the image
    width: 30, // Adjust the width of the image
  },
  activeIcon: {
    tintColor: 'orange', // Use tintColor to change color of image
  },
  tabText: {
    fontSize: 12,
  },
  activeTabText: {
    color: 'orange',
  },
});

export default BottomNavigationBar;
