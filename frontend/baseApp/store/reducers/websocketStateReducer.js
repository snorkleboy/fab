
const websocketStateReducer_ = ()=>({
    toSend:null
});
function websocketStateReducer (state = websocketStateReducer_(), action){
    Object.freeze(state);
    let newState = {};
    switch (action.type) {
        case "sendWebsocketMessage":
        default:
            return state
    }
};
websocketStateReducer.defaultState = websocketStateReducer_
export default websocketStateReducer