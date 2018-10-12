import { connect } from 'react-redux';
import React from 'react';
import messageDispalyer from './messageDisplayer';
import {setTempMessage} from '../../store/actions/uiActions/uiActions'

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        messageObj:ownProps.message || state.ui.message
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messageDispalyer);