import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import * as alphabetTypes from '../redux/grammar/grammar.types';
import db from '../configs/database.config';

// get all grammar
const getGrammars = action$ => action$.pipe(
  ofType(alphabetTypes.GET_GRAMMAR),
  mergeMap((action) => {
    const { callback } = action.payload;

    return new Promise(((resolve, reject) => {
      db.transaction((txn) => {
        txn.executeSql('select * from NguPhap;', [], (tx, results) => {
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
        type: alphabetTypes.GET_GRAMMAR_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: alphabetTypes.GET_GRAMMAR_SUCCESS,
      payload: res.data,
    };
  }),
);

export {
  getGrammars,
};
