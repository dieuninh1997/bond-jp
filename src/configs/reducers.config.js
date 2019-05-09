import {
  alphabetReducer,
  alphabetListReducer,
  kanjiReducer,
  newspapersReducer,
} from '../redux';

const rootReducer = {
  alphabets: alphabetReducer,
  alphabetList: alphabetListReducer,
  kanjiList: kanjiReducer,
  newspapers: newspapersReducer,
};

export default rootReducer;
