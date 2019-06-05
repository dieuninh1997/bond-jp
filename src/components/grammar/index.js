import React from 'react';
import {
  View, Text, Modal, TouchableOpacity, PermissionsAndroid, Alert, ScrollView,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { ScaledSheet } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import { RNToasty } from 'react-native-toasty';
import Video from 'react-native-video';
import { Sizes, Colors, FontSizes } from '../../common/variables';
import GlobalLoading from '../../common/GlobalLoading';

class GrammarScreen extends React.PureComponent {
  static options() {
    return {
      topBar: {
        visible: true,
        animate: true, // Controls whether TopBar visibility changes should be animated
        hideOnScroll: false,
        drawBehind: false,
        title: {
          text: 'Video',
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
    const videoPath = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Video/${item.Ten}.mp4`;
    RNFetchBlob.fs.exists(videoPath).then((res) => {
      console.log('================================================');
      console.log('videoPath', res);
      console.log('================================================');
      if (!res) {
        this.setState({ showModal: true });
      }
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'buttonDownload') {
      const { item } = this.props;
      const videoPath = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Video/${item.Ten}.mp4`;
      RNFetchBlob.fs.exists(videoPath).then((res) => {
        console.log('================================================');
        console.log('buttonDownload video', res);
        console.log('================================================');
        if (res) {
          Alert.alert('Notice', 'The video file had been downloaded. Already watching video!');
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

  getFileMp4=(driveUrl) => {
    const arr = driveUrl.split('=');
    const idFile = arr[1];
    const baseUrl = 'http://docs.google.com/uc?export=open&id=';
    const res = `${baseUrl}${idFile}`;
    return res;
  }

  hanldeDownloadVideo=async (url, fileName) => {
    this.setState({ showLoading: true, showModal: false });
    if (this.requestPermission()) {
      try {
        const dir = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Video`;
        const isDir = RNFetchBlob.fs.isDir(dir);
        if (!isDir) {
          await RNFetchBlob.fs.mkdir(dir);
        }

        const responseDownload = await RNFetchBlob
          .config({
            path: `${dir}/${fileName}.mp4`,
            useDownloadManager: true,
            notification: true,
          })
          .fetch('GET', url);
        console.log('================================================');
        console.log('url', url);
        console.log('responseDownload.path()', responseDownload.path());
        console.log('================================================');
        RNFetchBlob.fs.scanFile([{ path: responseDownload.path(), mime: 'video/mp4' }]);
        this.setState({ isDownloadSuccess: true, showLoading: false });
        RNToasty.Show({
          title: 'Download success!',
        });
      } catch (error) {
        console.log('hanldeDownloadAudio error: ', error);
      }
    } else {
      console.log('no permission granted');
    }
  }

  render() {
    const { item } = this.props;
    const { showModal, showLoading } = this.state;
    const videoPath = `${RNFetchBlob.fs.dirs.DownloadDir}/Bondjp/Video/${item.Ten}.mp4`;
    const downloadUrl = this.getFileMp4(item.Path);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.TieuDe}</Text>
        <Video
          source={{ uri: videoPath }} // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref;
          }} // Store reference
          controls
          style={styles.backgroundVideo}
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
              <Text style={styles.modalTitle}>{`Download the audio file (${item.Ten}.mp3)?`}</Text>
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
                  onPress={() => this.hanldeDownloadVideo(downloadUrl, item.Ten)}
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
export default GrammarScreen;
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    padding: '15@s',
    flex: 1,
    fontSize: FontSizes.p,
    color: Colors.black,
  },
  audioContent: {
    paddingHorizontal: '15@s',
    paddingBottom: '15@s',
    flex: 1,
    fontSize: FontSizes.extraSmall,
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
