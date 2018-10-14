import { connect } from 'react-redux';
import React from 'react';
import {
    getLocations,
    setLocationFilter,
    clickSelect,
    clearClickSelect,
    updateLocationFilter,
    resetFilters
} from '../../store/actions/mapActions/mapActions'
import TabberView from './tabberView'
import AsyncLoader from "frontend/asyncLoader"
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getLocations: (params)=> dispatch(getLocations(params)),
        setLocationFilter: (filterFunction)=> dispatch(setLocationFilter(filterFunction)),
        updateLocationsFilter:(filterFunction)=> dispatch(updateLocationFilter(filterFunction)),
        clickSelect:(location)=>dispatch(clickSelect(location)),
        clearClickSelect:()=>dispatch(clearClickSelect()),
        resetFilters:()=>dispatch(resetFilters())
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        locations: state.locations.selected,
        clickSelected: state.ui.clickSelected,
        SubscriberId:state.session.SubscriberId,
        activeFilters:state.locations.selectObjs,
        featureChildren:AsyncLoader.getFeature("tabberView")
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabberView);