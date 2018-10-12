import {actionTypes} from '../../actions/mapActions/mapActions'
import * as lodash from 'Lodash';
import {defaultViewPort} from "../../../util/filters";

const defaultFilter = defaultViewPort;
const _filters = ()=>({
    selectObjs: [defaultFilter()],
})

function filterReducer (state = _filters(), action) {
    Object.freeze(state);
    let newState = Object.assign({},_filters(),state);
    let selectObjs;
    switch (action.type) {
        case actionTypes.setFilter:
            selectObjs = newState.selectObjs.slice();
            selectObjs.push(action.payload);
            newState.selectObjs = selectObjs
            return Object.assign({},state,newState);

        case actionTypes.updateFilter:
            selectObjs = newState.selectObjs.slice();
            const oldFilter = selectObjs.find(filter=>filter.type === action.payload.type)
            if (!oldFilter){
                selectObjs.push(action.payload);
            }else{
                const filterIndex = selectObjs.indexOf(oldFilter);
                selectObjs[filterIndex] = action.payload;
            }
            newState.selectObjs=selectObjs;
            return Object.assign({},state,newState);

        case actionTypes.unsetFilter:
            const filterToUnset = action.payload;
            selectObjs = newState.selectObjs.slice();
            const filterToUnsetCurrent = selectObjs.find(filter=> filter.type ===filterToUnset.type);
            if (filterToUnsetCurrent) {
                const index = selectObjs.indexOf(filterToUnsetCurrent);
                selectObjs.splice(index, 1);
                return Object.assign({}, state, newState, {selectObjs});
            }else{
                return state
            }
        case actionTypes.resetFilters:
            selectObjs = newState.selectObjs.slice(0,1)
            newState.selectObjs = selectObjs;
            return newState;
        default:
            return newState;
    }
}

filterReducer.defaultState=_filters
export default filterReducer