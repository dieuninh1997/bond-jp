import * as types from './alphabet.types';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_ALPHABET:
    return { ...state };
  case types.GET_ALPHABET_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_ALPHABET_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
