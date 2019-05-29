import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import * as communicationListTypes from '../redux/communicationlist/communicationlist.types';
import db from '../configs/database.config';

// get list of alphabet: higarana, katakana
const getCommunicationList = action$ => action$.pipe(
  ofType(communicationListTypes.GET_COMMUNICATION_LIST),
  mergeMap((action) => {
    const { callback } = action.payload;

    return new Promise(((resolve, reject) => {
      db.transaction((txn) => {
        txn.executeSql('select * from HoiThoai;', [], (tx, results) => {
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
        type: communicationListTypes.GET_COMMUNICATION_LIST_FAIL,
        payload: res.error,
      };
    }
    res.callback();
    return {
      type: communicationListTypes.GET_COMMUNICATION_LIST_SUCCESS,
      payload: res.data,
    };
  }),
);


export {
  getCommunicationList,
};
