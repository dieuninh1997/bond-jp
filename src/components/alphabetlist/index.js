import React from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as alphabetListAction from '../../redux/alphabetlist/alphabetlist.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';

class AlphabetListScreen extends React.PureComponent {
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

  handleAlphabetOpened=(item) => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'bondjp.AlphabetScreen',
        passProps: {
          item,
        },
        options: {
          index: 0,
        },
      },
    });
  }

  _renderItem=({ item }) => (
    <TouchableOpacity onPress={() => this.handleAlphabetOpened(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.LoaiChu}</Text>
        <Ionicons name="ios-arrow-forward" style={styles.iconArrow} />
      </View>
    </TouchableOpacity>

  )

  render() {
    const { alphabetList } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={alphabetList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${item.Id} - ${index}`}
          extraData={this.props}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({ alphabetList: state.alphabetList });


const mapDispatchToProps = dispatch => ({
  alphabetListActions: bindActionCreators(alphabetListAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlphabetListScreen);
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.s3,
    paddingHorizontal: Sizes.s2,
  },

  itemName: {
    flex: 1,
    fontSize: FontSizes.p,
    color: Colors.black,
  },

  iconArrow: {
    fontSize: FontSizes.p,
    color: Colors.black,
  },
});
