import * as types from './subject.types';

const initState = [];
export default function init(state = initState, action) {
  switch (action.type) {
  case types.GET_SUBJECTS:
    return { ...state };
  case types.GET_SUBJECTS_FAIL:
    return {
      error: action.payload,
    };
  case types.GET_SUBJECTS_SUCCESS:
    return [
      ...action.payload,
    ];
  default:
    return state;
  }
}
