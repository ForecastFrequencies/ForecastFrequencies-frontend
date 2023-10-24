import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './src/components/login/Login';
import Home from './src/components/home/Home';
import Settings from './src/components/settings/Settings';
import Profile from './src/components/profile/Profile';
import LocationSearch from './src/components/locationSearch/LocationSearch';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Root() {
  return (
      <Drawer.Navigator>
          <Stack.Screen name="Login" component={Login}   options={{
    drawerItemStyle: { height: 0 }
  }} />
      <Drawer.Screen name="Home" component={Home} initialParams={{ location: '11355' }}/>
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="LocationSearch" component={LocationSearch} />
      </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
