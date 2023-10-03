import { useEffect, useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import * as Constants from '../../common/constants';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from 'expo-auth-session';

// Initialize the WebBrowser module
WebBrowser.maybeCompleteAuthSession();

const REDIRECT_URI = makeRedirectUri({
  // Use the default path
  useProxy: true,
});

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};
// eslint-disable-next-line react/prop-types
export default function Login({ navigation }) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.CLIENT_ID,
      redirectUri: REDIRECT_URI,
      responseType: ResponseType.Code,
      scopes: ['user-read-email', 'playlist-modify-public', 'ugc-image-upload'], // example scopes, add according to your app's requirement
      usePKCE: false,
    },
    discovery
  );

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const getSpotifyToken = async (code) => {
    try {
      const response = await axios.post(
        `${Constants.SERVER_URL}/get-token`,
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { accessToken, refreshToken } = response.data;
      // console.log('Access Token:', accessToken);
      // console.log('Refresh Token:', refreshToken);
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
      navigation.navigate('Home');
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tokens:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      getSpotifyToken(code);
    }
  }, [response]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    //use logic here to determine if refresh token already exists in asyncstorage and if it does bypass login screen
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('../../../assets/cloud.png')}
          style={styles.logo}
        />
        <Text style={styles.splashText}>ForeCastFrequencies</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <Modal transparent={true} animationType={'none'}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={true} size="large" color="#00ff00" />
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <SafeAreaView style={styles.login}>
        <Image
          source={require('../../../assets/cloud.png')}
          style={styles.logo}
        />
        <TextInput
          label="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" style={styles.login_button}>
          <Text style={styles.text}>Login</Text>
        </Button>
        <TouchableOpacity
          mode="contained"
          disabled={!request}
          onPress={() => {
            setLoading(true);
            promptAsync();
          }}
          style={styles.spotify_button}
        >
          <View style={styles.innerView}>
            <FontAwesome5
              name="spotify"
              size={24}
              color="black"
              style={styles.spotify_logo}
            />
            <Text style={styles.text}>Login with Spotify</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    marginLeft: 12,
    marginRight: 12,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
    width: 150,
    height: 150,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  spotify_button: {
    marginTop: 12,
    backgroundColor: '#1DB954', // Spotify green color
    paddingHorizontal: 35,
    padding: 7,
    borderRadius: 30, // Round corners
    elevation: 5, // Add elevation (Android)
    shadowColor: '#000', // Shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginLeft: 12,
    marginRight: 12,
  },

  login_button: {
    marginLeft: 12,
    marginRight: 12,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spotify_logo: {
    marginRight: 12,
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040', // Semi-transparent background
  },
  activityIndicatorWrapper: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
