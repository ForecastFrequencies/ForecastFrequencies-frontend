import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import * as constants from '../../common/constants';
import axios from 'axios';

const MusicPlayer = ({token , userPlaylist}) => {

  const [isAlreadyPlaying, setIsAlreadyPlaying] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [durationInMs, setDurationInMs] = useState('');
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [currentSelectedPos, setCurrentSelectedPos] = useState(0);
  const [artistname, setArtistName] = useState('');
  const [songname, setSongName] = useState('');
  const [inProgress, setInProgress] = useState(false);

const onForward = async (event) => {
  try{
    event.preventDefault();
    setIsAlreadyPlaying(true);
    await axios.get(`${constants.SERVER_URL}/next-song?token=${token}`)
  }catch(e){
    console.log(e.message);
  }
};

  const changeTime = async (percentage) => {
      try{
        //console.log('current percent: ' + percent + ' duration ' + durationInMs);
        let currSelectedPos = Math.round((percentage / 100 ) * durationInMs);
        setCurrentSelectedPos(currSelectedPos);
        await axios.get(`${constants.SERVER_URL}/get-current-position?token=${token}&position=${currSelectedPos}`)
      }catch(e){
        console.log(e.message);
      }
  }

const onBackward = async (event) => {
  try{
    event.preventDefault();
    setIsAlreadyPlaying(true);
    await axios.get(`${constants.SERVER_URL}/previous?token=${token}`);
  }catch(e){
    console.log(e.message);
  }
};

const playBtnClicked = async (event) => {
  try{
    event.preventDefault();
    const encodedPlaylist = encodeURIComponent(userPlaylist.uri);
    setIsAlreadyPlaying(true);
    await axios.get(`${constants.SERVER_URL}/play-song?token=${token}&playlist=${decodeURIComponent(encodedPlaylist)}&current_pos=${currentSelectedPos}`);
    getPlayBackDetails();
  }catch(e){
    console.log(e.message);
  }
};

const pauseBtnClicked = async (event) => {
  try{
    event.preventDefault();
    setIsAlreadyPlaying(false);
    await axios.get(`${constants.SERVER_URL}/pause?token=${token}`);
    getPlayBackDetails();

  }catch(e){
    console.log(e.message);
  }
}

const formatTime = (time) => {
  const d = new Date(Date.UTC(0,0,0,0,0,0,time));
    // Pull out parts of interest
    const parts = [
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    ];
    // Zero-pad
    const formatted = parts.map(s => String(s).padStart(2,'0')).join(':');
    return formatted;
}

const getPlayBackDetails = async () => {
  try{
    const response = await axios.get(`${constants.SERVER_URL}/get-song-details?token=${token}}`);
    setArtistName(response?.data.item?.artists[0]?.name);
    setSongName(response?.data?.item?.name);
    setTimeElapsed(formatTime(response.data.progress_ms));
    setDurationInMs(response.data.item.duration_ms);
    setDuration(formatTime(response.data.item.duration_ms));
    let percent = Math.round(
      (Math.floor(response.data.progress_ms) / Math.floor(response.data.item.duration_ms)) * 100,
    );
    setPercent(percent);
  }catch(e){
    console.log(e.message);
  }
};


useEffect(() => {
    if(isAlreadyPlaying){
      const interval = setInterval(() => {
        getPlayBackDetails();
      }, 1000);
      return () => clearInterval(interval);
    }
},[isAlreadyPlaying, duration, timeElapsed, currentSelectedPos, userPlaylist]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.trackname}>
        <Text style={[styles.textDark, { fontSize: 20, fontWeight: '500' }]}>{songname}</Text>
        <Text style={[styles.textDark, { fontSize: 16, fontWeight: '500' }]}>{artistname}</Text>
      </View>
      <View>
        <View styles={styles.seekbar}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            value={percent}
            minimumTrackTintColor="#93A8B3"
            onValueChange={(percentage) => changeTime(percentage)}
            containerStyle={styles.seekbar}
          />
        </View>
        <View style={styles.inprogress}>
          <Text style={styles.durationStyle}>
            {currentSelectedPos? formatTime(currentSelectedPos): timeElapsed}
          </Text>
          <Text style={styles.durationStyle}>{duration? duration: '00:00:00'}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onBackward}>
          <FontAwesome name="backward" size={32} color={'#93A8B3'} />
        </TouchableOpacity>
        {/* Add logic to check if its already plaing or not and display play or pause accordingly */}
        {!isAlreadyPlaying ? (
          <TouchableOpacity 
            style={styles.playButtonContainer}
            onPress={playBtnClicked}>
              <FontAwesome name="play" size={32} color={'#3D425C'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.playButtonContainer}
            onPress={pauseBtnClicked}>
              <FontAwesome name="pause" size={32} color={'#3D425C'} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onForward}>
          <FontAwesome name="forward" size={32} color={'#93A8B3'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'EAEAEC'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1'
    },
    track: {
      height: 2,
      borderRadius: 1,
      backgroundColor: '#FFF',
    },
    thumb: {
      width: 8,
      height: 8,
      backgroundColor: '#3D425C',
    },
    seekbar: {
      marginLeft: 40,
      marginRight: 40,
    },
    inprogress: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 40,
      marginRight: 40,
    },
    textLight: {
      color: '#B6B7BF',
    },
    timeStamp: {
        fontSize: 11,
        fontWeight: '500',
    },
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
    trackname: { alignItems: 'center'},
    textDark: {
      color: '#3D425C',
    },
    durationStyle: {
       color: '#FFFBF4',
    }
});