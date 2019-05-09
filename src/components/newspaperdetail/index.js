import React from 'react';
import {
  View, Text, Image, Dimensions, ScrollView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, FontSizes, Sizes } from '../../common/variables';

class NewspaperDetailScreen extends React.PureComponent {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        animate: true, // Controls whether TopBar visibility changes should be animated
        hideOnScroll: false,
        drawBehind: false,
        title: {
          text: 'Đọc báo',
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
        <ScrollView style={styles.content}>
          <Text style={styles.contentText}>{item.NoiDung}</Text>
        </ScrollView>

      </View>
    );
  }
}
export default NewspaperDetailScreen;
const { width, height } = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: Sizes.s2,
    backgroundColor: Colors.white,
  },

  title: {
    color: Colors.black,
    fontSize: FontSizes.p,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    marginTop: Sizes.s2,
  },

  contentText: {
    flex: 1,
    color: Colors.black,
    fontSize: FontSizes.small,
  },

});
