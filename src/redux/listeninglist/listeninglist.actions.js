import * as types from './listeninglist.types';

export const getListeningList = (data, callback) => ({
  type: types.GET_LISTENING_LIST,
  payload: { data, callback },
});
