import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GlobalHeader from 'common/GlobalHeader';

class MainScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        {/* header */}
        <GlobalHeader showLeftButton />
        <Text>Main screen</Text>
      </View>
    );
  }
}
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
