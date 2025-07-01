import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Button,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Postuser from './Postuser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Post = ({post, navigation}) => {
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [coment, setcoment] = useState('');

  useEffect(() => {
    getUser();
  }, [post]);

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userData = jsonValue ? JSON.parse(jsonValue) : null;
      const response = await axios.get(
        `https://instagram-hy5g.onrender.com/api/user/users/${userData._id}`,
      );
      const fetchedUser = response.data.user;
      setUser(fetchedUser);
      if (fetchedUser) {
        const isPostLiked = post.likes?.includes(fetchedUser._id);
        setIsLiked(isPostLiked);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const like = async () => {
    try {
      const res = await axios.put(
        `https://instagram-hy5g.onrender.com/api/post/like/${post._id}/${user._id}`,
      );
      if (res.data) {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const sharePost = () => {
    const message = `Check out this post on Instagram: ${
      post.caption
    } ${encodeURIComponent(post.imageUrl)}`;
    Linking.openURL(`whatsapp://send?text=${message}`);
  };
  const handlecoments = () => {
    if (coment != '') {
      const res = axios.post(
        'https://instagram-hy5g.onrender.com/api/post/coment/add',
        {
          userid: user._id,
          postid: post._id,
          coments: coment,
        },
      );
      console.log(res);
      alert('coment added sucessfully');
    } else {
      alert('write coment first');
    }
  };
  return (
    <View>
      <Postuser id={post.userid} navigation={navigation} />
      <Text style={{fontSize: 15, fontFamily: 'serif', marginHorizontal: 10}}>
        {post.caption}
      </Text>
      <Image
        source={
          post.imageUrl ? {uri: post.imageUrl} : require('../Image/post1.jpeg')
        }
        style={{width: '100%', height: 300, marginTop: 5}}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 30,
          margin: 5,
          justifyContent: 'space-between',
        }}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 30}}>
          <TouchableOpacity onPress={like}>
            <View>
              <Image
                source={
                  isLiked
                    ? require('../Image/redheart.png')
                    : require('../Image/heart.png')
                }
                style={{width: 40, height: 40}}
              />
              <Text>{`${post.likes?.length || 0} Likes`}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('coment', {post: post})}>
            <View>
              <Image
                source={require('../Image/chat.png')}
                style={{width: 40, height: 40}}
              />
              <Text>{`Comments`}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={sharePost}>
          <Image
            source={require('../Image/send.png')}
            style={{width: 40, height: 40, marginRight: 20}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          marginLeft: 5,
        }}>
        <TextInput
          placeholder="Enter Your Comment here"
          style={{
            backgroundColor: '#ffff',
            padding: 10,
            borderRadius: 10,
            width: '65%',
          }}
          value={coment}
          onChangeText={text => setcoment(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handlecoments}>
          <Text style={styles.buttonText}>Coments</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
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
});

export default Post;
