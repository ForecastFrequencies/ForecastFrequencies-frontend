import { StyleSheet, View, Image ,Dimensions} from 'react-native';
import { Icon, Card, Text } from 'react-native-paper';

import PropTypes from 'prop-types';

import React from 'react';

const CurrentWeatherInfo = ({
  weatherData,
  textColor,
  cardBackgroundColor,
}) => {
  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <View style={styles.currentLocation}>
        <View className="" style={[styles.row]}>
          <View style={styles.map}>
            <Icon source="map-marker" size={30} />
          </View>
          <Text style={[styles.mapText, { color: textColor }]}>Fortaleza</Text>
        </View>
      </View>
      <View style={styles.weatherInfo}>
        <Image
          style={{ width: width*.4, height: height*.2, padding: 10}}
          source={require('../../../assets/sunny.png')}
        ></Image>
        <Text
          variant="displayMedium"
          style={[{ fontWeight: 'bold', color: textColor, paddingLeft: 30 }]}
        >
          {`${weatherData.currentConditions.temp}º`}
        </Text>
        <Text
          variant="headlineSmall"
          style={{ color: textColor, alignItems: 'center' }}
        >
          {weatherData?.currentConditions?.conditions}
        </Text>
        <View style={styles.row}>
          <Text style={{ marginHorizontal: 5, color: textColor, fontSize: 20 }}>
            {`Max: ${weatherData?.days[0].feelslikemin}º`}
          </Text>
          <Text style={{ color: textColor, fontSize: 20 }}>
            {`Min: ${weatherData?.days[0].feelslikemax}º`}
          </Text>
        </View>
        <View>
          <Card
            style={{
              borderRadius: 22,
              backgroundColor: cardBackgroundColor,
              width: 350,
            }}
          >
            <Card.Content
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon source="weather-pouring" size={20} />
                <Text> {weatherData?.days[0].precipprob}% </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon source="sun-thermometer-outline" size={20} color="#000" />
                <Text>{weatherData?.days[0].humidity}% </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon source="weather-windy" size={20} color="#000" />
                <Text>{weatherData?.days[0].windspeed} mph </Text>
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
  },
  row: {
    flexDirection: 'row',
  },
  map: {
    paddingTop: 8,
  },
  mapText: {
    fontSize: 25,
    paddingTop: 5,
    fontWeight: 'bold',
  },
});
