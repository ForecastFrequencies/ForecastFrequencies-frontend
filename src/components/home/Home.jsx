import { StyleSheet, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Text, SegmentedButtons } from 'react-native-paper';
import axios from 'axios';
import * as constants from '../../common/constants'
import VerticalText from 'react-native-vertical-text';
import MusicPlayer from '../music/MusicPlayer';

const Home = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState('');

  const getUserData = (async (token) =>{
    try {
      const response = await axios.get(`${constants.SERVER_URL}/spotify-user?token=${token}`);
      console.log(response.data);
      setUserData(response.data);
    }
    catch (error) {
      console.error('Failed to fetch user data:', error);
    }

  })

  const getToken = () => {
    SecureStore.getItemAsync('accessToken').then((token) => {
      setToken(token);
      getUserData(token);
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <View style={[styles.row, styles.spaceBetween]}>
        <View>
          <Text variant="headlineMedium">Good Morning Nick!</Text>
        </View>
        <View>
          <Text variant="titleSmall">Menu</Text>
        </View>
      </View>
      <View>
        <Text variant="headlineMedium">Location</Text>
        <Text variant="titleSmall">today's date</Text>
      </View>
      <View style={[styles.row, styles.spaceBetween]}>
        <Text variant="displayLarge">Temp</Text>
        <VerticalText
          style={{ color: 'black', fontSize: 15 }}
          text={'clear sky'}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value="hourly"
          buttons={[
            {
              value: 'hourly',
              label: 'hourly',
            },
            {
              value: '3day',
              label: '3-day',
            },
            { value: '5day', label: '5-day' },
          ]}
          style={styles.segmentedButtons}
        />
        {/* <View>
          {userData ? (<Text>{userData.display_name}</Text>) : (<Text>Loading...</Text>)}
        </View> */}
        <View style={styles.musicPlayer}>
          {userData ? (<Text>{userData.display_name}</Text>) : (<Text>Loading...</Text>)}
          <MusicPlayer/>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  musicPlayer:{
    position: 'absolute',
    marginTop: -50,
    alignItems: 'center',
  },
  segmentedButtons: {
    position: 'absolute',
    marginTop: -100,
    padding: 0
  },
  data: {
    position: 'absolute',
    marginTop: 30
  }
});
