import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BottomNavigationBar from './BottomNavigationBar';
import Post from './Post';

const Profile = ({navigation}) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        const user = await axios.get(
          `https://instagram-hy5g.onrender.com/api/user/users/${userData._id}`,
        );
        setUser(user.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();

    if (user._id) {
      const getPosts = async () => {
        try {
          const response = await axios.get(
            `https://instagram-hy5g.onrender.com/api/post/user/${user._id}`,
          );
          setPosts(response.data.post.reverse());
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      getPosts();
    } else {
      console.log('User not logged in');
    }
  }, [user]); // Run this effect only when 'user' changes

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      alert('User Logout sucessfully');
      navigation.navigate('Login');
      // Redirect to the login screen or do any other necessary actions after logout
    } catch (error) {
      console.log('Error while logging out:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 20,
              justifyContent: 'flex-end',
              marginRight: 20,
            }}>
            <Text style={{fontSize: 20, marginVertical: 10}}>
              {user.username}
            </Text>
            <TouchableOpacity onPress={handleLogout}>
              <Image
                source={require('../Image/check-out.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
            <View
              style={{
                borderRadius: 60,
                backgroundColor: '#ffff',
                width: 120,
                height: 120,
                alignItems: 'center',
              }}>
              <Image
                source={
                  user.profilePic
                    ? {uri: user.profilePic}
                    : require('../Image/people.png')
                }
                style={styles.profileImage}
              />
            </View>
            <View style={{margin: 5, alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>{posts.length}</Text>
              <Text style={{fontSize: 15, fontFamily: 'serif'}}>Posts</Text>
            </View>
            <View style={{margin: 10, alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>
                {Array.isArray(user.followers) ? user.followers.length : 0}
              </Text>
              <Text style={{fontSize: 15, fontFamily: 'serif'}}>Followers</Text>
            </View>
            <View style={{margin: 10, alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>
                {Array.isArray(user.following) ? user.following.length : 0}
              </Text>
              <Text style={{fontSize: 15, fontFamily: 'serif'}}>Following</Text>
            </View>
          </View>

          <View style={{marginLeft: 20}}>
            <Text style={{fontFamily: 'serif', fontSize: 20}}>{user.name}</Text>
            <Text style={{fontFamily: 'serif', fontSize: 15}}>{user.bio}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register', {user: user})}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={{marginLeft: 20}}>
            <Text style={{fontFamily: 'serif', fontSize: 20, marginBottom: 10}}>
              Your Posts
            </Text>
          </View>
          <View>
            {posts.map(post => (
              <Post key={post._id} post={post} navigation={navigation} />
            ))}
          </View>
        </View>
      </ScrollView>
      {navigation && <BottomNavigationBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
  profileImage: {
    width: 120,
    height: 130,
    borderRadius: 75,
  },
});

export default Profile;
