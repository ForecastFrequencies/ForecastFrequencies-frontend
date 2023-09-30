import { StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaperProvider, Text, SegmentedButtons } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as Constants from '../../common/constants'
import VerticalText from 'react-native-vertical-text';
// import Constants from 'expo-constants';

const Home = ({ userName = 'Nick', location = '11355' }) => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState('');
  const [apiResponse, setApiResponse] = useState("");

  const date = new Date();
  console.log(`${Constants.SERVER_URL}/timeline-weather`);

  const getUserData = (async (token) => {
    try {
      const response = await axios.get(`${Constants.SERVER_URL}/spotify-user?token=${token}`);
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
    //Fetch the weather data from Express server
    fetch(`${Constants.SERVER_URL}/timeline-weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location, }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('WEATHER DATA', data);
        setApiResponse(data);
      })
      .catch((error) => {
        console.error('Error retrieving weather data frontend:', error);
      });
  }, []);


  return (
    <PaperProvider>
      <View style={[styles.row, styles.spaceBetween]}>
        <View >
          <Text variant="headlineMedium">{`Good Morning ${userName}!`}</Text>
        </View>
        <View>
          <Text variant="titleSmall">Menu</Text>
        </View>
      </View>
      <View>
        <Text variant="headlineMedium">{location}</Text>
        <Text variant="titleSmall">{date.toDateString}</Text>
      </View>
      <View style={[styles.row, styles.spaceBetween]}>
        <Text variant="displayLarge">Temp</Text>
        {/* <Text>{`address: ${apiResponse?.address}`}</Text> */}
        {/* <Text>{`cloudcover: ${apiResponse?.currentConditions?.cloudcover}`}</Text> */}
        <VerticalText style={{ color: "black", fontSize: 15, }} text={"clear sky"} />
        {/* {apiResponse && apiResponse.days.map((daily, index) => (
          <View key={index} >
            <Text>{daily.datetime}</Text> <Text>{daily.temp}</Text>
          </View>
        ))} */}
      </View>

      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value='hourly'
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
        />
        <View>
          {userData ? (<Text>{userData.display_name}</Text>) : (<Text>Loading...</Text>)}
        </View>
      </SafeAreaView>
    </PaperProvider >
  )
}

export default Home


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
  }
});
