import {actionTypes} from '../../actions/mapActions/mapActions'
import {addWorkOrderToLocation} from "../../../../util/workOrder";
import * as lodash from 'Lodash';
const _locations = ()=>({
    locations:{},
});

function locationReducer (state = _locations(), action) {
    Object.freeze(state);
    let newState = {};
    switch (action.type) {
        case actionTypes.receiveLocations:
            newState = lodash.merge({}, state, action.payload);
            return newState
        case actionTypes.receiveWeatherConditions:
            const weatherConditions = action.payload;
            newState = lodash.merge({}, state)
            newState.locations = insertWeatherConditions(weatherConditions, newState.locations);
            return newState
        case actionTypes.receiveWorkOrders:
            const workOrders = action.payload;
            newState = lodash.merge({}, state);
            newState.locations = insertWorkOrders(workOrders, newState.locations);
            return newState;
        case actionTypes.reset:
            newState=locationReducer.defaultState()
        default:
            return state;

    }
}

function insertWorkOrders(WOs, locations){
    WOs.forEach(wo=>{
        const locationId = wo.lid
        const location = locations[locationId];
        if (location){
            addWorkOrderToLocation(location, wo);
        }
    })
    return locations
}
function insertWeatherConditions(WCs, locations){
    WCs.forEach(wc=>{
        const locationId = wc.lid
        const location = locations[locationId]
        if (location){
            locations[locationId].weatherCondition = wc
        }
    })
    return locations
}

locationReducer.defaultState=_locations
export default locationReducer