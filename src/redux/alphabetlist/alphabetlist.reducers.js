import * as types from './alphabetlist.types';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_ALPHABET_LIST:
    return { ...state };
  case types.GET_ALPHABET_LIST_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_ALPHABET_LIST_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
