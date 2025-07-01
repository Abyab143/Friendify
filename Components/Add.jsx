import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import BottomNavigationBar from './BottomNavigationBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [userid, setuserid] = useState('');

  const openCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const cancelImage = () => {
    setImage(null);
  };

  const uploadImageToFirebase = async () => {
    const imageUri = image;
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

    const reference = storage().ref(`images/${filename}`);

    try {
      await reference.putFile(uploadUri);
      console.log('Image uploaded successfully!');
      const downloadURL = await reference.getDownloadURL();
      setImageURL(downloadURL);
      // Now you can save this URL in your database or use it wherever needed
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      setuserid(userData._id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handlePost = async () => {
    if (image) {
      getUser();
      await uploadImageToFirebase();
      console.log('Caption:', caption);
      console.log('Image URL:', imageURL);
      if (imageURL != '' && userid != '') {
        const data = await axios.post(
          'https://instagram-hy5g.onrender.com/api/post/create',
          {
            userid: userid,
            caption: caption,
            imageUrl: imageURL,
          },
        );
        setImage(null);
        setCaption('');
        return alert('Post Uploaded sucessfully');
      } else {
        return alert('post upload failed');
      }
      // Implement your post logic here, such as sending the image URL and caption to your backend server
    } else {
      return alert('please select image first ');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, padding: 10}}>
        <TouchableOpacity style={styles.imagePickerButton} onPress={openCamera}>
          <Image
            source={require('../Image/camra.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={openGallery}>
          <Image
            source={require('../Image/gallary.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.buttonText}>Pick an image from gallery</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image && <Image source={{uri: image}} style={styles.image} />}
          {image && (
            <TouchableOpacity style={styles.cancelButton} onPress={cancelImage}>
              <Image
                source={require('../Image/cancel.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          style={styles.captionInput}
          placeholder="Write a caption..."
          value={caption}
          onChangeText={text => setCaption(text)}
        />
        <Button
          title="Post"
          onPress={handlePost}
          disabled={!image || !caption}
        />
      </View>
      {navigation && <BottomNavigationBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerButton: {
    backgroundColor: 'skyblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 20,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    width: '100%',
  },
});

export default Add;
