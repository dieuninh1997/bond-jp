import { Navigation } from 'react-native-navigation';
import registerScreens from './src/configs/screen.config';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      // component: {
      //   name: 'MainScreen',
      //   options: { topBar: { visible: false, height: 0 } },
      // },
      stack: {
        children: [{
          component: {
            name: 'bondjp.MainScreen',
            passProps: {
              text: 'Ứng dụng học tiếng nhật',
            },
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
