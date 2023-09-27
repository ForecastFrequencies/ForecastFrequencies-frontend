import { StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaperProvider, Text, SegmentedButtons } from 'react-native-paper';
import VerticalText from 'react-native-vertical-text';
import Constants from 'expo-constants';

const SERVER_URL = `http://${Constants.expoGoConfig.debuggerHost
  ?.split(':')
  .shift()}:3000`;

const Home = ({ userName = 'Nick', location = '11355' }) => {
  const [apiResponse, setApiResponse] = useState("");
  const date = new Date();

  useEffect(() => {
    //Fetch the weather data from Express server
    fetch(`${SERVER_URL}/get-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiResponse(data);
      })
      .catch((error) => {
        console.error('Error retrieving weather data:', error);
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
        <Text variant="titleSmall">{date}</Text>
      </View>
      <View style={[styles.row, styles.spaceBetween]}>
        <Text variant="displayLarge">Temp</Text>
        <VerticalText style={{ color: "black", fontSize: 15, }} text={"clear sky"} />
        {apiResponse?.days((daily) => (
          <>
            <Text>{daily.datetime}</Text> <Text>{daily.temp}</Text>
          </>
        ))}
        <Text>{apiResponse?.address}</Text>
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
