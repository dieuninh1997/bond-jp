import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import * as subjectTypes from '../redux/subject/subject.types';
import db from '../configs/database.config';

const getSubjects = action$ => action$.pipe(
  ofType(subjectTypes.GET_SUBJECTS),
  mergeMap((action) => {
    const { callback } = action.payload;

    return new Promise(((resolve, reject) => {
      db.transaction((txn) => {
        txn.executeSql('select * from ChuDeTuVung;', [], (tx, results) => {
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
        type: subjectTypes.GET_SUBJECTS_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: subjectTypes.GET_SUBJECTS_SUCCESS,
      payload: res.data,
    };
  }),
);


export {
  getSubjects,
};
