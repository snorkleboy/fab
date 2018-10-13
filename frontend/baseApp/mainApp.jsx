import Map from './components/map/mapControllerContainer'
import Header from './components/header/HeaderContainer'
import Modal from './components/uiHOCs/modal/modalContainer'
import React from 'react';
import ReactDOM from 'react-dom';
import style from '../weatherModule.scss'

const MainApp = () => (
    <div>
        <Header />
        <Map />
        <Modal />
    </div>
)

export default MainApp;