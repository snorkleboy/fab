import React, { Component } from 'react'
import style from './CollapsibleFilterLabel.scss'
export default class CollapsibleFilterLabel extends Component {
    constructor(props){
        super(props);
        this.state = { open: true}
    }
    handleOpenToggle(e){
        this.setState({open:!this.state.open})
    }

    closeButton(){
        const direction = this.state.open? "down" : "right";
        return(
            <div onClick={this.handleOpenToggle.bind(this)} >
                <i className={`fas fa-caret-${direction}`} ></i>
            </div>
        )
    }
    render() {
        const open = this.state.open
        const label = this.props.label;
        let children = [];
        if (this.props.children){
            if (Array.isArray(this.props.children)){
                children = this.props.children
            }else{
                if (this.props.children){
                    children.push(this.props.children);
                }
            }
        }
        return (
            <section className={"collapsible"}>
                <div className={"flex-row collapsible-label"}>
                    {this.closeButton()}
                    <h1>{label}</h1>
                </div>
                <span className={"collapsible-content"}>
                    {open ?
                        children
                    :
                        null
                    } 
                </span>

            </section>
            
            
        )
    }
}
