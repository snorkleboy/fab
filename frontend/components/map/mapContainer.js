import { connect } from 'react-redux';
import React from 'react';
import Map from './map';
import * as UIactions from '../../store/actions/uiActions/uiActions';
import {
    getLocations,
    setLocationFilter,
    clickSelect,
    clearClickSelect,
    updateLocationFilter,
    unsetLocationFilter,
    setLatLng
} from '../../store/actions/mapActions/mapActions'
import {
    setGoogleUiControlObj,
    setGoogleInfoPanelObj
}from '../../store/actions/uiActions/uiActions'
import * as filters from '../../util/filters'
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateLocationsFilter:  (filterFunction)=> dispatch(updateLocationFilter(filterFunction)),
        unsetFilter:            (filterFunc)    => dispatch(unsetLocationFilter(filterFunc)),
        setLatLng:              (latLng)        => dispatch(setLatLng(latLng)),
        setUIController:        (obj)           => dispatch(setGoogleUiControlObj(obj)),
        setInfoPanel:           (obj)           => dispatch(setGoogleInfoPanelObj(obj)),
        unClickSelect:()=>dispatch(UIactions.clearClickSelect()),
        clickSelect:(location)=>dispatch(UIactions.clickSelect(location))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        locations: state.locations.selected,
        clickSelected: state.ui.clickSelected,
        center: state.ui.latlng,
        workOrderFilter:state.locations.selectObjs.filter(obj=>obj.type==="workOrderFilter")[0],
        shapeFilters: state.locations.selectObjs.filter(obj=>obj.type===filters.shapeFilter.type)[0]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);