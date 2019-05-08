import { alphabetReducer, alphabetListReducer } from '../redux';

const rootReducer = {
  alphabets: alphabetReducer,
  alphabetList: alphabetListReducer,
};

export default rootReducer;
