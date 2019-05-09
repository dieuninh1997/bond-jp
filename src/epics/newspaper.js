import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import * as newspaperTypes from '../redux/newspaper/newspaper.types';
import db from '../configs/database.config';

// get all letters in alphabet
const getNewspapers = action$ => action$.pipe(
  ofType(newspaperTypes.GET_NEWSPAPERS),
  mergeMap((action) => {
    const { callback } = action.payload;

    return new Promise(((resolve, reject) => {
      db.transaction((txn) => {
        txn.executeSql('select * from Bao;', [], (tx, results) => {
          const tmp = [];
          console.log('================================================');
          console.log('newspaper result', results);
          console.log('================================================');
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              tmp.push(results.rows.item(i));
            }
          }
          console.log('================================================');
          console.log('newspaper tmp', tmp);
          console.log('================================================');
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
    console.log('newspaper res', res);
    console.log('================================================');
    if (res && res.error) {
      res.callback(res.error);
      return {
        type: newspaperTypes.GET_NEWSPAPERS_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: newspaperTypes.GET_NEWSPAPERS_SUCCESS,
      payload: res.data,
    };
  }),
);

export {
  getNewspapers,
};
