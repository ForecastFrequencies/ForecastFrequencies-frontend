import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Icon, Card, Text } from 'react-native-paper';

import PropTypes from 'prop-types';

import React from 'react';

const { width, height } = Dimensions.get('window');

const CurrentWeatherInfo = ({
  weatherData,
  textColor,
  cardBackgroundColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.currentLocation}>
        <View className="" style={[styles.row]}>
          <View style={styles.map}>
            <Icon source="map-marker" size={width * 0.06} />
          </View>
          <Text style={[styles.mapText, { color: textColor }]}>Fortaleza</Text>
        </View>
      </View>
      <View style={styles.weatherInfo}>
        <Image
          style={{ width: width * 0.4, height: undefined, padding: 10 }}
          source={require('../../../assets/sunny.png')}
        ></Image>

        <Text
          variant="displayMedium"
          style={[
            {
              fontWeight: 'bold',
              color: textColor,
              paddingLeft: 30,
              fontSize: width * 0.1,
            },
          ]}
        >
          {`${weatherData.currentConditions.temp}º`}
        </Text>

        <Text
          variant="titleLarge"
          style={{ color: textColor, alignItems: 'center' }}
        >
          {weatherData?.currentConditions?.conditions}
        </Text>
        <View style={styles.row}>
          <Text
            style={{
              marginHorizontal: 5,
              color: textColor,
              fontSize: width * 0.05,
            }}
          >
            {`Max: ${weatherData?.days[0].feelslikemin}º`}
          </Text>
          <Text style={{ color: textColor, fontSize: width * 0.05 }}>
            {`Min: ${weatherData?.days[0].feelslikemax}º`}
          </Text>
        </View>
        <View>
          <Card
            style={{
              borderRadius: 22,
              backgroundColor: cardBackgroundColor,
              width: width * 0.85,
            }}
          >
            <Card.Content
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 110,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon source="weather-pouring" size={width * 0.05} />
                <Text style={{ fontSize: width * 0.04 }}>
                  {weatherData?.days[0].precipprob}%
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  source="sun-thermometer-outline"
                  size={width * 0.05}
                  color="#000"
                />
                <Text style={{ fontSize: width * 0.04 }}>
                  {weatherData?.days[0].humidity}%{' '}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon source="weather-windy" size={width * 0.05} color="#000" />
                <Text style={{ fontSize: width * 0.04 }}>
                  {weatherData?.days[0].windspeed} mph{' '}
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default CurrentWeatherInfo;

CurrentWeatherInfo.propTypes = {
  weatherData: PropTypes.object.isRequired,
  textColor: PropTypes.string.isRequired,
  cardBackgroundColor: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  currentLocation: {},
  weatherInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    paddingTop: 8,
  },
  mapText: {
    fontSize: width * 0.05,
    paddingTop: 5,
    fontWeight: 'bold',
  },
});
