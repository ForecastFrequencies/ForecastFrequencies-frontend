import React from 'react';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationSearch = ({ navigation }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                navigation.navigate('Home', { location: details.description })
            }}
            query={{
                key: 'AIzaSyA4eWxhZo0qLaUNTUJhFLdVh_-O0RVC348',
                language: 'en',
            }}
        />
    );
};

LocationSearch.propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }),
};

export default LocationSearch;