import React from 'react';
import ReactDOM from 'react-dom'
import asyncImport from "frontend/asyncImport"
export default class FeatureGetter extends React.Component {
    constructor(props){
        super(props);
        console.log("FEATURE CONSTRUCT",{props})

    }
    render(){
        console.log("FEATURE GETTER",{props:this.props})
        this.props.featuresToLoad
        return <h1>"hello"</h1>;
    }

} 