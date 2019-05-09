import React from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import _ from 'lodash';
import * as alphabetAction from '../../redux/alphabet/alphabet.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';

class AlphabetScreen extends React.PureComponent {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        animate: true, // Controls whether TopBar visibility changes should be animated
        hideOnScroll: false,
        drawBehind: false,
        title: {
          text: passProps.item.LoaiChu,
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

  hanldeLetterPressed=(letter) => {
    const { item, componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'bondjp.LetterScreen',
        passProps: {
          letter,
          LoaiChu: item.LoaiChu,
        },
      },
    });
  }

  _renderItem=({ item }) => (
    <TouchableOpacity onPress={() => this.hanldeLetterPressed(item)}>
      <View style={styles.letterContainer}>
        <Text style={styles.letter}>{item.TenChu}</Text>
      </View>

    </TouchableOpacity>
  )

  render() {
    const { alphabets, item } = this.props;

    const letters = _.filter(alphabets, { IdLoaiChu: item.IdLoaiChu });

    return (
      <View style={styles.container}>
        <FlatList
          data={letters}
          numColumns={5}
          renderItem={this._renderItem}
          keyExtractor={(e, index) => `${e.IdChuCai} - ${index}`}
          extraData={this.props}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ alphabets: state.alphabets });

const mapDispatchToProps = dispatch => ({
  alphabetActions: bindActionCreators(alphabetAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlphabetScreen);

const { width, height } = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  letterContainer: {
    width: width / 5,
    height: width / 5,
    borderRightWidth: 1,
    borderRightColor: Colors.black,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  letter: {
    color: Colors.black,
    fontSize: FontSizes.h2,
  },
});
