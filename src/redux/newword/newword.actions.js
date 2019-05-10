import * as types from './newword.types';

export const getNewwords = (data, callback) => ({
  type: types.GET_NEWWORDS,
  payload: { data, callback },
});
