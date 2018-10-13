import { connect } from 'react-redux';
import React from 'react';
import LoginPage from './LoginPage'
import * as sessionActions from 'baseRedux/actions/sessionActions'
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postUser:(user)=>dispatch(sessionActions.postUser(user))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);