import Constants from 'expo-constants';


export const SERVER_URL = `http://${Constants.expoGoConfig.debuggerHost
  ?.split(':')
  .shift()}:3000`;
  export const BACKEND_DEV_SERVER_URL = 'http://10.0.2.2:3000';


export const CLIENT_ID = '6d11100f0f9a4af9830528e541b62c41';