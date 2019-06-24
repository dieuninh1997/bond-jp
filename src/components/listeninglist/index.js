import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScaledSheet } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import * as listeningListAction from '../../redux/listeninglist/listeninglist.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';
import Mp3Icon from '../../assets/svg/mp3.svg';

const { width, height } = Dimensions.get('window');
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
        rightButtons: [
          {
            id: 'buttonDownload',
            icon: require('../../assets/images/ic_downloads.png'),
          },
        ],
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
        <Mp3Icon width={Sizes.s7} height={Sizes.s7} />
        <View style={styles.nameContainer}>
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">{item.TieuDe}</Text>
          <Text style={styles.singerName}>{item.Casi}</Text>
        </View>

        <Ionicons name="ios-arrow-forward" style={styles.iconArrow} />
      </View>
    </TouchableOpacity>
  )

  render() {
    const { listeningList } = this.props;
    const ITEM_HEIGHT = Sizes.s8;
    return (
      <View style={styles.container}>
        <FlatList
          data={listeningList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${item.Id} - ${index}`}
          extraData={this.props}
          getItemLayout={(data, index) => (
            { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
          )}
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
    paddingHorizontal: Sizes.s2,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.separater,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.s3,
  },
  nameContainer: {
    flex: 1,
    marginHorizontal: Sizes.s2,
  },
  itemName: {
    flex: 1,
    fontSize: FontSizes.p,
    color: Colors.black,
  },
  singerName: {
    flex: 1,
    fontSize: FontSizes.extraSmall,
    color: Colors.gray,
    fontStyle: 'italic',
  },
  iconArrow: {
    fontSize: FontSizes.p,
    color: Colors.gray,
  },

});
