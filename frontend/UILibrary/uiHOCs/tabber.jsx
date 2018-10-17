import React, { Component } from 'react'
import { Input, Menu, Segment,Button, Rail } from 'semantic-ui-react'

export default class Tabber extends Component {
    constructor(props){
        super(props);
        // const activeItem = Array.isArray(this.props.children)? this.props.children[0].props.name : this.props.children.name
        this.state = { open:true, }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e, { name }){
        this.setState({ activeItem: name })
    }
    handleOpenToggle(e){
        this.setState({open:!this.state.open})
    }
    makeItem({name,localActive,displayName,active}){
        return (
        <Menu.Item
            id={name+"tab"}
            content={displayName? displayName : name}
            name={name}
            active={localActive}
            onClick={this.handleItemClick}
            className={active? "activeFilter" : ""}
        />)
    }
    closeButton(){
        const direction = this.state.open? "left" : "right";
        return(
            <div className={`left100 top56 height-60 width-20 posAbs greyBackground slideIcon`} onClick={this.handleOpenToggle.bind(this)} >
                <i className={`fas fa-chevron-${direction} `} ></i>
            </div>
        )
    }
    render() {
        const { activeItem } = this.state
        const header = this.props.header;
        let children = [];
        if (Array.isArray(this.props.children)){
            children = this.props.children.filter(c=>c);
        }else{
            if (this.props.children){
                children.push(this.props.children);
            }else{
                children = [];
            }
        }
        return (
            <div className={`${!this.props.noClose? "posAbs":null} ${this.state.open? "left0px" : "left-350px"} ${this.props.css}`}>
                {header}
                <Menu attached='top' tabular>
                    { children.map(child=> this.makeItem( Object.assign({},child.props,{localActive:child.props.name===activeItem})) ) }
                </Menu>
                {!this.props.noClose?  this.closeButton() : null}
                <Segment attached='bottom' >
                    {children.find(child=>child.props.name===activeItem)}
                </Segment>
            </div>
        )
    }
}
