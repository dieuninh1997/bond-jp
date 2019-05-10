import * as types from './subject.types';

export const getSubjects = (data, callback) => ({
  type: types.GET_SUBJECTS,
  payload: { data, callback },
});
