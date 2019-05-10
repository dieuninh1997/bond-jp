import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, FontSizes, Sizes } from '../../common/variables';

class KanjiDetailScreen extends React.PureComponent {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        animate: true, // Controls whether TopBar visibility changes should be animated
        hideOnScroll: false,
        drawBehind: false,
        title: {
          text: passProps.text,
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
        <Text style={styles.kanjiName}>{`${item.TenChu}: ${item.HanViet}`}</Text>
        <Text style={styles.kanjiName}>{item.ViDu}</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/png;base64,${item.HinhAnh}` }}
            resizeMode="stretch"
          />
        </View>

      </View>
    );
  }
}


export default KanjiDetailScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Sizes.s2,
  },

  kanjiName: {
    color: Colors.black,
    fontSize: FontSizes.p,
    marginBottom: Sizes.s4,
  },

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '80%',
    height: '80%',
  },
});
