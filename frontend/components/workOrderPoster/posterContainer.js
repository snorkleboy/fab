import { connect } from 'react-redux';
import React from 'react';
import Poster from './poster'
import * as APIcalls from '../../util/apiCalls'
import {setMessage} from "../../store/actions/uiActions/uiActions";
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        post:(workOrders)=>APIcalls.postWorkOrders(workOrders),
        setMessage:(msg) =>dispatch(setMessage(msg))
    }
}

export const mapStateToProps = (state, ownProps) => {
    let locations;
    if (ownProps.locations){
        locations= ownProps.locations
    }else if (state.ui.clickSelected){
        locations= state.ui.clickSelected
    }else{
        locations= state.locations.selected
    }

    return {
        locations
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Poster);