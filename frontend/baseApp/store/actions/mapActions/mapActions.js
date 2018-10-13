import * as apiCalls from '../../../../util/apiCalls'
import {ensure} from "../../../../util/translateAPI";

export const actionTypes = {
    receiveLocations : "RECEIVE_LOCATIONS",
    setFilter: "SET_FILTER",
    unsetFilter: "UNSET_FILTER",
    updateFilter: "UPDATE_FILTER",
    receiveWorkOrders:"RECEIVE_WORK_ORDERS",
    receiveWeatherConditions:"RECEIVE_WEATHER_CONDITIONS",
    viewPortFilter: "VIEWPORT_FILTER",
    setLatLng: "SET_LATLNG",
    reset:"RESET",
    resetFilters:"RESET_FILTERS",
};


export const setLocationFilter = (filterObj)=>({
    type:actionTypes.setFilter,
    payload: filterObj
})
export const unsetLocationFilter = (filterObj)=>({
    type:actionTypes.unsetFilter,
    payload: filterObj
})
export const updateLocationFilter = (filterObj)=>({
    type: actionTypes.updateFilter,
    payload:filterObj
})
export const setLatLng = (latlng)=>({
    type:actionTypes.setLatLng,
    payload:latlng
})


export const receiveLocations = (locations) => ensure({
        type: actionTypes.receiveLocations,
        payload:locations
    })

export const receiveWorkOrders = (WOs)=>ensure({
    type:actionTypes.receiveWorkOrders,
    payload:WOs
})

export const receiveWeatherConditions = (WCs)=>ensure({
    type:actionTypes.receiveWeatherConditions,
    payload: WCs
})
export const getLocations = (numberOfLocations,clientId) => dispatch => apiCalls.fetchLocations(numberOfLocations,clientId)
    .then((json) => dispatch(receiveLocations(json)));

export const resetFilters = ()=>({
    type:actionTypes.resetFilters
})


const resetReducers = ()=>({
    type:actionTypes.reset
})
export const reset = () => dispatch => apiCalls.fetchResetLocations()
    .then(json=>{dispatch(resetReducers()); return json})
    .then((json) => dispatch(receiveLocations(json)));


