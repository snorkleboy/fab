import TabberView from "./components/tabberView/tabberViewContainer";
import Header from "./components/header/HeaderContainer";
import Modal from "UILibrary/uiHOCs/modal/modalContainer";
import React from "react";
import ReactDOM from "react-dom";
import style from "./weatherModule.scss";

const MainApp = () => (
    <div>
        <Header />
        <TabberView />
        <Modal />
    </div>
)

export default MainApp;