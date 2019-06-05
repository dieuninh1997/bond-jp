import * as types from './communicationlist.types';

export const getCommunicationList = (data, callback) => ({
  type: types.GET_COMMUNICATION_LIST,
  payload: { data, callback },
});
