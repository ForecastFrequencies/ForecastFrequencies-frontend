import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login Attempt: ', userName, password);
  };
  return (
    <SafeAreaView style={styles.login}>
      <TextInput
        label="Username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
        mode="outlined"
        style={styles.input}
      ></TextInput>
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        secureTextEntry={true}
        style={styles.input}
      ></TextInput>
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
});
