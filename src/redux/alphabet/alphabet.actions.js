import * as types from './alphabet.types';

export const getAlphabets = (data, callback) => ({
  type: types.GET_ALPHABET,
  payload: { data, callback },
});
