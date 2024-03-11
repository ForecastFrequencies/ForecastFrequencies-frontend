import { StyleSheet, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Text, Divider } from 'react-native-paper';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import * as constants from '../../common/constants';
import { getBackgroundColor, getTextColor } from '../../common/utils';
import MusicPlayer from '../music/MusicPlayer';
import tinycolor from 'tinycolor2';
import CurrentWeatherInfo from './CurrentWeatherInfo';
import WeatherDataTable from './WeatherDataTable';

navigator.geolocation = require('expo-location');

const Home = ({ route }) => {
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState('');
  const [weatherData, setWeatherData] = useState(undefined);
  const [scrollableTab, setScrollableTab] = useState('HOURLY');
  const [daysForecast, setDaysForecast] = useState([{}]);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#000000');
  const [loading, setLoading] = useState(false);
  const [userPlaylist, setUserPlaylist] = useState({});

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${constants.SERVER_URL}/spotify-user?token=${token}`
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
    const url = location ? `${constants.SERVER_URL}/timeline-weather?${location}` : `${constants.SERVER_URL}/timeline-weather?location=London,UK`;
    try {
      const response = await axios.post(
        url
      );
      setWeatherData(response.data);
      getPlaylist(response.data);
      const color = getBackgroundColor(
        response.data?.currentConditions?.conditions
      );
      setBackgroundColor(color);
      setCardBackgroundColor(tinycolor(color).darken(25).toString());
      setTextColor(getTextColor(color));
    } catch (error) {
      console.error('Error retrieving weather data frontend:', error);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationErrorMsg('Permission to access location was denied');
      return;
    }
    Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
      timeout: 5000
    }).then(res => {
      if (!location)
        setLocation(`${res.coords.latitude},${res.coords.longitude}`)
      setCurrentLocation(`${res.coords.latitude},${res.coords.longitude}`);
    })
      .catch(e => console.log(e));
  };

  const setToCurrentLocation = () => {
    setLocation(currentLocation);
  }

  const getPlaylist = async (weatherData) => {
    try {
      const res = await axios.get(`${constants.SERVER_URL}/playlist?token=${token}&weather_cond=${weatherData.currentConditions.icon}`);
      setUserPlaylist(res.data);

    } catch (error) {
      console.log('Failed to fetch user playlist: ', error.code);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    setLoading(true);
    getToken();
    getWeatherData();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (location)
      getWeatherData();
  }, [location])

  useEffect(() => {
    if (route.params.location) {
      setLocation(route.params.location);
    }

  }, [route.params]);

  useEffect(() => {
    setDaysForecast(
      scrollableTab === 'THREE_DAY'
        ? weatherData?.days?.slice(0, 3)
        : scrollableTab === 'FIVE_DAY'
          ? weatherData?.days?.slice(0, 5)
          : scrollableTab === 'HOURLY'
            ? weatherData?.days?.[0]?.hours
            : [{}]
    );
  }, [weatherData, scrollableTab]);
  if (loading || weatherData === '') {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (locationErrorMsg) {
    return (
      <View>
        <Text>{locationErrorMsg}</Text>
      </View>
    );
  }
  else {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: backgroundColor }]}
      >

        {weatherData && (
          <>
            <View style={styles.currentWeatherInfo}>
              <CurrentWeatherInfo
                backgroundColor={backgroundColor}
                weatherData={weatherData}
                textColor={textColor}
                cardBackgroundColor={cardBackgroundColor}
                location={location}
                setToCurrentLocation={setToCurrentLocation}
              />
            </View>
            <Divider />
            <View style={styles.weatherDataTable}>
              <WeatherDataTable
                scrollableTab={scrollableTab}
                setScrollableTab={setScrollableTab}
                daysForecast={daysForecast}
                backgroundColor={backgroundColor}
                cardBackgroundColor={cardBackgroundColor}
              />
            </View>
          </>
        )}

        <View style={styles.musicPlayerBox}>
          <MusicPlayer />
        </View>

      </SafeAreaView>
    );
  }
};

Home.propTypes = {
  route: PropTypes.shape({ params: PropTypes.shape({ location: PropTypes.string }) }),
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currentWeatherInfo: {
    flex: 2,
  },
  weatherDataTable: {

    flex: 1,
  },
  musicPlayerBox: {

    flex: 1,
  },
});
