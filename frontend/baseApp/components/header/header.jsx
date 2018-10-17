import React from 'react';
import ReactDom from 'react-dom'
import style from './header.scss'
import { Icon,Dropdown } from 'semantic-ui-react'
import MessageDisplayer from 'UILibrary/messageDisplayer/messageDisplayer'
import {FeatureProvider} from "featureLoader";
import {featurePoints} from "Feature";
import featureProvider from "frontend/Feature/featureProvider/featureProvider";

export default class WeatherModule extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <section className="flex-column mainHeader">
                <div className="flex-row header">
                    <div className="flex-row">
                        <i className="hamburger fas fa-bars"></i>
                        <img className="logoImg whiteBackground" src="./imgs/sclogo.png"/>
                    </div>
                    <MessageDisplayer/>
                    <div className="right flex-row">
                        <i className="fas fa-user"></i>
                        <FeatureProvider featurePointName={featurePoints.HeaderMenu}>
                            <Menu/>
                        </FeatureProvider>
                    </div>
                </div>
            </section>
        )
    }
}

class Menu extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props);
        return (
            <section className={"flex-column"}>
                {this.props.FeaturePointChildren.map(C=><C.component {...C.props}/>)}
            </section>
        )
    }
}