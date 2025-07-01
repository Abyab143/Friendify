import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import Postuser from './Postuser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Post from './Post';
import UserComents from './UserComents';

const Coment = ({route, navigation}) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (route.params && route.params.post) {
      setPost(route.params.post);
    }
  }, [route.params]);

  useEffect(() => {
    if (post._id) {
      getComments();
    }
  }, [post]);

  const getComments = async () => {
    try {
      const response = await axios.get(
        `https://instagram-hy5g.onrender.com/api/post/coment/get/${post._id}`,
      );
      setComments(response.data.Coment);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Post post={post} />
        <Text style={{fontSize: 20, fontFamily: 'serif', marginLeft: 20}}>
          Post Coments
        </Text>
        <View>
          {comments.length == 0 && (
            <Text style={{fontSize: 20, fontFamily: 'serif', margin: 20,backgroundColor:'yellow',padding:10}}>
              You have no any coments for this post . Add new coments using coment buttons
            </Text>
          )}
          {comments.map(item => (
            <UserComents key={item._id} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Coment;
