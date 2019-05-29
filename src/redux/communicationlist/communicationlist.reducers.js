import * as types from './communicationlist.types';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_COMMUNICATION_LIST:
    return { ...state };
  case types.GET_COMMUNICATION_LIST_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_COMMUNICATION_LIST_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
