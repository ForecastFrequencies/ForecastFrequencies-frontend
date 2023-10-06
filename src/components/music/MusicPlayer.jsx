import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import PlayButton from './PlayButton';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const MusicPlayer = () => {
  const [isAlreadyPlaying, setIsAlreadyPlaying] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [timeElapsed, sertTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());

  const onStartProcess = async (e) => {};

 
  const onForward = async () => {
    console.log('moving foward ....');
  };
    const onPuaseProcess = async (e) => {
        setIsAlreadyPlaying(false);
    }

    const changeTime = async (s) => {
        console.log('time is changing...');
    }

  const onBackward = async () => {
    console.log('moving backward...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.seekbar}>
        <Slider
          minimumValue={0}
          maximumValue={100}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          value={0}
          minimumTrackTintColor="#93A8B3"
          onValueChange={(s) => changeTime(s)}
        />
        <View style={styles.inprogress}>
          <Text>
            {!inProgress ? timeElapsed : audioRecorderPlayer.mmssss(0)}
          </Text>
          <Text>{!inProgress ? duration : audioRecorderPlayer.mmssss(10)}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity function={() => onBackward()}>
          <FontAwesome name="backward" size={32} color={'#93A8B3'} />
        </TouchableOpacity>
        {/* Add logic to check if its already plaing or not and display play or pause accordingly */}
        {!isAlreadyPlaying ? (
          <PlayButton function={() => onStartProcess()} state="play" />
        ) : (
          <PlayButton function={() => onPuaseProcess()} state="pause" />
        )}
        <TouchableOpacity function={() => onForward()}>
          <FontAwesome name="forward" size={32} color={'#93A8B3'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        margin: 0,
    },
    inprogress: {
        // marginTop: -12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textLight: {
        color: '#B6B7BF',
    },
    timeStamp: {
        fontSize: 11,
        fontWeight: '500',
    },
});
