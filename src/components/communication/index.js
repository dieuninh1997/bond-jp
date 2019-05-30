import React from 'react';
import { View, Text } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { ScaledSheet } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import GlobalAudio from '../../common/GlobalAudio';
import { Sizes, Colors, FontSizes } from '../../common/variables';

class CommunicationScreen extends React.PureComponent {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        animate: true, // Controls whether TopBar visibility changes should be animated
        hideOnScroll: false,
        drawBehind: false,
        title: {
          text: 'Nghe nhạc',
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
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.TieuDe}</Text>
        <GlobalAudio filepath="audio1.mp3" />
      </View>
    );
  }
}
export default CommunicationScreen;
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: Sizes.s2,
    backgroundColor: Colors.white,
  },
  title: {
    flex: 1,
    fontSize: FontSizes.p,
    color: Colors.black,
  },
});
