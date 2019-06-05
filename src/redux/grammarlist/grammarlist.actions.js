import * as types from './grammarlist.types';

export const getGrammarList = (data, callback) => ({
  type: types.GET_GRAMMAR_LIST,
  payload: { data, callback },
});
