import * as types from './newspaper.types';

export const getNewspapers = (data, callback) => ({
  type: types.GET_NEWSPAPERS,
  payload: { data, callback },
});
