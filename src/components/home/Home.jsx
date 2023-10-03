import {
  StyleSheet,
  View,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Text, SegmentedButtons } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import * as Constants from '../../common/constants';
import VerticalText from 'react-native-vertical-text';
import MusicPlayer from '../music/MusicPlayer';

const { width, height } = Dimensions.get('window');

const Home = ({ userName = 'Nick', location = 'London,UK' }) => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const getUserData = async (token) => {
    try {
      const response = await axios.get(
        `${Constants.SERVER_URL}/spotify-user?token=${token}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const getToken = () => {
    SecureStore.getItemAsync('accessToken').then((token) => {
      setToken(token);
      getUserData(token);
    });
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.post(
        `${Constants.SERVER_URL}/timeline-weather`,
        { location },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error retrieving weather data frontend:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getToken();
    getWeatherData();
  }, []);

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
      <>
        <View style={[styles.row, styles.spaceBetween]}>
          <View>
            <Text variant="headlineMedium">
              Hello {userData?.display_name ?? 'User'}!
            </Text>
          </View>
          <View>
            <Text variant="titleSmall">Menu</Text>
          </View>
        </View>
        <View>
          <Text variant="headlineMedium">Location</Text>
          <Text variant="titleSmall">{date.toDateString()}</Text>

         
        </View>
        <View style={[styles.row, styles.spaceBetween]}>
          <Text variant="displayLarge">Temp</Text>
          <Text>{`address: ${weatherData?.address}`}</Text>
          <LottieView
            source={require('../../../assets/sunny.json')}
            autoPlay
            loop
            style={{ width: 100, height: 100, backgroundColor: '#eee' }}
          />
          {/* <Text>{`cloudcover: ${apiResponse?.currentConditions?.cloudcover}`}</Text> */}
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
                label: 'Hourly',
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
            {userData ? (
              <Text>{userData.display_name}</Text>
            ) : (
              <Text>Loading...</Text>
            )}
            <MusicPlayer />
          </View>
        </SafeAreaView>
      </>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  musicPlayer: {
    position: 'absolute',
    marginTop: -50,
    alignItems: 'center',
  },
  segmentedButtons: {
    position: 'absolute',
    marginTop: -100,
    padding: 0,
  },
  data: {
    position: 'absolute',
    marginTop: 30,
  },
  lottie: {
    width: 300,
    height: 200,
  },
});
