import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Login = ({ route, navigation }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [name, setname] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [bio, setbio] = useState('');
  const [userid, setusrid] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (route.params) {
      const { user } = route.params;
      setname(user.name);
      setemail(user.email);
      setSelectedGender(user.gender);
      setusername(user.username);
      setbio(user.bio);
      setusrid(user._id);
      setProfileImage(user.profilePic);
      setImageURL(user.profilePic);
    }
  }, [navigation]);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
          granted['android.permission.CAMERA'] === 'granted' &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleGenderSelection = gender => {
    setSelectedGender(gender);
  };

  const login = () => {
    navigation.navigate('Login');
  };

  const pickImage = async source => {
    let result = null;
    if (source === 'camera') {
      ImagePicker.launchCamera(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            setProfileImage(response.assets[0].uri);
          }
        },
      );
    } else {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            setProfileImage(response.assets[0].uri);
          }
        },
      );
    }
  };

  const uploadprofile = async () => {
    const imageUri = profileImage;
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

    const reference = storage().ref(`Profile_Image/${filename}`);

    try {
      await reference.putFile(uploadUri);
      console.log('Image uploaded successfully!');
      const downloadURL = await reference.getDownloadURL();
      console.log(downloadURL);
      setImageURL(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const updateprofile = async () => {
    try {
      const url = profileImage && (await uploadprofile());
      const data = {
        name: name,
        email: email,
        username: username,
        gender: selectedGender,
        profilePic: url || imageURL,
        bio: bio,
      };
      if (password) {
        data.password = password;
      }
      const response = await axios.put(
        `https://instagram-hy5g.onrender.com/api/user/update/${userid}`,
        data,
      );
      alert('User updated successfully');
      return navigation.navigate('user');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async () => {
    if (
      name === '' ||
      username === '' ||
      password === '' ||
      email === '' ||
      selectedGender === '' ||
      bio === '' ||
      profileImage === null
    ) {
      return alert('Please enter all fields and select a profile picture');
    }
    if (!(password.length >= 5)) {
      return alert('Please enter at least a 5-digit password');
    }
    try {
      const url = profileImage && (await uploadprofile());
      const user = await axios.post(
        'https://instagram-hy5g.onrender.com/api/user/register',
        {
          name: name,
          email: email,
          username: username,
          password: password,
          gender: selectedGender,
          profilePic: url || imageURL,
          bio: bio,
        },
      );
      alert(user.data.message);
      if (user.data.user) {
        navigation.navigate('Login');
      }
    } catch (err) {
      return alert(err.message);
    }
  };

  return (
    <ScrollView style={{ marginBottom: 10 }}>
      <View style={styles.container}>
        <Text style={styles.name}>Friendify</Text>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../Image/people.png')
          }
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.addImageButton}
          onPress={() => pickImage('gallery')}>
          <Text style={styles.addImageText}>Add from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addImageButton}
          onPress={() => pickImage('camera')}>
          <Text style={styles.addImageText}>Take a Photo</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Enter your Name"
          style={styles.inputbtn}
          onChangeText={val => setname(val)}
          value={name}
        />
        <TextInput
          placeholder="Enter unique username"
          style={styles.inputbtn}
          onChangeText={val => setusername(val)}
          value={username}
        />
        <TextInput
          placeholder="Enter your email"
          style={styles.inputbtn}
          onChangeText={val => setemail(val)}
          value={email}
        />

        <TextInput
          placeholder="Enter Your passwords"
          style={styles.inputbtn}
          secureTextEntry={true}
          onChangeText={val => setpassword(val)}
          value={password}
        />
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === 'Male' && styles.selectedGender,
            ]}
            onPress={() => handleGenderSelection('Male')}>
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === 'Female' && styles.selectedGender,
            ]}
            onPress={() => handleGenderSelection('Female')}>
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === 'Other' && styles.selectedGender,
            ]}
            onPress={() => handleGenderSelection('Other')}>
            <Text style={styles.genderText}>Other</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Write something About you"
          style={styles.inputbtn}
          onChangeText={val => setbio(val)}
          value={bio}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={route.params ? updateprofile : handleRegister}>
          <Text style={styles.buttonText}>
            {route.params ? 'Update' : 'Register'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          You already have an account?{' '}
          <Text style={styles.registerLink} onPress={login}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 36,
    color: 'green',
    fontFamily: 'serif',
  },
  inputbtn: {
    height: 50,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#af9f85',
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  genderButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selectedGender: {
    backgroundColor: '#4CAF50',
  },
  genderText: {
    color: '#af9f85',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  registerText: {
    fontSize: 20,
    fontFamily: 'serif',
  },
  registerLink: {
    fontSize: 24,
    fontFamily: 'serif',
    color: 'blue',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  addImageButton: {
    marginBottom: 10,
  },
  addImageText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});
