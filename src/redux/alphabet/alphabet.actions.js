import * as types from './alphabet.types';

export const getLettersAlphabet = (data, callback) => ({
  type: types.GET_LETTERS_ALPHABET,
  payload: { data, callback },
});
