import filterReducer from './filtersReducer'
import locationReducer from './locationReceiverReducer'
import selectedReducer from './selectedReducer'
import {actionTypes} from "../../actions/mapActions/mapActions";

function combinedLocationsReducer (state, action) {
    let newState;
    if(!state) {
        newState = combinedLocationsReducer.defaultState()
    }else if (action.type === actionTypes.reset){
        newState = Object.assign({},state,locationReducer.defaultState());
        newState = filterReducer(newState,action);
        newState = selectedReducer(newState,action);
    }else if (state){
        newState = locationReducer(state,action);
        newState = filterReducer(newState,action);
        newState = selectedReducer(newState,action);
    }
    return newState
}
combinedLocationsReducer.defaultState = ()=>Object.assign(
    {},
    locationReducer.defaultState(),
    filterReducer.defaultState(),
    selectedReducer.defaultState(),
)
//for testing
combinedLocationsReducer.prototype = Object.assign({},combinedLocationsReducer.prototype);
combinedLocationsReducer.prototype.locationReducer = locationReducer;
combinedLocationsReducer.prototype.filterReducer = filterReducer;
combinedLocationsReducer.prototype.selectedReducer = selectedReducer;
export default combinedLocationsReducer;