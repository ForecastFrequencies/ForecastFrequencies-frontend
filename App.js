import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/components/login/Login';
import Home from './src/components/home/Home';

const Stack = createNativeStackNavigator();

export default function App() {

  const [showHomeScreen, setShowHomeScreen] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <View style={styles.container}>
          <Text>Welcome to the Forecast Frequencies app!</Text> */}
          {/* <StatusBar style="auto" /> */}
          <Stack.Screen
            name="Login"
            component={Login}
           />
          <Stack.Screen
            name="Home"
            component={Home}
           />
        {/* </View> */}
      </Stack.Navigator>
    </NavigationContainer>

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
