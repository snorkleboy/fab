import React from 'react';
import { connect } from 'react-redux';
import {asFeaturePartial,featurePoints} from "Feature";
import decorators from "../decorators.json"
import style from "./headerMenu.scss"
import ConfigMenu from "./configMenu"
import {setModalComponent} from "baseRedux/actions/uiActions/uiActions"

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false
        }
        this.toggleOpen = this.toggleOpen.bind(this);
    }
    toggleOpen(e) {
        this.setState({open:!this.state.open})
    }
    render() {
        console.log("HEADER MENU");
        return (
            <div className={"headerMenu"} >
                <div onClick={this.toggleOpen} >RedditMenu</div>
                {this.state.open? this.menuOptions():null}
            </div>
        )
    }
    menuOptions(){
        const MenuOptions = this.props.menuOptions || [];
        return(
            <div>
                <div>menuOption</div>
                {Object.keys(MenuOptions).map(optionName=> (
                    <div onClick={() => this.props.openModalWith(MenuOptions[optionName])}>{optionName}</div>
                ))}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openModalWith:(component)=>dispatch(setModalComponent(component)),
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const menuDecorator = 
{
    name:decorators.config,
    props:{
        menuOptions:{
            redditConfig:<ConfigMenu/>
        }
    
    }
}
    

export default asFeaturePartial(featurePoints.HeaderMenu,"",[menuDecorator])
    .asDecoration(decorators.menu)(connect(mapStateToProps, mapDispatchToProps)(HeaderMenu))