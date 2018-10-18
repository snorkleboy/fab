import TabberView from "./components/tabberView/tabberViewContainer";
import Header from "./components/header/HeaderContainer";
import Modal from "UILibrary/uiHOCs/modal/modalContainer";
import {FeatureProvider,FeatureGetter} from "featureLoader"

import React from "react";
import ReactDOM from "react-dom";
import style from "./weatherModule.scss";
import {featurePoints,SimpleFeaturePoint} from "Feature"
const MainApp = () => (
    <div>
        <FeatureGetter />
        <Header />
        <div className={"flex-row"}>
            <FeatureProvider featurePointName={featurePoints.tabberView}>
                <TabberView />
            </FeatureProvider>
            <SimpleFeaturePoint featurePointName={featurePoints.Main}/>
        </div>
        
        <Modal />
    </div>
)

export default MainApp;