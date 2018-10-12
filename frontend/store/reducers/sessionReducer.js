
import * as sessionActions from '../actions/sessionActions'
import {actionTypes} from '../actions/sessionActions'
const _session = ()=>({
    loggedIn:false,
    userName:null
});

function sessionReducer (state = _session(), action){
    Object.freeze(state);
    let newState = {};
    switch (action.type) {
        case actionTypes['receiveUser']:
            newState.userName = action.payload.subscriber;
            newState.loggedIn = action.payload.role
            return newState;
        case actionTypes.logout:
            newState.userName = null;
            newState.loggedIn = false;
            return newState;
        default:
            return state
    }
};
sessionReducer.defaultState = _session
export default sessionReducer