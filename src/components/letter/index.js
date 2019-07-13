import React from 'react';
import {
  View, Text, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import Sound from 'react-native-sound';
import { Colors, FontSizes, Sizes } from '../../common/variables';
import SpeakerIcon from '../../assets/svg/speaker.svg';

class LetterScreen extends React.PureComponent {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        animate: true, // Controls whether TopBar visibility changes should be animated
        hideOnScroll: false,
        drawBehind: false,
        title: {
          text: passProps.LoaiChu,
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.info,
          fontFamily: 'Helvetica',
          alignment: 'center',
        },
        background: {
          color: Colors.darkenPrimary,
          translucent: false,
        },
        backButton: {
          color: Colors.white,
        },
      },
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  handleReadLetter=(letter) => {
    const filePath = `${letter.PhienAm}.mp3`;
    const sound = new Sound(filePath, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        // do something
        console.log('================================================');
        console.log('Loi gi do', error);
        console.log('================================================');
      }
      // play when loaded
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  render() {
    const { letter } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.letterText}>{letter.TenChu}</Text>
          <TouchableOpacity onPress={() => this.handleReadLetter(letter)}>
            <SpeakerIcon width={32} height={32} />
          </TouchableOpacity>
        </View>

        <View style={styles.letterImageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/png;base64,${letter.HinhAnh}` }}
            resizeMode="stretch"
          />
        </View>

      </View>
    );
  }
}
export default LetterScreen;
const { width, height } = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: Sizes.s2,
    backgroundColor: Colors.white,
  },

  letterText: {
    color: Colors.black,
    fontSize: FontSizes.large,
  },
  letterImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: width * 0.8,
    height: width * 0.8,
  },

});
