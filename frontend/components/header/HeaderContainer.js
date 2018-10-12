import { connect } from 'react-redux';
import React from 'react';
import Header from './Header'
import {reset} from "../../store/actions/mapActions/mapActions";
import {deleteUser} from "../../store/actions/sessionActions";

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reset:()=>dispatch(reset()),
        logout:()=>dispatch(deleteUser())
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        username:state.session.userName
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);