import React from 'react';
import ReactDOM from 'react-dom'
import asyncImport from "frontend/asyncImport" 
export default class featureProvider extends React.Component {
    constructor(props){
        super(props);
        console.log("FEATURE PROVIDER",{props})

    }
    render(){
        const children = [];
        if (!Array.isArray(this.children)){
            children.push(this.children);
        }
        const featurePointName = this.props.featurePointName;
        const featureChildren = this.props.loadedFeatures;
        console.log("FEATURE PROVIDER",{featurePointName,featureChildren})
        return children        
    }
    
}