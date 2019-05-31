import React from 'react';
import {
  View, Text, Modal, TouchableOpacity, Dimensions, PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { ScaledSheet } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import RNFS from 'react-native-fs';
import GlobalAudio from '../../common/GlobalAudio';
import { Sizes, Colors, FontSizes } from '../../common/variables';

class CommunicationScreen extends React.PureComponent {
  static options(passProps) {
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
      },
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      showModal: true,
    };
  }

  componentDidMount() {
    //

  }

  hanldeCloseModal=() => {
    this.setState({ showModal: false });
  }

  async requestPermission=() =>{
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
        console.log('You can use the camera');
        return true
      } else {
        return false
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
      return false
    }
  }

  hanldeDownloadAudio=async (url, fileName) => {
    if(this.requestPermission()){
      try {
        const res = await RNFetchBlob
          .config({
          // DCIMDir is in external storage
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              description: 'File downloaded by download manager.',
              mime: 'audio/mpeg',
              mediaScannable: true,
              path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
            },
          })
          .fetch('GET', url, { 'Cache-Control': 'no-store' });
        console.log('================================================');
        console.log('res', res);
        console.log('================================================');
      }
    } catch (error) {
      console.log('================================================');
      console.log('hanldeDownloadAudio error: ', error);
      console.log('================================================');
    }
  }

  // https://drive.google.com/file/d/1tFCbqGHK-8XLgjgouiIMfd1yrul3Nc2E/view?usp=sharing
  // http://docs.google.com/uc?export=open&id=1tFCbqGHK-8XLgjgouiIMfd1yrul3Nc2E
  render() {
    const { item } = this.props;
    const { showModal } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.TieuDe}</Text>
        <GlobalAudio filepath="audio1.mp3" />
        <Modal
          visible={showModal}
          animationType="slide"
          transparent
          onRequestClose={() => {
          }}
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
                  onPress={() => this.hanldeDownloadAudio(item.Path, item.Ten)}
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
export default CommunicationScreen;
const { width, height } = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: Sizes.s2,
    backgroundColor: Colors.white,
  },
  title: {
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
