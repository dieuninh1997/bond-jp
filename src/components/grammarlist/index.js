import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Modal, Alert, PermissionsAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScaledSheet } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import RNFetchBlob from 'react-native-fetch-blob';
import * as grammarListAction from '../../redux/grammarlist/grammarlist.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';
import GlobalLoading from '../../common/GlobalLoading';

class GrammarListScreen extends React.PureComponent {
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
    this.state = {
      showLoading: false,
      showModal: false,
    };
  }

  getFileMp4=(driveUrl) => {
    const arr = driveUrl.split('=');
    const idFile = arr[1];
    const baseUrl = 'http://docs.google.com/uc?export=open&id=';
    const res = `${baseUrl}${idFile}`;
    return res;
  }

  requestPermission=async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write External Storage Permission',
          message:
            'Application needs access to your storage to download audio.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write the storage');
        return true;
      }
      console.log('Camera permission denied');
      return false;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  hanldeDownloadAudio=async () => {
    this.setState({ showModal: false });
    if (this.requestPermission()) {
      try {
        const { grammarList } = this.props;
        const dir = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Video`;

        for (const item of grammarList) {
          const downloadUrl = this.getFileMp4(item.Path);
          RNFetchBlob
            .config({
              path: `${dir}/${item.Ten.trim()}.mp4`,
              fileCache: true,
              addAndroidDownloads: {
                notification: true,
                title: `Great ! Download ${item.Ten.trim()} Success !`,
                description: 'An media file.',
                mime: 'video/mp4',
                mediaScannable: true,
              },
            })
            .fetch('GET', downloadUrl);
        }
      } catch (error) {
        console.log('hanldeDownloadAudio error: ', error);
      }
    } else {
      console.log('no permission granted');
    }
  }

  navigationButtonPressed=async ({ buttonId }) => {
    if (buttonId === 'buttonDownload') {
      const dir = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Video`;
      const isDir = await RNFetchBlob.fs.isDir(dir);
      const { grammarList } = this.props;

      if (!isDir) {
        RNFetchBlob.fs.mkdir(dir).then((res) => {
          console.log('mk down all', res);
        }).catch((error) => {
          console.log('mk error down all', error);
        });
      } else {
        RNFetchBlob.fs.ls(dir)
          .then((files) => {
            if (files.length !== grammarList.length) {
              Alert.alert(
                'Notice',
                'Download all videos?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: this.hanldeDownloadAudio },
                ],
                { cancelable: false },
              );
            } else {
              Alert.alert(
                'All videos are downloaded!',
              );
            }
          }).catch((error) => {
            console.log('down all error', error);
          });
      }
    }
  }

  hanldeCloseModal=() => {
    this.setState({ showModal: false });
  }

  handleGrammarOpened=(item) => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'bondjp.GrammarScreen',
        passProps: {
          item,
        },
        options: {
          index: 0,
        },
      },
    });
  }

  _renderItem=({ item, index }) => (
    <TouchableOpacity onPress={() => this.handleGrammarOpened(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.thuTu}>{index + 1}</Text>
        <Text style={styles.itemName}>{item.TieuDe}</Text>
        <Ionicons name="ios-arrow-forward" style={styles.iconArrow} />
      </View>
    </TouchableOpacity>

  )

  render() {
    const { grammarList } = this.props;
    const { showModal, showLoading } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={grammarList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${item.Id} - ${index}`}
          extraData={this.props}
        />
        {showLoading ? (
          <GlobalLoading />
        ) : null}

        <Modal
          visible={showModal}
          animationType="slide"
          transparent
          onRequestClose={() => {}}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Download all videos?</Text>
              <View style={styles.row}>
                {/* cancel */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.hanldeCloseModal}
                >
                  <Text style={styles.buttonCancel}>Cancel</Text>
                </TouchableOpacity>
                {/* ok */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.hanldeDownloadAudio}
                >
                  <Text style={styles.buttonOk}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({ grammarList: state.grammarList });

const mapDispatchToProps = dispatch => ({
  grammarListActions: bindActionCreators(grammarListAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GrammarListScreen);
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
  thuTu: {
    fontSize: FontSizes.minium,
    color: Colors.black,
    backgroundColor: Colors.warning,
    borderRadius: Sizes.s2,
    paddingVertical: Sizes.s1,
    paddingHorizontal: Sizes.s2,
    marginRight: Sizes.s2,
  },
  itemName: {
    flex: 1,
    fontSize: FontSizes.p,
    color: Colors.black,
  },
  iconArrow: {
    fontSize: FontSizes.p,
    color: Colors.gray,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: Sizes.s2,
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: Sizes.s2,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: FontSizes.p,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOk: {
    fontSize: FontSizes.p,
    color: Colors.black,
  },
  buttonCancel: {
    fontSize: FontSizes.p,
    color: Colors.black,
  },
  button: {
    borderRadius: '3@s',
    borderWidth: '1@s',
    borderColor: Colors.gray,
    padding: Sizes.s1,
    margin: Sizes.s3,
    width: '100@s',
    alignItems: 'center',
  },
});
