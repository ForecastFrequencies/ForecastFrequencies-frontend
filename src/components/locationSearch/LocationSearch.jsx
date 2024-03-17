import React from 'react';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationSearch = ({ navigation }) => {
    const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                navigation.navigate('Home', { location: details.description })
            }}
            query={{
                key: googleApiKey,
                language: 'en',
            }}
        />
    );
};

LocationSearch.propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }),
};

export default LocationSearch;