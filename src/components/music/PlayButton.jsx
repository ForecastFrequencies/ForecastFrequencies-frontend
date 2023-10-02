import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const PlayButton = (props) => {
    return (
        <TouchableOpacity 
        style={styles.playButtonContainer}
        onProcess={props.onProcess}>
            <FontAwesome name={props.state} size={32} color={'#3D425C'}/>
        </TouchableOpacity>

    )

}

export default PlayButton;

const styles = StyleSheet.create({
    playButtonContainer: {
      backgroundColor: '#FFF',
      borderColor: 'rgba(93, 63, 106, 0.2)',
      borderWidth: 16,
      width: 80,
      height: 80,
      borderRadius: 64,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 32,
      shadowColor: '#5D3F6A',
      shadowRadius: 30,
      shadowOpacity: 0.5,
    },
  });