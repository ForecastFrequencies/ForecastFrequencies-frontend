import Constants from 'expo-constants';


export const SERVER_URL = `http://${Constants.expoGoConfig.debuggerHost
  ?.split(':')
  .shift()}:3000`;


export const CLIENT_ID = '457b88f6f5dd407a8683c27c824f1074';