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
        return (
            <div className={"headerMenu"} >
                <div onClick={this.toggleOpen} >RedditMenu</div>
                {this.state.open? this.menuOptions():null}
            </div>
        )
    }
    menuOptions(){
        const configMenu = <ConfigMenu subreddit={this.props.subreddit} changeSubReddit={this.props.changeSubReddit}/>
        return(
            <div> 
                <div onClick={()=>this.props.openModalWith(configMenu)}>redditConfig</div>
                <div>menuOption</div>
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

export default asFeaturePartial(featurePoints.HeaderMenu).asDecoration(decorators.menu)(connect(mapStateToProps, mapDispatchToProps)(HeaderMenu))