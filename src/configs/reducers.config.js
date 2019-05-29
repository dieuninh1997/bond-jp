import {
  alphabetReducer,
  alphabetListReducer,
  kanjiReducer,
  newspapersReducer,
  newworsdReducer,
  subjectReducer,
  communicationListReducer,
} from '../redux';

const rootReducer = {
  alphabets: alphabetReducer,
  alphabetList: alphabetListReducer,
  kanjiList: kanjiReducer,
  newspapers: newspapersReducer,
  newwords: newworsdReducer,
  subjects: subjectReducer,
  communicationList: communicationListReducer,
};

export default rootReducer;
