import { connect } from 'react-redux';
import React from 'react';
import featureProvider from "./featureProvider"
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        loadedFeatures:state.features.loadedFeatures
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(featureProvider);