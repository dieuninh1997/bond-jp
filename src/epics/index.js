import { combineEpics } from 'redux-observable';
import { getLettersAlphabet } from './alphabet';
import { getAlphabetList } from './alphabetlist';
import { getKanji } from './kanji';
import { getNewspapers } from './newspaper';
import { getNewwords } from './newword';
import { getSubjects } from './subject';
import { getCommunicationList } from './communicationlist';
import { getListeningList } from './listeninglist';
import { getGrammarList } from './grammarlist';

const rootEpic = combineEpics(
  getLettersAlphabet,
  getAlphabetList,
  getKanji,
  getNewspapers,
  getNewwords,
  getSubjects,
  getCommunicationList,
  getListeningList,
  getGrammarList,
);

export default rootEpic;
