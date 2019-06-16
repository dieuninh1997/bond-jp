import React from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, FontSizes, Sizes } from '../../common/variables';
import * as newspaperAction from '../../redux/newspaper/newspaper.actions';

class NewspaperScreen extends React.PureComponent {
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

  hanldeNewspaperPressed=(item) => {
    const { componentId } = this.props;
    const ngayGioBao = item.MoTa.substr(0, item.MoTa.indexOf('\n'));
    const bao = ngayGioBao.substr(0, ngayGioBao.indexOf(' '));
    const ngayGio = ngayGioBao.substr(ngayGioBao.indexOf(' ') + 1);
    Navigation.push(componentId, {
      component: {
        name: 'bondjp.NewspaperDetailScreen',
        passProps: {
          item,
          bao,
          ngayGio,
        },
      },
    });
  }

  _renderItem=({ item }) => {
    const ngayGioBao = item.MoTa.substr(0, item.MoTa.indexOf('\n'));
    const tomTat = item.MoTa.substr(item.MoTa.indexOf('\n') + 1);
    const bao = ngayGioBao.substr(0, ngayGioBao.indexOf(' '));
    const ngayGio = ngayGioBao.substr(ngayGioBao.indexOf(' ') + 1);
    return (
      <TouchableOpacity onPress={() => this.hanldeNewspaperPressed(item)}>
        <View style={styles.row}>
          <View style={styles.thumbnai}>
            <Text style={styles.bao}>
              {bao}
            </Text>
            <Text style={styles.title}>{item.TieuDe}</Text>

          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.date}>
              {ngayGio}
            </Text>
            <Text
              numberOfLines={4}
              ellipsizeMode="tail"
              style={styles.summarizeContent}
            >
              {tomTat}
            </Text>
          </View>
          {/* <MaterialIcons name="keyboard-arrow-right" style={styles.iconRightArrow} /> */}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { newspapers } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={newspapers}
          renderItem={this._renderItem}
          keyExtractor={(e, index) => `${e.IdChuCai} - ${index}`}
          extraData={this.props}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({ newspapers: state.newspapers });

const mapDispatchToProps = dispatch => ({
  newspaperActions: bindActionCreators(newspaperAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewspaperScreen);

const { width, height } = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: Sizes.s1,
  },

  row: {
    width: (width - 30) / 2,
    height: height / 3,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separater,
    borderRadius: Sizes.s1,
    margin: Sizes.s1,
    elevation: Sizes.s1,
    shadowOpacity: 0.5,
  },
  thumbnai: {
    flex: 1,
    width: (width - 30) / 2,
    backgroundColor: Colors.warning,
    padding: Sizes.s1,
  },
  bao: {
    width: Sizes.s10,
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: 'bold',
    backgroundColor: 'red',
    paddingHorizontal: Sizes.s1,
    marginBottom: Sizes.s1,
  },
  date: {
    color: Colors.gray,
    fontSize: FontSizes.extraSmall,
    fontStyle: 'italic',
  },

  itemContainer: {
    flex: 1,
    padding: Sizes.s2,
  },

  title: {
    color: Colors.black,
    fontSize: FontSizes.small,
    fontWeight: 'bold',
    marginBottom: Sizes.s1,
  },

  summarizeContent: {
    color: Colors.gray,
    fontSize: FontSizes.extraSmall,
  },

  // iconRightArrow: {
  //   fontSize: FontSizes.large,
  //   color: Colors.gray,
  // },
});
