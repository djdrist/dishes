import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const subreducers = {
	form: formReducer,
};

const reducer = combineReducers(subreducers);
const store = createStore(reducer);

export default store;
