import React from 'react';
import {
  Animated,
  Easing,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

import { Colors, FontSizes, Sizes } from '../../common/variables';
import { goMain } from '../../common/navigation';

class WelcomeScreen extends React.PureComponent {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
        animate: true, // Controls whether TopBar visibility changes should be animated
        hideOnScroll: false,
        drawBehind: true,
      },
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { progress } = this.state;

    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start(goMain);
  }

  render() {
    const { progress } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>Learning jp</Text>
        <View>
          <LottieView
            source={require('../../common/anims/progress_bar.json')}
            progress={progress}
            style={styles.anim}
          />
        </View>

      </View>
    );
  }
}
export default WelcomeScreen;

const { width, height } = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },

  appName: {
    color: Colors.info,
    fontSize: FontSizes.extrLarge,
    position: 'absolute',
    top: width * 0.6,
  },

  anim: {
    width,
  },
});
