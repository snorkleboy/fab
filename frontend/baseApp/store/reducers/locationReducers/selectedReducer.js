import {actionTypes} from '../../actions/mapActions/mapActions'

const _selected = ()=>({
    selected: [],
    bounded:[]
});
function selectedReducer (state, action) {
    Object.freeze(state);
    if (!state || !state.selectObjs){
        throw new TypeError("default state of locations.SelectObjs should be set before the selectedReducer is called");
    }
    let newState = Object.assign({},_selected(),state);
    let selected,selectObjs,bounded;
    switch (action.type) {
        case actionTypes.receiveLocations:
        case actionTypes.receiveWeatherConditions:
        case actionTypes.receiveWorkOrders:
        case actionTypes.setFilter:
        case actionTypes.updateFilter:
        case actionTypes.unsetFilter:
        case actionTypes.reset:
        case actionTypes.resetFilters:
            ({selected,selectObjs,bounded} = select(newState.locations,newState.selectObjs))
            newState.selected = selected;
            newState.selectObjs = selectObjs;
            newState.bounded = bounded;

            return Object.assign({},newState);
        default:
            return newState;
    }
}
function select(locations, filters ){
    return subSelect(Object.values(locations), filters);
}
function subSelect(locations, filters){
    const selectObjs = filters.slice();
    selectObjs.forEach(filter=>filter.reset());

    const shapeFilter = selectObjs.find(filter=> filter.type === "shapeFilter");
    const defaultFilter = selectObjs[0];
    const boundFilter = shapeFilter || defaultFilter;
    let boundedObj = [];
    if (boundFilter){
        boundedObj = locations.filter(loc=> boundFilter.filterFun(loc))
    }
    const bounded =Object.values(boundedObj)
    
    const selected = bounded.filter((location)=>{
        let thisBool = true;
        for (let i=1; i<selectObjs.length; i++){
            const filter = filters[i];
            // const defaultFilter = filters[0].filterFun;
            if (!filter.filter(location)){
                thisBool = false;
            }
        }
        return thisBool;
    })

    return {selected,selectObjs,bounded};
}
selectedReducer.defaultState=_selected
export default selectedReducer