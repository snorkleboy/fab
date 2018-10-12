import { combineReducers } from 'redux';
import ui from './reducers/uiReducer'
import websocket from './reducers/websocketStateReducer'
import session from './reducers/sessionReducer'
import locationsREDUCED from './reducers/locationReducers/combiner'
export default combineReducers({
    locations:locationsREDUCED,
    ui,
    websocket,
    session
});