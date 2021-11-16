// Redux development tool: https://github.com/zalmoxisus/redux-devtools-extension#usage

import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authreducer';
import { ideaReducer } from '../reducers/ideaReducer';

const reducers = combineReducers({
    auth: authReducer,
    ideas: ideaReducer
})

export const store = createStore( 
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux dev tool
);

