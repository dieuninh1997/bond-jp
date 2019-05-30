import React from 'react';
import {
  View, Image, Text, Slider, TouchableOpacity, Platform, Alert,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import { Navigation } from 'react-native-navigation';
import { Sizes, Colors, FontSizes } from './variables';

export default class GlobalAudio extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      speakerState: 'mute',
      playState: 'paused',
      playSeconds: 0,
      duration: 0,
    };
    this.sliderEditing = false;
  }

  componentDidMount() {
    this.play();
    this.timeout = setInterval(() => {
      if (this.sound
        && this.sound.isLoaded()
        && this.state.playState === 'playing'
        && !this.sliderEditing) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({ playSeconds: seconds });
        });
      }
    }, 1000);
  }

  componentWillUnMount() {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  }

  onSliderEditEnd = () => {
    this.sliderEditing = false;
  }

  onSliderEditing = (value) => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({ playSeconds: value });
    }
  }

  play = async () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({ playState: 'playing' });
    } else {
      const { filepath } = this.props;
      console.log('[Play]', filepath);
      Sound.setCategory('Playback');

      this.sound = new Sound(filepath, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({ playState: 'paused' });
        } else {
          this.setState({ playState: 'playing', duration: this.sound.getDuration() });
          this.sound.play(this.playComplete);
        }
      });
    }
  }

  playComplete = (success) => {
    if (this.sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({ playState: 'paused', playSeconds: 0 });
      this.sound.setCurrentTime(0);
    }
  }


  pause = () => {
    if (this.sound) {
      this.sound.pause();
    }

    this.setState({ playState: 'paused' });
  }

  getAudioTimeString(seconds) {
    const m = parseInt(seconds / 60);
    const s = parseInt(seconds % 60);

    return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  }

  hanldePlayPause=() => {
    const { playState } = this.state;
    if (playState === 'playing') {
      this.setState({ playState: 'paused' });
      this.pause();
    } else {
      this.setState({ playState: 'playing' });
      this.play();
    }
  }

  // ios-pause
  // ios-volume-off
  render() {
    const {
      playSeconds, duration, playState, speakerState,
    } = this.state;
    const currentTimeString = this.getAudioTimeString(playSeconds);
    const durationString = this.getAudioTimeString(duration);

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.hanldePlayPause}>
            {playState === 'paused' ? (
              <Ionicons name="ios-play" style={styles.iconPlayPause} />
            ) : (
              <Ionicons name="ios-pause" style={styles.iconPlayPause} />
            )}
          </TouchableOpacity>


          <Text style={styles.time}>{`${currentTimeString}/${durationString}`}</Text>
          <Slider
            style={styles.slider}
            onTouchStart={this.onSliderEditStart}
            onTouchEnd={this.onSliderEditEnd}
            onValueChange={this.onSliderEditing}
            value={playSeconds}
            maximumValue={duration}
          />
          {/* <TouchableOpacity onPress={() => {}}>
            {speakerState === 'mute' ? (
              <Ionicons name="ios-volume-off" style={styles.iconSpeaker} />
            ) : (
              <Ionicons name="ios-volume-high" style={styles.iconSpeaker} />
            )}
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlayPause: {
    fontSize: FontSizes.p,
    color: Colors.black,
    marginHorizontal: Sizes.s2,
  },
  time: {
    fontSize: FontSizes.p,
    color: Colors.black,
  },
  slider: {
    flex: 1,
  },
  iconSpeaker: {
    fontSize: FontSizes.p,
    color: Colors.black,
  },
});
