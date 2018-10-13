import {actionTypes as  mapActions}from '../actions/mapActions/mapActions'
import {actionTypes as uiActions} from '../actions/uiActions/uiActions'
const actionTypes = Object.assign({},mapActions,uiActions)
import Message from 'UILibrary/messageDisplayer/Message'

const _uiDefault = ()=>({
    clickSelected:null,
    latlng:{latlng:typeof google !== "undefined"? new google.maps.LatLng(38.5,-97.2): {lat:38.5,lng:-97.2}, zoom:5},
    googleControlUi:null,
    googleInfoPanel:null,
    modalComponent:null,
    message:null
});

function uiReducer (state = _uiDefault(), action){
    Object.freeze(state);
    let newState = {};
    let message;
    switch (action.type) {
        case actionTypes.clickSelect:
            return Object.assign({},state, {clickSelected:action.payload})
        case actionTypes.clearClickSelect:
            return Object.assign({},state, {clickSelected:null})
        
        case actionTypes.setLatLng:
            if (action.payload){
                const latlng = action.payload;
                newState.latlng = latlng;
                return Object.assign ({},state,newState);
            }else{
                return state
            }
        case actionTypes.setGoogleUiControlObj:
            return Object.assign ({},state,{googleControlUi:action.payload});
        case actionTypes.setGoogleInfoPanelObj:
            return Object.assign ({},state,{googleInfoPanel:action.payload});
        case actionTypes.setModalComponent:
            return Object.assign({},state,{modalComponent:action.payload})
        
        case actionTypes.setMessage:
            return Object.assign({},state,{message:action.payload})
        case actionTypes.receiveWeatherConditions:
            message = new Message("Weather Conditions Updated",Message.MessageTypes.systemMessage,3);
            return Object.assign({},state,{message})
        case actionTypes.receiveWorkOrders:
            message = new Message("Work Orders Updated",Message.MessageTypes.systemMessage,3);
            return Object.assign({},state,{message})

        case actionTypes.reset:
            return Object.assign({},state,{modalComponent:null,clickSelected:null})
        
        default:
            return state;
    }
};
uiReducer.defaultState = _uiDefault
export default uiReducer