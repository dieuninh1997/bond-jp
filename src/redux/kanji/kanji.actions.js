import * as types from './kanji.types';

export const getKanji = (data, callback) => ({
  type: types.GET_KANJI,
  payload: { data, callback },
});
