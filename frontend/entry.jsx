import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import AuthCheck from './authCheck/authcheckContainer'
import {configureStore,reducerReplacer} from './baseApp/store/configureStore'



document.addEventListener("DOMContentLoaded",()=>{
    let store;
    store = configureStore({});
    reducerReplacer.setStore(store);
    ReactDOM.render(
        <Provider store={store}>
            <AuthCheck / >
        </Provider>,
        document.getElementById('root')
    )

})
