import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScaledSheet } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import * as listeningListAction from '../../redux/listeninglist/listeninglist.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';


class ListeningListScreen extends React.PureComponent {
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

  handleListeningOpened=(item) => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'bondjp.ListeningScreen',
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
    <TouchableOpacity onPress={() => this.handleListeningOpened(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">{item.TieuDe}</Text>
        <Ionicons name="ios-arrow-forward" style={styles.iconArrow} />
      </View>
    </TouchableOpacity>
  )

  render() {
    const { listeningList } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={listeningList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${item.Id} - ${index}`}
          extraData={this.props}
        />
      </View>
    );
  }
}


const mapStateToProps = state => ({ listeningList: state.listeningList });


const mapDispatchToProps = dispatch => ({
  listeningListActions: bindActionCreators(listeningListAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListeningListScreen);
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
