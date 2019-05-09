import * as types from './newspaper.types';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_NEWSPAPERS:
    return { ...state };
  case types.GET_NEWSPAPERS_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_NEWSPAPERS_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
