import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import WeatherModule from './weatherModuleContainer'
import configureStore from './baseApp/store/configureStore'

document.addEventListener("DOMContentLoaded",()=>{
    let store;
    store = configureStore({});
    ReactDOM.render(
        <Provider store={store}>
            <WeatherModule />
        </Provider>,
        document.getElementById('root')
    )

})
