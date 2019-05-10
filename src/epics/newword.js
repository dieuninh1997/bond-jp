import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import * as newwordsTypes from '../redux/newword/newword.types';
import db from '../configs/database.config';

const getNewwords = action$ => action$.pipe(
  ofType(newwordsTypes.GET_NEWWORDS),
  mergeMap((action) => {
    const { callback } = action.payload;

    return new Promise(((resolve, reject) => {
      db.transaction((txn) => {
        txn.executeSql('select * from TuVung;', [], (tx, results) => {
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
        type: newwordsTypes.GET_NEWWORDS_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: newwordsTypes.GET_NEWWORDS_SUCCESS,
      payload: res.data,
    };
  }),
);


export {
  getNewwords,
};
