import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Text, SegmentedButtons, DataTable } from 'react-native-paper';
import axios from 'axios';
import * as constants from '../../common/constants';
// import VerticalText from 'react-native-vertical-text';
import MusicPlayer from '../music/MusicPlayer';

const Home = ({ route }) => {
  const { location } = route.params;
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [apiResponse, setApiResponse] = useState('');
  const [scrollableTab, setScrollableTab] = useState('HOURLY');
  const [daysForecast, setDaysForecast] = useState([{}]);
  const [userPlaylist, setUserPlaylist] = useState({});

  const getUserData = async (token) => {
    try {
      const response = await axios.get(
        `${constants.SERVER_URL}/spotify-user?token=${token}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error.code);
    }
  };

  const getToken = () => {
    //console.log('userData: ' + userData);
    SecureStore.getItemAsync('accessToken').then((token) => {
      setToken(token);
      getUserData(token);
    });
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.post(
        `${constants.SERVER_URL}/timeline-weather?location=${location}`
      );
      // console.log('WEATHER DATA', response.data);
      setApiResponse(response.data);
    } catch (error) {
      console.error('Error retrieving weather data frontend:', error);
    }
  };
  const getPlaylist = async(userData) => {
    try{
      const res = await axios.get(`${constants.BACKEND_DEV_SERVER_URL}/playlist?token=${token}&weather_cond=${apiResponse.currentConditions.icon}`);
      setUserPlaylist(res.data);

    }catch(error){
      console.log('Failed to fetch user playlist: ', error.code);
    }
  };


  useEffect(() => {
    //setLoading(true);
    getToken();
  }, []);
  useEffect(() => {
    getWeatherData();
  }, [location])

  useEffect(() => {
    setDaysForecast(
      scrollableTab === 'THREE_DAY'
        ? apiResponse?.days?.slice(0, 3)
        : scrollableTab === 'FIVE_DAY'
          ? apiResponse?.days?.slice(0, 5)
          : apiResponse?.days?.[0]?.hours
    );
  }, [scrollableTab, apiResponse]);

  useEffect(() => {
    getPlaylist(userData);

  }, [userData]);

  return (
    <>
      <View style={[styles.row]}>
        <View>
          <Text variant="headlineMedium">{`Good Morning ${userData?.display_name}`}</Text>
        </View>
      </View>
      <View>
        <Text variant="headlineMedium">{apiResponse?.address}</Text>
        <Text variant="titleSmall">{apiResponse?.days?.[0]?.datetime}</Text>
      </View>
      <View style={[styles.row, styles.spaceBetween]}>
        <Text variant="displayLarge">
          {apiResponse?.currentConditions?.temp}
        </Text>
        <Text>{apiResponse?.currentConditions?.conditions}</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={scrollableTab}
          buttons={[
            {
              value: 'HOURLY',
              label: 'hourly',
            },
            {
              value: 'THREE_DAY',
              label: '3-day',
            },
            { value: 'FIVE_DAY', label: '5-day' },
          ]}
          onValueChange={setScrollableTab}
        />
      </SafeAreaView>
      <SafeAreaView>
        <DataTable>
          <DataTable.Header>
            {(scrollableTab === 'THREE_DAY' ||
              scrollableTab === 'FIVE_DAY') && (
                <DataTable.Title>Date</DataTable.Title>
              )}
            {scrollableTab === 'HOURLY' && (
              <DataTable.Title>Time</DataTable.Title>
            )}
            <DataTable.Title>Temperature</DataTable.Title>
            <DataTable.Title>Rain</DataTable.Title>
            <DataTable.Title>Condition</DataTable.Title>
          </DataTable.Header>
          <View style={{ height: 220 }}>
            <ScrollView>
              {daysForecast?.map((item) => (
                <DataTable.Row key={String(item.datetime)}>
                  <DataTable.Cell>{item.datetime}</DataTable.Cell>
                  {(scrollableTab === 'THREE_DAY' ||
                    scrollableTab === 'FIVE_DAY') && (
                      <DataTable.Cell>{`${item.tempmin} - ${item.tempmax}`}</DataTable.Cell>
                    )}
                  {scrollableTab === 'HOURLY' && (
                    <DataTable.Cell>{item.temp}</DataTable.Cell>
                  )}
                  <DataTable.Cell>{item.precip}</DataTable.Cell>
                  <DataTable.Cell numberOfLines={2}>
                    {item.conditions}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </View>
        </DataTable>
        <MusicPlayer token={token} userPlaylist={userPlaylist}/>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  data: {
    position: 'absolute',
    marginTop: 30,
  },
  dataTable: {},
});
