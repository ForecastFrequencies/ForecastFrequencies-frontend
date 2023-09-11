import { View, Text } from 'react-native'
import React from 'react'
import { PaperProvider, Button } from 'react-native-paper';

const Login = ({ navigation }) => {
    return (
        <PaperProvider>
            <View >
                <Text>This is the Login screen</Text>
                <Button
                    icon="camera"
                    mode="contained"
                    onPress={() => navigation.navigate('Home')}
                >
                    Home screen
                </Button>
            </View>
        </PaperProvider>
    )
}

export default Login
