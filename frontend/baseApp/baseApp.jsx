import TabberView from "./components/tabberView/tabberViewContainer";
import Header from "./components/header/HeaderContainer";
import Modal from "UILibrary/uiHOCs/modal/modalContainer";
import {FeatureProvider,FeatureGetter} from "featureLoader"

import React from "react";
import ReactDOM from "react-dom";
import style from "./weatherModule.scss";
import {featurePoints} from "Feature";

const MainApp = () => (
    <div>
        <FeatureGetter />
        <Header />
        <FeatureProvider featurePointName={featurePoints.tabberView}>
            <TabberView />
        </FeatureProvider>
        
        <Modal />
    </div>
)

export default MainApp;