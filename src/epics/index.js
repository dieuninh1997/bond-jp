import { combineEpics } from 'redux-observable';
import { getLettersAlphabet } from './alphabet';
import { getAlphabetList } from './alphabetlist';
import { getNewspapers } from './newspaper';


const rootEpic = combineEpics(
  getLettersAlphabet,
  getAlphabetList,
  getNewspapers,
);

export default rootEpic;
