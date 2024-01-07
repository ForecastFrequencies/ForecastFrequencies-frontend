import Constants from 'expo-constants';


export const SERVER_URL = `http://${Constants.expoGoConfig.debuggerHost
  ?.split(':')
  .shift()}:3000`;
  export const BACKEND_DEV_SERVER_URL = 'http://10.0.2.2:3000';
  