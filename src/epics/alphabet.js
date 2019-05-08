import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import * as alphabetTypes from '../redux/alphabet/alphabet.types';
import db from '../configs/database.config';

// get all letters in alphabet
const getLettersAlphabet = action$ => action$.pipe(
  ofType(alphabetTypes.GET_LETTERS_ALPHABET),
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
    console.log('================================================');
    console.log('res', res);
    console.log('================================================');
    if (res && res.error) {
      res.callback(res.error);
      return {
        type: alphabetTypes.GET_LETTERS_ALPHABET_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: alphabetTypes.GET_LETTERS_ALPHABET_SUCCESS,
      payload: res.data,
    };
  }),
);

export {
  getLettersAlphabet,
};
