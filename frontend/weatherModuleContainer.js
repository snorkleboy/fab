import { connect } from 'react-redux';
import React from 'react';
import WeatherModule from './weatherModule'
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn:state.session.loggedIn
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherModule);