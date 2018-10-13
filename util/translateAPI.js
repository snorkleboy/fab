import {actionTypes} from "../frontend/baseApp/store/actions/mapActions/mapActions";
import {countWorkOrders} from "./workOrder";

export function ensure(action) {
    switch (action.type){
        case actionTypes.receiveLocations:
            ensureLocationObject(action.payload.locations);
    } 
    return action;
}

export function ensureLocationObject(locationPayload){
    Object.keys(locationPayload).forEach(key=>ensureLocation(locationPayload[key]))
    return locationPayload
}
function ensureLocation(location){
    if (!location.weatherCondition){
        location.weatherCondition={};
    }
    if (!location.Workorders) {
        location.Workorders = {};
    }
    location.workOrderCount = countWorkOrders(location);
    location.Latitude = parseFloat(location.Latitude);
    location.Longitude = parseFloat(location.Longitude);
}

