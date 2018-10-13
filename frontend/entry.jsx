import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import AuthCheck from './authCheck/authcheckContainer'
import configureStore from './baseApp/store/configureStore'

document.addEventListener("DOMContentLoaded",()=>{
    let store;
    store = configureStore({});
    ReactDOM.render(
        <Provider store={store}>
            <AuthCheck / >
        </Provider>,
        document.getElementById('root')
    )

})
