import { Navigation } from 'react-native-navigation';
import screens from '../components';

const registerScreens = () => {
  Navigation.registerComponent('bondjp.MainScreen', () => screens.MainScreen);
  Navigation.registerComponent('bondjp.AlphabetScreen', () => screens.AlphabetScreen);
  Navigation.registerComponent('bondjp.CommunicationScreen', () => screens.CommunicationScreen);
  Navigation.registerComponent('bondjp.GrammarScreen', () => screens.GrammarScreen);
  Navigation.registerComponent('bondjp.KanjiScreen', () => screens.KanjiScreen);
  Navigation.registerComponent('bondjp.ListeningScreen', () => screens.ListeningScreen);
  Navigation.registerComponent('bondjp.NewspapersScreen', () => screens.NewspapersScreen);
  Navigation.registerComponent('bondjp.NewwordsScreen', () => screens.NewwordsScreen);
  Navigation.registerComponent('bondjp.PracticeScreen', () => screens.PracticeScreen);
};

export default registerScreens;
