import { combineEpics } from 'redux-observable';
import { getLettersAlphabet } from './alphabet';
import { getAlphabetList } from './alphabetlist';
import { getKanji } from './kanji';


const rootEpic = combineEpics(
  getLettersAlphabet,
  getAlphabetList,
  getKanji,
);

export default rootEpic;
