import { connect } from 'react-redux';
import React from 'react';
import Modal from './modal'
import * as UIActions from '../../../store/actions/uiActions/uiActions'
export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        close:()=>dispatch(UIActions.setModalComponent(null))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        modalComponent:state.ui.modalComponent
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);