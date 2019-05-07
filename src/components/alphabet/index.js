import React from 'react';
import {
  View, Text, FlatList, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as alphabetAction from '../../redux/alphabet/alphabet.actions';

class AlphabetScreen extends React.PureComponent {
  componentDidMount = () => {
    const { alphabetActions } = this.props;
    alphabetActions.getAlphabets({}, (error) => {
      if (error) {
        console.log('error', error);
      }
    });
  }

  _renderItem=({ item }) => (
    <View style={{ flex: 1, height: 150 }}>
      <Text>{item.TenChu}</Text>
      <Image style={{ width: 100, height: 100 }} source={{ uri: `data:image/png;base64,${item.HinhAnh}` }} resizeMode="stretch" />
    </View>
  )

  render() {
    const { alphabets } = this.props;
    console.log(alphabets);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={alphabets}
          numColumns={5}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${item.Id} - ${index}`}
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
