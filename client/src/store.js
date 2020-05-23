import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initState = {};

const middlerware = [thunk];

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(applyMiddleware(...middlerware))
);

export default store;