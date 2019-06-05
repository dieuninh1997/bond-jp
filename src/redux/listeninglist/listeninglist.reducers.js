import * as types from './listeninglist.types';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_LISTENING_LIST:
    return { ...state };
  case types.GET_LISTENING_LIST_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_LISTENING_LIST_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
