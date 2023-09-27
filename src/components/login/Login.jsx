import { useEffect } from 'react';
import React from 'react';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from 'expo-auth-session';

// Initialize the WebBrowser module
WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = '457b88f6f5dd407a8683c27c824f1074';
const REDIRECT_URI = makeRedirectUri({
  // Use the default path
  useProxy: true,
});

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SERVER_URL = `http://${Constants.expoGoConfig.debuggerHost
  ?.split(':')
  .shift()}:3000`;

export default function Login() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      responseType: ResponseType.Code,
      scopes: ['user-read-email', 'playlist-modify-public'], // example scopes, add according to your app's requirement
      usePKCE: false,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('code: ', code);
      console.log('redirect uri: ', REDIRECT_URI);
      console.log('server-url: ', SERVER_URL);

      //Fetch the access token from your Express server
      fetch(`${SERVER_URL}/get-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          const { accessToken, refreshToken } = data;
          console.log('Access Token:', accessToken);
          console.log('Refresh Token:', refreshToken);
          // Handle the tokens (e.g., save them, make further API calls)
        })
        .catch((error) => {
          console.error('Error fetching tokens:', error);
        });
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login with Spotify"
      onPress={() => {
        promptAsync();
      }}
    />
  );

}

