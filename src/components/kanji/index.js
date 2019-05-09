import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, FontSizes } from '../../common/variables';
import * as kanjiAction from '../../redux/kanji/kanji.actions';

class KanjiScreen extends React.PureComponent {
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

  componentDidMount() {
    const { kanjiActions } = this.props;
    kanjiActions.getKanji({}, (error) => {
      if (error) {
        console.log('getKanji error ==>', error);
      }
    });
  }

  hanldeLetterPressed=(item) => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'bondjp.KanjiDetailScreen',
        passProps: {
          item,
          text: 'Kanji',
        },
      },
    });
  }

  _renderItem=({ item }) => (
    <TouchableOpacity onPress={() => this.hanldeLetterPressed(item)}>
      <View style={styles.kanjiContainer}>
        <Text style={styles.kanjiText}>{item.TenChu}</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { kanjiList } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={kanjiList}
          numColumns={5}
          renderItem={this._renderItem}
          keyExtractor={(e, index) => `${e.IdChuCai} - ${index}`}
          extraData={this.props}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  kanjiList: state.kanjiList,
});

const mapDispatchToProps = dispatch => ({
  kanjiActions: bindActionCreators(kanjiAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiScreen);

const { width, height } = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  kanjiContainer: {
    width: width / 5,
    height: width / 5,
    borderRightWidth: 1,
    borderRightColor: Colors.black,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  kanjiText: {
    color: Colors.black,
    fontSize: FontSizes.h2,
  },
});
