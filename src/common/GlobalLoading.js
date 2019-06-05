import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Colors } from './variables';

export default class GlobalLoading extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 64,
      color: Colors.green,
    };
  }

  render() {
    const {
      types, index, color, size,
    } = this.state;
    const type = types[index];
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.4}
        isVisible
        avoidKeyboard
        useNativeDriver
        transparent
      >
        <View style={styles.container}>
          <Spinner isVisible size={size} type={type} color={color} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
