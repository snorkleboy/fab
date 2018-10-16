import * as featureActions from "baseRedux/actions/featureActions/featureActions"
import * as sessionActions from "baseRedux/actions/sessionActions"

const actionTypes = {...featureActions.actionTypes,...sessionActions.actionTypes}; 
const _featureReducer = ()=>({
    featuresToLoad:[],
    featurePointToComponentMap:{}
});

function featureReducer (state = _featureReducer(), action){
    Object.freeze(state);
    let newState = Object.assign({},state);

    switch (action.type) {
        case actionTypes.receiveFeaturePointToComponentMap:
            const loadedFeatures = action.payload
            newState.featuresToLoad = null;
            newState.featurePointToComponentMap = action.payload;
            console.log({newState});
            return newState;
        case actionTypes.receiveUser:
            newState.featuresToLoad = action.payload.features
            console.log({newState,action})
            return newState;
        default:
            return state
    }
};


featureReducer.defaultState = _featureReducer
export default featureReducer