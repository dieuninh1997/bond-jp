import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import _ from 'lodash';
import * as newwordsAction from '../../redux/newword/newword.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';

class NewwordScreen extends React.PureComponent {
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

  state={
    index: 0,
  }

  hanldePreviousPressed=() => {
    console.log('================================================');
    console.log('back nw');
    console.log('================================================');
    const { newwords, item } = this.props;
    const { index } = this.state;
    const newwordsOfType = _.filter(newwords, { IdLoai: item.IdLoai });
    if (index - 1 >= 0) {
      this.setState({ index: index - 1 });
    } else {
      this.setState({ index: newwordsOfType.length - 1 });
    }
  }

  hanldeNextPressed=() => {
    console.log('================================================');
    console.log('next nw');
    console.log('================================================');
    const { newwords, item } = this.props;
    const { index } = this.state;
    const newwordsOfType = _.filter(newwords, { IdLoai: item.IdLoai });
    if (index + 1 < newwordsOfType.length) {
      this.setState({ index: index + 1 });
    } else {
      this.setState({ index: 0 });
    }
  }

  render() {
    const { newwords, item } = this.props;
    const { index } = this.state;
    const newwordsOfType = _.filter(newwords, { IdLoai: item.IdLoai });
    const nw = newwordsOfType[index];// .get(index);
    return (
      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/png;base64,${nw.HinhAnh}` }}
            resizeMode="stretch"
          />
          <View style={styles.separator} />
          <Text style={styles.newword}>{nw.TuVung}</Text>
          <Text style={styles.meaning}>{nw.Nghia}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* previous button */}
          <TouchableOpacity style={[styles.button, styles.left]} onPress={this.hanldePreviousPressed}>
            <Text style={styles.previous}>Previous</Text>
          </TouchableOpacity>

          {/* next button */}
          <TouchableOpacity style={[styles.button, styles.right]} onPress={this.hanldeNextPressed}>
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({ newwords: state.newwords });


const mapDispatchToProps = dispatch => ({
  newwordsActions: bindActionCreators(newwordsAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewwordScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Sizes.s2,
  },
  newword: {
    color: Colors.black,
    fontSize: FontSizes.h5,
    marginVertical: Sizes.s2,
    fontWeight: 'bold',
  },

  meaning: {
    color: Colors.black,
    fontSize: FontSizes.p,
    marginBottom: Sizes.s4,
  },

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: Sizes.s6,
    borderRadius: Sizes.s1,
    backgroundColor: Colors.white,
    elevation: Sizes.s1,
    shadowOpacity: 0.5,
  },

  separator: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.gray,
  },

  image: {
    width: '80%',
    height: '80%',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginBottom: Sizes.s5,
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightenBlue,
    paddingVertical: Sizes.s3,
    borderRadius: Sizes.s1,
  },

  left: {
    marginRight: Sizes.s1,
  },

  right: {
    marginLeft: Sizes.s1,
  },

  previous: {
    color: Colors.info,
    fontSize: FontSizes.p,
  },

  next: {
    color: Colors.info,
    fontSize: FontSizes.p,
  },
});
