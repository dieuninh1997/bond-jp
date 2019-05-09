import { combineEpics } from 'redux-observable';
import { getLettersAlphabet } from './alphabet';
import { getAlphabetList } from './alphabetlist';
import { getKanji } from './kanji';
import { getNewspapers } from './newspaper';


const rootEpic = combineEpics(
  getLettersAlphabet,
  getAlphabetList,
  getKanji,
  getNewspapers,
);

export default rootEpic;
