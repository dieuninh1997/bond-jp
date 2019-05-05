import { Navigation } from 'react-native-navigation';
import screens from '../components';

const registerScreens = () => {
  Navigation.registerComponent('MainScreen', () => screens.MainScreen);
};

export default registerScreens;
