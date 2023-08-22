import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [apiTokenResponse, setApiTokeResponse] = useState({});
  const [apiArtistResponse, setApiArtistResponse] = useState({});
  async function fetchSpotifyKey() {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: '6d11100f0f9a4af9830528e541b62c41',
          client_secret: '8d73b6f71aad40e99f89a948acf6b282'
        }).toString(),
      }
    );
    const json = await response.json();
    console.log(json);
    return json;
  }

  async function fetchSpotifyArtist(){
    const artistRes = await fetch('https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiTokenResponse?.access_token
      }
    });
    const resJson = await artistRes.json();
    console.log(resJson);
    return resJson;
  }

  useEffect(() => {

    fetchSpotifyKey().then((obj) => {
      setApiTokeResponse(obj);
    });

    fetchSpotifyArtist().then((artist) => {
      setApiArtistResponse(artist);
    })

  }, []);

  // useEffect(() => {
  //   async function fetchSpotifyArtist(){
  //     const artistRes = await fetch('https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4',
  //     {
  //       method: 'GET',
  //       headers: {
  //         Authorization: 'Bearer ' + apiTokenResponse?.access_token
  //       }
  //     });
  //     const resJson = await artistRes.json();
  //     console.log(resJson);
  //     return resJson;
  //   }

  //   fetchSpotifyArtist().then((artist) => {
  //     setApiArtistResponse(artist);
  //   })
  // }, [apiArtistResponse])

  return (
    <View style={styles.container}>
      <Text>{apiArtistResponse?.name} has {apiArtistResponse?.followers?.total} followers on Spotify</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
