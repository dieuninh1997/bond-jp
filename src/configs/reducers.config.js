import {
  alphabetReducer,
  alphabetListReducer,
  kanjiReducer,
  newspapersReducer,
  newworsdReducer,
  subjectReducer,
  communicationListReducer,
  listeningListReducer,
  grammarListReducer,
} from '../redux';

const rootReducer = {
  alphabets: alphabetReducer,
  alphabetList: alphabetListReducer,
  kanjiList: kanjiReducer,
  newspapers: newspapersReducer,
  newwords: newworsdReducer,
  subjects: subjectReducer,
  communicationList: communicationListReducer,
  listeningList: listeningListReducer,
  grammarList: grammarListReducer,
};

export default rootReducer;
