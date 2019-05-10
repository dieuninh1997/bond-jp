import { Navigation } from 'react-native-navigation';

export const goMain = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'bondjp.MainScreen',
            passProps: {
              text: 'Ứng dụng học tiếng nhật',
            },
          },
        },
      ],
    },
  },
});
