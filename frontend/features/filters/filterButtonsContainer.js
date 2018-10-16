import { connect } from 'react-redux';
import {asFeaturePartial,featurePoints} from "Feature"
import decorators from './schemas/decorators';
import React from 'react';
import {
    unsetLocationFilter,
    setLocationFilter,
    updateLocationFilter,
    
} from 'baseRedux/actions/mapActions/mapActions'
// import schema from './filterSchema';
import FilterButtons from './filterButtons.jsx'
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setFilter: (filterObj)=> dispatch(updateLocationFilter(filterObj)),
        unsetFilter: (filterObj)=> dispatch(unsetLocationFilter(filterObj)),
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        selectObjs: state.locations.selectObjs,
        locationArr:ownProps.locations || Object.values(state.locations.bounded),
        // schema
    }

}
export default asFeaturePartial(featurePoints.tabberView, "Filters", decorators).asDecoration("randomDec")(connect(mapStateToProps, mapDispatchToProps)(FilterButtons))