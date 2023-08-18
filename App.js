import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, Button } from 'react-native-paper';

export default function App() {
  
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Welcome to the Forecast Frequencies app!</Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          Press me
        </Button>
        <StatusBar style="auto" />
     
      </View>
  

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
