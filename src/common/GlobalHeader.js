import React from 'react';
import {
  View, TouchableOpacity, SafeAreaView, Platform, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Colors, FontSizes, Sizes } from './variables';


class GlobalHeader extends React.PureComponent {
  render() {
    const { showLeftButton, back, title } = this.props;

    return (
      <SafeAreaView>
        <View style={styles.container}>
          {/* left button - back or menu */}
          <View>
            {(showLeftButton && back) ? (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="ios-arrow-back" style={styles.iconBack} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="ios-menu" style={styles.iconMenu} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>

          {/* right button -setting */}
        </View>
      </SafeAreaView>
    );
  }
}

GlobalHeader.propTypes = {
  routeName: PropTypes.string,
  title: PropTypes.string,
  showLeftButton: PropTypes.bool,
  back: PropTypes.bool,
};

export default GlobalHeader;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: Sizes.s10,
    paddingHorizontal: Sizes.s2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkenPrimary,
    // backgroundColor: 'transparent',
  },

  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    fontSize: FontSizes.p,
    color: Colors.info,
  },

  iconBack: {
    fontSize: FontSizes.large,
    color: Colors.info,
  },

  iconMenu: {
    fontSize: FontSizes.large,
    color: Colors.info,
  },
});
