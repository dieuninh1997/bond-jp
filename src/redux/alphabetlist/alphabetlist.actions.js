import * as types from './alphabetlist.types';

export const getAlphabetList = (data, callback) => ({
  type: types.GET_ALPHABET_LIST,
  payload: { data, callback },
});
