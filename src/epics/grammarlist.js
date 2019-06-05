import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import * as grammarListTypes from '../redux/grammarlist/grammarlist.types';
import db from '../configs/database.config';

// get all grammar
const getGrammarList = action$ => action$.pipe(
  ofType(grammarListTypes.GET_GRAMMAR_LIST),
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
        type: grammarListTypes.GET_GRAMMAR_LIST_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: grammarListTypes.GET_GRAMMAR_LIST_SUCCESS,
      payload: res.data,
    };
  }),
);

export {
  getGrammarList,
};
