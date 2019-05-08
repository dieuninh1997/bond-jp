import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import * as alphabetListAction from '../../redux/alphabetlist/alphabetlist.actions';
import * as alphabetAction from '../../redux/alphabet/alphabet.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';


class MainScreen extends React.PureComponent {
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
        // leftButtons: {
        //   id: 'buttonInstaHome',
        //   icon: require('../../assets/images/icon_insta.png'),
        // },
      },
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      data: [
        'Học bảng chữ cái',
        'Học Kanji',
        'Học ngữ pháp qua video',
        'Học từ vựng flash card',
        'Học hội thoại giao tiếp',
        'Đọc báo tiếng Nhật',
        'Kiểm tra, ôn tập kiến thức',
        'Nghe nhạc tiếng Nhật'],
    };
  }


  componentWillMount() {
    const { alphabetListActions, alphabetActions } = this.props;
    alphabetListActions.getAlphabetList({}, (error) => {
      if (error) {
        console.log('getAlphabetList error', error);
      }
    });
    alphabetActions.getLettersAlphabet({}, (error) => {
      if (error) {
        console.log('getLettersAlphabet error', error);
      }
    });
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onItemPressed = (name) => {
    const { componentId } = this.props;
    const { data } = this.state;
    switch (name) {
    case data[0]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.AlphabetListScreen',
          passProps: {
            text: 'Bảng chữ cái',
          },
        },
      });
      break;
    case data[1]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.KanjiScreen',
          passProps: {
            text: '',
          },
        },
      });
      break;
    case data[2]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.GrammarScreen',
          passProps: {
            text: '',
          },
        },
      });
      break;
    case data[3]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.NewwordsScreen',
          passProps: {
            text: '',
          },
        },
      });
      break;
    case data[4]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.CommunicationScreen',
          passProps: {
            text: '',
          },
        },
      });
      break;
    case data[5]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.NewspapersScreen',
          passProps: {
            text: '',
          },
        },
      });
      break;
    case data[6]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.PracticeScreen',
          passProps: {
            text: '',
          },
        },
      });
      break;
    case data[7]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.ListeningScreen',
          passProps: {
            text: 'Bảng chữ cái',
          },
        },
      });
      break;

    default:
      break;
    }
  }

  _renderItem = item => (
    <TouchableOpacity onPress={() => this.onItemPressed(item)} style={styles.cardContainer}>
      <Text style={styles.text}>
        {
          item
        }
      </Text>
    </TouchableOpacity>
  )

  _keyExtractor = (item, index) => `${item} ${index}`

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        {/* content */}
        <View style={[styles.content, { marginTop: Sizes.s4 }]}>
          {this._renderItem(data[0])}
          {this._renderItem(data[1])}
        </View>

        <View style={styles.content}>
          {this._renderItem(data[2])}
          {this._renderItem(data[3])}
        </View>

        <View style={styles.content}>
          {this._renderItem(data[4])}
          {this._renderItem(data[5])}
        </View>

        <View style={[styles.content, { marginBottom: Sizes.s4 }]}>
          {this._renderItem(data[6])}
          {this._renderItem(data[7])}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({ alphabetList: state.alphabetList });


const mapDispatchToProps = dispatch => ({
  alphabetListActions: bindActionCreators(alphabetListAction, dispatch),
  alphabetActions: bindActionCreators(alphabetAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.s2,
    flexDirection: 'row',
  },
  text: {
    fontSize: FontSizes.p,
    color: Colors.info,
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: Sizes.s2,
    padding: Sizes.s2,
    borderRadius: Sizes.s1,
  },
});
