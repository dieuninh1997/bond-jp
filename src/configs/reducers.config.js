import {
  alphabetReducer,
  alphabetListReducer,
  kanjiReducer,
  newspapersReducer,
  newworsdReducer,
  subjectReducer,
} from '../redux';

const rootReducer = {
  alphabets: alphabetReducer,
  alphabetList: alphabetListReducer,
  kanjiList: kanjiReducer,
  newspapers: newspapersReducer,
  newwords: newworsdReducer,
  subjects: subjectReducer,
};

export default rootReducer;
