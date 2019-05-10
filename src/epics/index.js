import { combineEpics } from 'redux-observable';
import { getLettersAlphabet } from './alphabet';
import { getAlphabetList } from './alphabetlist';
import { getKanji } from './kanji';
import { getNewspapers } from './newspaper';
import { getNewwords } from './newword';
import { getSubjects } from './subject';


const rootEpic = combineEpics(
  getLettersAlphabet,
  getAlphabetList,
  getKanji,
  getNewspapers,
  getNewwords,
  getSubjects,
);

export default rootEpic;
