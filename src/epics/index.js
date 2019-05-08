import { combineEpics } from 'redux-observable';
import { getLettersAlphabet } from './alphabet';
import { getAlphabetList } from './alphabetlist';


const rootEpic = combineEpics(
  getLettersAlphabet,
  getAlphabetList,
);

export default rootEpic;
