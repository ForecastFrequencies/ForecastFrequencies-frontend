import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/components/login/Login';
import Home from './src/components/home/Home';
import Settings from './src/components/settings/Settings';
import Profile from './src/components/profile/Profile';
import { PaperProvider } from 'react-native-paper';
import LocationSearch from './src/components/locationSearch/LocationSearch';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        initialParams={{ location: '' }}
      />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Location Search" component={LocationSearch} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={Root}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
