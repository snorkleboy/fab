import { connect } from 'react-redux';
import React from 'react';
import ListItem from './listItem';
import * as UIaction from '../../store/actions/uiActions/uiActions'

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setModalComponent: (component)=>dispatch(UIaction.setModalComponent(component))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        location:ownProps.location,
        filters:state.locations.selectObjs
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);