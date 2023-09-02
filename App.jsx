import React from 'react';
import { PaperProvider } from 'react-native-paper';
import ConnectedLogin from './src/login/Login';

export default function App() {
  return (
    <PaperProvider>
      <ConnectedLogin />
    </PaperProvider>
  );
}
