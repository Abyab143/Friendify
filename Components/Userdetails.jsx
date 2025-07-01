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

const Userdetails = ({navigation, route}) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [curuser, setcuruser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (route.params.id) {
          const user = await axios.get(
            `https://instagram-hy5g.onrender.com/api/user/users/${route.params.id}`,
          );
          setUser(user.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, [route.params.id]);

  useEffect(() => {
    if (user) {
      getcuruser();
      if (user._id) {
        const getPosts = async () => {
          try {
            const response = await axios.get(
              `https://instagram-hy5g.onrender.com/api/post/user/${user._id}`,
            );
            setPosts(response.data.post);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };

        getPosts();
      } else {
        console.log('User not logged in');
      }
    }
  }, [user]);

  const getcuruser = async () => {
    const jsonValue = await AsyncStorage.getItem('user');
    const storedUser = jsonValue ? JSON.parse(jsonValue) : null;
    setcuruser(storedUser);
    if (storedUser && curuser) {
      if (user._id && curuser.following) {
        const following = curuser.following.includes(user._id);
        setIsFollowing(following);
      }
    }
  };

  const unfollow = async () => {
    if (curuser._id && user._id) {
      try {
        const response = await axios.put(
          `https://instagram-hy5g.onrender.com/api/user/follow/${user._id}/${curuser._id}`,
        );
        console.log(response);
        alert(response.data.message);
      } catch (error) {
        console.error('Error unfollowing user:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, textAlign: 'center', marginVertical: 10}}>
            {user.username}
          </Text>
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
            style={{
              backgroundColor: isFollowing ? 'red' : 'blue',
              borderRadius: 10,
              width: '90%',
              paddingVertical: 12,
              paddingHorizontal: 20,
              alignSelf: 'center',
              marginTop: 5,
            }}
            onPress={unfollow}>
            <Text style={styles.buttonText}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={{marginLeft: 20}}>
            <Text style={{fontFamily: 'serif', fontSize: 20, marginBottom: 10}}>
              Your Posts
            </Text>
          </View>
          <View>
            {posts.map(post => (
              <Post key={post._id} post={post} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Userdetails;
