import { combineReducers } from 'redux';
import someReducer from './someReducer'; // import your individual reducers

const rootReducer = combineReducers({
  someReducer, // Add more reducers here if needed
});

export default rootReducer;
