import { connect } from 'react-redux';
import React from 'react';
import List from './list';
import * as UIaction from '../../store/actions/uiActions/uiActions'
import {reset} from "../../store/actions/mapActions/mapActions";

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickSelect:(location)=>dispatch(UIaction.clickSelect(location)),
        unClickSelect:()=>dispatch(UIaction.clearClickSelect()),
        setModalComponent: (component)=>dispatch(UIaction.setModalComponent(component))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        clickSelected: state.ui ? state.ui.clickSelected : null,
        locations: ownProps.locations || state.locations.selected,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);