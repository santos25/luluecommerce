import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root-reducer';


const middleware = [logger , thunk];

// const store = createStore(rootReducer , applyMiddleware(...middleware));

export let store = createStore(rootReducer, applyMiddleware(...middleware));
export let persistor = persistStore(store)

// export default {
//     store,
//     persistor
// }

