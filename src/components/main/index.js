import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import GlobalHeader from 'common/GlobalHeader';
import { Colors, FontSizes, Sizes } from '../../common/variables';

class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props);
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

    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  onItemPressed = (name) => {
    const { componentId } = this.props;
    const { data } = this.state;
    switch (name) {
    case data[0]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.AlphabetScreen',
        },
      });
      break;
    case data[1]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.KanjiScreen',
        },
      });
      break;
    case data[2]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.GrammarScreen',
        },
      });
      break;
    case data[3]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.NewwordsScreen',
        },
      });
      break;
    case data[4]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.CommunicationScreen',
        },
      });
      break;
    case data[5]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.NewspapersScreen',
        },
      });
      break;
    case data[6]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.PracticeScreen',
        },
      });
      break;
    case data[7]:
      Navigation.push(componentId, {
        component: {
          name: 'bondjp.ListeningScreen',
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
        {/* header */}
        <GlobalHeader showLeftButton title="App học tiếng nhật" />
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
export default MainScreen;

const styles = StyleSheet.create({
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
