import { alphabetReducer, alphabetListReducer, newspapersReducer } from '../redux';

const rootReducer = {
  alphabets: alphabetReducer,
  alphabetList: alphabetListReducer,
  newspapers: newspapersReducer,
};

export default rootReducer;
