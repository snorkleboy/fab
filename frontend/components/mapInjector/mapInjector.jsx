import React from "react";
import ReactDom from 'react-dom'

export default class Injector extends React.Component {
    constructor(props){
        super(props);
        this.createdDiv=false;
        this.divLayer = null;
        this.div = null;
        // this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(deleteShapesDiv)
    }
    componentDidMount(){

        if(this.props.controlLayer && !this.createdDiv){
            this.createDiv(this.props);
        }
    }
    componentWillUnmount(){
        // this.removeDiv()
    }
    shouldComponentUpdate(newProps,newState){
        if(!this.createdDiv && newProps.controlLayer){
            this.createDiv(newProps);
        }
        return true;
    }
    createDiv({controlLayer,position}){
        this.div = document.createElement("div");
        this.divLayer = controlLayer.controls[controlLayer.controlPositions[position]];
        if (!this.divLayer){
            throw "invalid google ui position, valid positions are: "+ Object.keys(controlLayer.controlPositions)
        }
        this.divLayer.push(this.div);
        this.createdDiv=true;
    }
    removeDiv(){
        const indx = this.divLayer.indexOf(this.div);
        this.divLayer.splice(indx,1);
    }
    render(){
        if (this.div){
            return ReactDom.createPortal(
                this.props.children,
                this.div
            );
        }else{
            return null;
        }

    }
}