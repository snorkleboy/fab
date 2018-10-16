import {featureActionTypes} from "../../actions/featureActions/featureActions"
import {sessionActionTypes} from "../../actions/sessionActions"
const actionTypes = {...featureActionTypes,...sessionActionTypes}; 
const _featureReducer = ()=>({
    featuresToLoad:[],
    loadedFeatures:{}
});

function featureReducer (state = _featureReducer(), action){
    Object.freeze(state);
    let newState = {};
    switch (action.type) {
        case actionTypes.receiveFeaturePackages:
            newState.loadedFeatures = action.payload.features
            newState.featuresToLoad = null;
            return newState;
        case actionTypes.receiveUser:
            newState.featuresToLoad = action.payload.features
            return newState;
        default:
            return state
    }
};
featureReducer.defaultState = _featureReducer
export default featureReducer