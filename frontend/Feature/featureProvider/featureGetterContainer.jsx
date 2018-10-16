import { connect } from 'react-redux';
import React from 'react';
import featureGetter from "./featureGetter"
import {receiveFeature} from "baseRedux/actions/featureActions/featureActions"
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadFeatures:(features)=>dispatch(receiveFeature(features))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        featuresToLoad:state.features.featuresToLoad
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(featureGetter);