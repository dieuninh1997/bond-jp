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
    Navigation.push(componentId, {
      component: {
        name: 'bondjp.NewspaperDetailScreen',
        passProps: {
          item,
        },
      },
    });
  }

  _renderItem=({ item }) => (
    <TouchableOpacity onPress={() => this.hanldeNewspaperPressed(item)}>
      <View style={styles.row}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.TieuDe}</Text>
          <Text
            numberOfLines={5}
            ellipsizeMode="tail"
            style={styles.summarizeContent}
          >
            {item.MoTa}
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" style={styles.iconRightArrow} />
      </View>
    </TouchableOpacity>
  )

  render() {
    const { newspapers } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
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
    backgroundColor: Colors.white,
  },

  row: {
    width,
    flexDirection: 'row',
    paddingVertical: Sizes.s2,
    paddingHorizontal: Sizes.s2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    alignItems: 'center',
  },

  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: Sizes.s2,
  },

  title: {
    color: Colors.black,
    fontSize: FontSizes.p,
    fontWeight: 'bold',
    marginBottom: Sizes.s1,
  },

  summarizeContent: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },

  iconRightArrow: {
    fontSize: FontSizes.large,
    color: Colors.black,
  },
});
