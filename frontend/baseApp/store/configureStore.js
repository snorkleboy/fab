import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import createRootReducer from './rootReducer';

let store;
function reducerReplacer(){
}
reducerReplacer.setStore = (appStore)=>{console.log({appStore});(store = appStore)};
reducerReplacer.injectReducers = (reducers)=> {const newRoot = createRootReducer(reducers);console.log("INJECT REDUCERS",{reducers,newRoot});store.replaceReducer(newRoot)}

const configureStore = (preloadedState = {}) =>
{
    const middlewares = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        // must use 'require' (import only allowed at top of file)
        const { logger } = require('redux-logger');
        middlewares.push(logger);
    }
    return(
        createStore(
            createRootReducer({}),
            preloadedState,
            applyMiddleware(...middlewares)
        )
    );
}
export {configureStore,reducerReplacer};