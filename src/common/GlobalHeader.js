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
    const { showLeftButton, back } = this.props;

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
            <Text style={styles.titleText} />
          </View>

          {/* right button -setting */}
        </View>
      </SafeAreaView>
    );
  }
}

GlobalHeader.propTypes = {
  routeName: PropTypes.string,
  showLeftButton: PropTypes.bool,
  back: PropTypes.bool,
};

export default GlobalHeader;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: Sizes.s5,
    paddingHorizontal: Sizes.s2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '25@ms' : 35,
    backgroundColor: 'transparent',
  },

  titleContainer: {
    flex: 1,
  },

  titleText: {
    fontSize: FontSizes.large,
    color: Colors.info,
  },

  iconBack: {
    fontSize: Sizes.large,
    color: Colors.info,
  },

  iconMenu: {
    fontSize: Sizes.large,
    color: Colors.info,
  },
});
