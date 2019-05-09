import * as types from './kanji.actions';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_KANJI:
    return { ...state };
  case types.GET_KANJI_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_KANJI_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
