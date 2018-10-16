import { connect } from 'react-redux';
import {asFeaturePartial,featurePoints} from "Feature"
import React from 'react';
import List from './list';
import * as UIaction from 'baseRedux/actions/uiActions/uiActions'

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
        displayName:`LISTVIEW-[${state.locations.selected.length}]`,
    }
}

export default asFeaturePartial(featurePoints.tabberView)
connect(mapStateToProps, mapDispatchToProps)(List);