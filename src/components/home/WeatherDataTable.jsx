import { StyleSheet, View, ScrollView } from 'react-native';
import { SegmentedButtons, Card } from 'react-native-paper';
import React from 'react';
import PropTypes from 'prop-types';
import WeatherTableCell from './WeatherTableCell';

const WeatherDataTable = ({
  scrollableTab,
  setScrollableTab,
  daysForecast,
  cardBackgroundColor,
}) => {
  return (
    <View>
      <View style = {{paddingBottom:12}}>
        <SegmentedButtons
          value={scrollableTab}
          theme={{ colors: { primary: 'green' } }}
          buttons={[
            {
              value: 'HOURLY',
              label: 'hourly',
              style:
                scrollableTab === 'HOURLY' ? {} : { backgroundColor: 'white' },
            },
            {
              value: 'THREE_DAY',
              label: '3-day',
              style:
                scrollableTab === 'THREE_DAY'
                  ? {}
                  : { backgroundColor: 'white' },
            },
            {
              value: 'FIVE_DAY',
              label: '5-day',
              style:
                scrollableTab === 'FIVE_DAY'
                  ? {}
                  : { backgroundColor: 'white' },
            },
          ]}
          onValueChange={setScrollableTab}
        />
      </View>

      
      <ScrollView horizontal={true}>
        {daysForecast?.map((forecast, index) => (
          <Card key={index} style={{ marginHorizontal: 5, backgroundColor: cardBackgroundColor}}>
            <WeatherTableCell forecast={forecast} scrollableTab = {scrollableTab} />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default WeatherDataTable;

const styles = StyleSheet.create({});
