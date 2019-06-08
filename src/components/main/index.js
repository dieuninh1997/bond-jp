import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScaledSheet } from 'react-native-size-matters';
import * as alphabetListAction from '../../redux/alphabetlist/alphabetlist.actions';
import * as alphabetAction from '../../redux/alphabet/alphabet.actions';
import * as kanjiAction from '../../redux/kanji/kanji.actions';
import * as newspaperAction from '../../redux/newspaper/newspaper.actions';
import * as newwordAction from '../../redux/newword/newword.actions';
import * as subjectAction from '../../redux/subject/subject.actions';
import * as communicationListAction from '../../redux/communicationlist/communicationlist.actions';
import * as listeningListAction from '../../redux/listeninglist/listeninglist.actions';
import * as grammarListAction from '../../redux/grammarlist/grammarlist.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';
import AlphabetIcon from '../../assets/svg/alphabet.svg';
import KanjiIcon from '../../assets/svg/kanji.svg';
import DigitalIcon from '../../assets/svg/digital.svg';
import FlashCardIcon from '../../assets/svg/vocabulary.svg';
import ChatIcon from '../../assets/svg/chat.svg';
import NewsIcon from '../../assets/svg/newspaper.svg';
import Mp3Icon from '../../assets/svg/mp3.svg';
import HeadphonesIcon from '../../assets/svg/headphones.svg';

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
        backButton: {
          visible: false,
        },
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
    const {
      alphabetListActions,
      alphabetActions,
      kanjiActions,
      newspaperActions,
      newwordActions,
      subjectActions,
      communicationListActions,
      listeningListActions,
      grammarListActions,
    } = this.props;

    grammarListActions.getGrammarList({}, (error) => {
      if (error) {
        console.log('getKanji error', error);
      }
    });
    listeningListActions.getListeningList({}, (error) => {
      if (error) {
        console.log('getKanji error', error);
      }
    });
    communicationListActions.getCommunicationList({}, (error) => {
      if (error) {
        console.log('getKanji error', error);
      }
    });

    subjectActions.getSubjects({}, (error) => {
      if (error) {
        console.log('getKanji error', error);
      }
    });

    newwordActions.getNewwords({}, (error) => {
      if (error) {
        console.log('getKanji error', error);
      }
    });

    kanjiActions.getKanji({}, (error) => {
      if (error) {
        console.log('getKanji error', error);
      }
    });

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
    newspaperActions.getNewspapers({}, (error) => {
      if (error) {
        console.log('getLettersAlphabet error', error);
      }
    });
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
            text: 'Kanji',
          },
        },
      });
      break;
    case data[2]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.GrammarListScreen',
          passProps: {
            text: 'Ngữ pháp',
          },
        },
      });
      break;
    case data[3]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.SubjectScreen',
          passProps: {
            text: 'Từ vựng',
          },
        },
      });
      break;
    case data[4]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.CommunicationListScreen',
          passProps: {
            text: 'Hội thoại',
          },
        },
      });
      break;
    case data[5]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.NewspapersScreen',
          passProps: {
            text: 'Đọc báo',
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
          name: 'bondjp.ListeningListScreen',
          passProps: {
            text: 'Nghe nhạc',
          },
        },
      });
      break;

    default:
      break;
    }
  }

  _renderItem = (item, type) => (
    <TouchableOpacity onPress={() => this.onItemPressed(item)} style={styles.cardContainer}>
      {type === 0 ? <AlphabetIcon /> : null}
      {type === 1 ? <KanjiIcon /> : null}
      {type === 2 ? <DigitalIcon /> : null}
      {type === 3 ? <FlashCardIcon /> : null}
      {type === 4 ? <ChatIcon /> : null}
      {type === 5 ? <NewsIcon /> : null}
      {type === 6 ? <HeadphonesIcon /> : null}
      {type === 7 ? <HeadphonesIcon /> : null}
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
          {this._renderItem(data[0], 0)}
          {this._renderItem(data[1], 1)}
        </View>

        <View style={styles.content}>
          {this._renderItem(data[2], 2)}
          {this._renderItem(data[3], 3)}
        </View>

        <View style={styles.content}>
          {this._renderItem(data[4], 4)}
          {this._renderItem(data[5], 5)}
        </View>

        <View style={[styles.content, { marginBottom: Sizes.s4 }]}>
          {/* {this._renderItem(data[6])} */}
          {this._renderItem(data[7], 7)}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({ alphabetList: state.alphabetList });
const mapDispatchToProps = dispatch => ({
  alphabetListActions: bindActionCreators(alphabetListAction, dispatch),
  alphabetActions: bindActionCreators(alphabetAction, dispatch),
  kanjiActions: bindActionCreators(kanjiAction, dispatch),
  newspaperActions: bindActionCreators(newspaperAction, dispatch),
  newwordActions: bindActionCreators(newwordAction, dispatch),
  subjectActions: bindActionCreators(subjectAction, dispatch),
  communicationListActions: bindActionCreators(communicationListAction, dispatch),
  listeningListActions: bindActionCreators(listeningListAction, dispatch),
  grammarListActions: bindActionCreators(grammarListAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
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
    color: Colors.black,
    textAlign: 'center',
    marginTop: Sizes.s2,
  },
  cardContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Sizes.s2,
    padding: Sizes.s2,
    borderRadius: Sizes.s1,
    elevation: Sizes.s1,
    shadowOpacity: 0.5,
  },
});
