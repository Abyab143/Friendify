import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import BottomNavigationBar from './BottomNavigationBar';
import TopHome from './TopHome';
import Folowing from './Folowing';
import Post from './Post';
import axios from 'axios';

const Home = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          'https://instagram-hy5g.onrender.com/api/post/allpost',
        );
        setPosts(response.data.Post.reverse());
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, [navigation]); // Ensure this effect runs only once after component mount

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TopHome navigation={navigation} />
        <View style={styles.line} />
        <Folowing navigation={navigation} />
        <View style={styles.line} />
        <ScrollView style={{padding: 5}}>
          {posts.map(post => (
            <Post key={post._id} post={post} navigation={navigation} />
          ))}
        </ScrollView>
      </View>
      {/* Render the BottomNavigationBar only if the navigation prop exists */}
      {navigation && <BottomNavigationBar />}
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
});

export default Home;
