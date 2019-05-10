import * as types from './newword.types';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_NEWWORDS:
    return { ...state };
  case types.GET_NEWWORDS_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_NEWWORDS_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
