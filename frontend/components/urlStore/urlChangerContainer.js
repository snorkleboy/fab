import { connect } from 'react-redux';
import React from 'react';
import UrlChanger from "./urlChanger";

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        activeFilters: state.locations.selectObjs,
        latlng: state.ui.latlng
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlChanger);