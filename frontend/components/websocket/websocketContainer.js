import { connect } from 'react-redux';
import React from 'react';
import Websocket from './websocket';
import {setMessage,setDevMessage} from '../../store/actions/uiActions/uiActions'
import {
    receiveLocations,
} from '../../store/actions/mapActions/mapActions'
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        setMessage:(msg) =>dispatch(setMessage(msg)),
        setDevMessage:(msg)=>setDevMessage(dispatch,msg)
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        toSend:state.websocket.toSend,
        companyId:state.session.companyId,
        numberOfLocations: Object.values(state.locations.locations).length
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Websocket);