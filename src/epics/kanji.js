import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import * as kanjiTypes from '../redux/kanji/kanji.types';
import db from '../configs/database.config';


// get all letters in kanji
const getKanji = action$ => action$.pipe(
  ofType(kanjiTypes.GET_KANJI),
  mergeMap((action) => {
    const { callback } = action.payload;
    return new Promise(((resolve, reject) => {
      db.transaction((txn) => {
        txn.executeSql('select * from Kanji;', [], (tx, results) => {
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
        type: kanjiTypes.GET_KANJI_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: kanjiTypes.GET_KANJI_SUCCESS,
      payload: res.data,
    };
  }),
);

export {
  // eslint-disable-next-line import/prefer-default-export
  getKanji,
};
