import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { openDatabase } from 'react-native-sqlite-storage';
import { reject } from 'rsvp';
import * as alphabetTypes from '../redux/alphabet/alphabet.types';

const db = openDatabase({
  name: 'database',
  createFromLocation: '~www/database.sqlite',
},
() => { console.log('Ket noi thanh cong'); },
(error) => {
  console.log(error);
});

const getAlphabets = action$ => action$.pipe(
  ofType(alphabetTypes.GET_ALPHABET),
  mergeMap((action) => {
    const { callback } = action.payload;

    return new Promise(((resolve, reject) => {
      db.transaction((txn) => {
        txn.executeSql('select * from ChuCai;', [], (tx, results) => {
          const tmp = [];
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              tmp.push(results.rows.item(i));
            }
          }
          resolve({
            data: tmp,
            callback,
          });
        });
      });
    }));
  }),
  map((res) => {
    if (res && res.error) {
      res.callback(res.error);
      return {
        type: alphabetTypes.GET_ALPHABET_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: alphabetTypes.GET_ALPHABET_SUCCESS,
      payload: res.data,
    };
  }),
);

export {
  getAlphabets,
};
