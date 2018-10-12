import { connect } from 'react-redux';
import React from 'react';
import infoPanelController from './infoPanelController'
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
        locations:state.locations.locations,
        infoPanel:state.ui.googleInfoPanel,
        clickSelected:state.ui.clickSelected
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(infoPanelController);