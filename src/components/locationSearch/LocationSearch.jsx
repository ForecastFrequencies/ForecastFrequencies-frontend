import { View, Text, Button } from 'react-native'
import React from 'react'

const LocationSearch = ({ navigation }) => {
    return (
        <View>
            <Text>LocationSearch</Text>
            <Button title="Change location to 01510" onPress={() => navigation.navigate('Home', { location: '01510' })} />
        </View>
    )
}

export default LocationSearch