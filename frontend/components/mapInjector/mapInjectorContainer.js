import { connect } from 'react-redux';
import React from 'react';
import Injector from './mapInjector';
import {
    getLocations,
    setLocationFilter,
    clickSelect,
    clearClickSelect,
    updateLocationFilter
} from '../../store/actions/mapActions/mapActions'
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        controlLayer:state.ui.googleControlUi,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Injector);