import React from 'react';
import {
  View, Text, Modal, TouchableOpacity, PermissionsAndroid, Alert, ScrollView,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { ScaledSheet } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import { RNToasty } from 'react-native-toasty';
import GlobalAudio from '../../common/GlobalAudio';
import { Sizes, Colors, FontSizes } from '../../common/variables';
import GlobalLoading from '../../common/GlobalLoading';

class ListeningScreen extends React.PureComponent {
  static options() {
    return {
      topBar: {
        visible: true,
        animate: true, // Controls whether TopBar visibility changes should be animated
        hideOnScroll: false,
        drawBehind: false,
        title: {
          text: 'Nghe nhạc',
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
      isDownloadSuccess: false,
      showLoading: false,
    };
  }

  async componentDidMount() {
    const { item } = this.props;
    const musicPath = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Music/${item.Ten}.mp3`;
    RNFetchBlob.fs.exists(musicPath).then((res) => {
      console.log('================================================');
      console.log('musicPath', res);
      console.log('================================================');
      if (!res) {
        this.setState({ showModal: true });
      }
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'buttonDownload') {
      const { item } = this.props;
      const musicPath = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Music/${item.Ten}.mp3`;
      RNFetchBlob.fs.exists(musicPath).then((res) => {
        console.log('================================================');
        console.log('buttonDownload music', res);
        console.log('================================================');
        if (res) {
          Alert.alert('Notice', 'The music file had been downloaded. Already listening music!');
        } else {
          this.setState({ showModal: true });
        }
      });
    }
  }

  hanldeCloseModal=() => {
    this.setState({ showModal: false });
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

  getFileMp3=(driveUrl) => {
    const arr = driveUrl.split('=');
    const idFile = arr[1];
    const baseUrl = 'http://docs.google.com/uc?export=open&id=';
    const res = `${baseUrl}${idFile}`;
    return res;
  }

  hanldeDownloadMusic=async (url, fileName) => {
    this.setState({ showLoading: true, showModal: false });
    if (this.requestPermission()) {
      try {
        const dir = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Music`;
        const isDir = RNFetchBlob.fs.isDir(dir);
        if (!isDir) {
          await RNFetchBlob.fs.mkdir(dir);
        }

        const responseDownload = await RNFetchBlob
          .config({
            path: `${dir}/${fileName}.mp3`,
            useDownloadManager: true,
            notification: true,
          })
          .fetch('GET', url);
        RNFetchBlob.fs.scanFile([{ path: responseDownload.path(), mime: 'audio/mpeg' }]);
        this.setState({ isDownloadSuccess: true, showLoading: false });
        RNToasty.Show({
          title: 'Download success!',
        });
      } catch (error) {
        console.log('hanldeDownloadMusic error: ', error);
      }
    } else {
      console.log('no permission granted');
    }
  }


  render() {
    const { item } = this.props;
    console.log('================================================');
    console.log('ListeningScreen item', item);
    console.log('================================================');
    const { showModal, showLoading } = this.state;
    const audioPath = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Music/${item.Ten}.mp3`;
    const downloadUrl = this.getFileMp3(item.Path);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{item.TieuDe}</Text>
          <Text style={styles.lyrics}>{item.NoiDung}</Text>
        </ScrollView>

        <GlobalAudio filepath={audioPath} />

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
              <Text style={styles.modalTitle}>{`Download the music file (${item.Ten}.mp3)?`}</Text>
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
                  onPress={() => this.hanldeDownloadMusic(downloadUrl, item.Ten)}
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
export default ListeningScreen;
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: '15@s',
    flex: 1,
    fontSize: FontSizes.p,
    color: Colors.black,
  },
  lyrics: {
    paddingHorizontal: '15@s',
    paddingBottom: '15@s',
    flex: 1,
    fontSize: FontSizes.p,
    color: Colors.black,
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
