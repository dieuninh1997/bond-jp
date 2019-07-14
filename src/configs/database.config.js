import { openDatabase } from 'react-native-sqlite-storage';

// const db = openDatabase({
//   name: 'database',
//   createFromLocation: '~www/database.sqlite',
// },
// () => { console.log('Ket noi thanh cong'); },
// (error) => {
//   console.log(error);
// });

const db = openDatabase({
  name: 'database',
  createFromLocation: '~www/database_4.sqlite',
},
() => { console.log('Ket noi data thanh cong'); },
(error) => {
  console.log(error);
});

export default db;
