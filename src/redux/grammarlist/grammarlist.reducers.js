import * as types from './grammarlist.types';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_GRAMMAR_LIST:
    return { ...state };
  case types.GET_GRAMMAR_LIST_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_GRAMMAR_LIST_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
