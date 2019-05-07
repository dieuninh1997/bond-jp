import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import screens from '../components';
import store from './store.config';

const registerScreens = () => {
  Navigation.registerComponent('bondjp.MainScreen', () => screens.MainScreen);
  Navigation.registerComponentWithRedux('bondjp.AlphabetScreen', () => screens.AlphabetScreen, Provider, store);
  Navigation.registerComponent('bondjp.CommunicationScreen', () => screens.CommunicationScreen);
  Navigation.registerComponent('bondjp.GrammarScreen', () => screens.GrammarScreen);
  Navigation.registerComponent('bondjp.KanjiScreen', () => screens.KanjiScreen);
  Navigation.registerComponent('bondjp.ListeningScreen', () => screens.ListeningScreen);
  Navigation.registerComponent('bondjp.NewspapersScreen', () => screens.NewspapersScreen);
  Navigation.registerComponent('bondjp.NewwordsScreen', () => screens.NewwordsScreen);
  Navigation.registerComponent('bondjp.PracticeScreen', () => screens.PracticeScreen);
};

export default registerScreens;
