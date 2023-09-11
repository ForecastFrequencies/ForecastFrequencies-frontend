import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, Button } from 'react-native-paper';
import Login from './src/components/login/Login';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Welcome to the Forecast Frequencies app!</Text>
        <Login />
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          Home screen
        </Button>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
