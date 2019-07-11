import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Dimensions, Alert, PermissionsAndroid, Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScaledSheet } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import RNFetchBlob from 'react-native-fetch-blob';
import * as listeningListAction from '../../redux/listeninglist/listeninglist.actions';
import { Colors, FontSizes, Sizes } from '../../common/variables';
import Mp3Icon from '../../assets/svg/mp3.svg';

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
    this.state = {
      showModal: false,
    };
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

  navigationButtonPressed=async ({ buttonId }) => {
    if (buttonId === 'buttonDownload') {
      const dir = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Music`;
      const isDir = await RNFetchBlob.fs.isDir(dir);
      const { listeningList } = this.props;

      if (!isDir) {
        RNFetchBlob.fs.mkdir(dir).then((res) => {
          console.log('mk down all', res);
        }).catch((error) => {
          console.log('mk error down all', error);
        });
      } else {
        RNFetchBlob.fs.ls(dir)
          .then((files) => {
            if (files.length !== listeningList.length) {
              Alert.alert(
                'Notice',
                'Download all musics?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: this.hanldeDownloadMusic },
                ],
                { cancelable: false },
              );
            } else {
              Alert.alert(null,
                'All musics are downloaded!');
            }
          }).catch((error) => {
            console.log('down all error', error);
          });
      }
    }
  }

  getFileMp3=(driveUrl) => {
    const arr = driveUrl.split('=');
    const idFile = arr[1];
    const baseUrl = 'http://docs.google.com/uc?export=open&id=';
    const res = `${baseUrl}${idFile}`;
    return res;
  }

  hanldeDownloadMusic=async () => {
    this.setState({ showModal: false });
    if (this.requestPermission()) {
      try {
        const { listeningList } = this.props;
        const dir = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Music`;

        for (const item of listeningList) {
          const downloadUrl = this.getFileMp3(item.Path);
          RNFetchBlob
            .config({
              path: `${dir}/${item.Ten.trim()}.mp3`,
              fileCache: true,
              addAndroidDownloads: {
                notification: true,
                title: `Great ! Download ${item.Ten.trim()} Success !`,
                description: 'An audio file.',
                mime: 'audio/mpeg',
                mediaScannable: true,
              },
            })
            .fetch('GET', downloadUrl);
        }
      } catch (error) {
        console.log('hanldeDownloadMusic error: ', error);
      }
    } else {
      console.log('no permission granted');
    }
  }

  hanldeCloseModal=() => {
    this.setState({ showModal: false });
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
    const { showModal } = this.state;
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
        <Modal
          visible={showModal}
          animationType="slide"
          transparent
          onRequestClose={() => {}}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Download all audios?</Text>
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
                  onPress={this.hanldeDownloadMusic}
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
