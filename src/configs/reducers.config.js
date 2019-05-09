import { alphabetReducer, alphabetListReducer, kanjiReducer } from '../redux';

const rootReducer = {
  alphabets: alphabetReducer,
  alphabetList: alphabetListReducer,
  kanjiList: kanjiReducer,
};

export default rootReducer;
