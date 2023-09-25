import { StyleSheet, View, SafeAreaView } from 'react-native';
import React from 'react';
import { PaperProvider, Text, SegmentedButtons } from 'react-native-paper';
import VerticalText from 'react-native-vertical-text';

const Home = () => {
  return (
    <PaperProvider>
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
        />
      </SafeAreaView>
    </PaperProvider>
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
    flexWrap: 'wrap',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});
