import React from 'react';
import {
  View, Text, Image, Dimensions,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, FontSizes, Sizes } from '../../common/variables';

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

  render() {
    const { letter } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.letterText}>{letter.TenChu}</Text>
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
