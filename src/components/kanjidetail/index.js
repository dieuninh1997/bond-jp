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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/png;base64,${item.HinhAnh}` }}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.title}>Hán việt</Text>
            <Text style={styles.kanjiName}>{item.HanViet}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Ví dụ</Text>
            <Text style={styles.kanjiName}>{item.ViDu}</Text>
          </View>
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
  title: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.separater,
    borderRadius: Sizes.s2,
    marginRight: Sizes.s2,
    color: Colors.black,
    paddingLeft: Sizes.s2,
    fontSize: FontSizes.small,
    height: Sizes.s5,
  },
  kanjiName: {
    flex: 2,
    color: Colors.black,
    fontSize: FontSizes.p,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Sizes.s2,
  },
  details: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    margin: Sizes.s4,
    padding: Sizes.s2,
    borderRadius: Sizes.s1,
    elevation: Sizes.s1,
    shadowOpacity: 0.5,
  },

  image: {
    width: '80%',
    height: '80%',
  },
});
