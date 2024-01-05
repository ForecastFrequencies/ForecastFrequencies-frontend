import { Text, View, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const WeatherTableCell = ({ forecast, scrollableTab }) => {
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    if (scrollableTab === 'THREE_DAY' || scrollableTab === 'FIVE_DAY') {
      const date = new Date(forecast.datetime);

      const dayOfWeek = date.toLocaleDateString('en-us', { weekday: 'long' });
      console.log('dayOfWeek', dayOfWeek);
      const arr = dayOfWeek.split(',');
      setDatetime(arr[0]);
    } else {
      console.log('test', forecast);
      const date = new Date(`1970-01-01T${forecast.datetime}Z`);
      const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      });
      setDatetime(time);
    }
  }, [forecast, scrollableTab]);

  return (
    <View style={styles.cell}>
      <Text>{datetime}</Text>
      <Image
        className="h-11 w-11"
        source={require('../../../assets/sunny.png')}
      ></Image>
      <Text className="text-black">{`${forecast?.temp}º`}</Text>
    </View>
  );
};

WeatherTableCell.propTypes = {
  forecast: PropTypes.object.isRequired,
};

export default WeatherTableCell;

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    padding: 3,
    margin: 3,
  },
});

WeatherTableCell.propTypes = {
  forecast: PropTypes.object.isRequired,
  scrollableTab: PropTypes.string.isRequired,
};
