import { combineEpics } from 'redux-observable';
import { getAlphabets } from './alphabet';


const rootEpic = combineEpics(
  getAlphabets,
);

export default rootEpic;
