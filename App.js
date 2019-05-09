import { Navigation } from 'react-native-navigation';
import registerScreens from './src/configs/screen.config';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'bondjp.WelcomeScreen',
              options: {
                index: 0,
              },
            },
          },
        ],
      },
    },
  });
});
