import {statusList, workOrdersStatusMap} from "./workOrder";

export function makeWeatherFilters(){
    const baseRanges = [
        [0,">"],
        [0,"<"],
        [0,.5],
        [.5,1],
        [1,1.5],
        [1.5,"<"]
    ]
    for(let i = 2; i<100;i++){
        baseRanges.push([i,"<"])
    }
    const staticIceFilters = {};
    const staticSnowFilters = {};
    const windFilters = {};
    const rainFilters = {};
    const snowAndIceFilters = {}

    const wcSeries = [
        [staticIceFilters,'iceInches'],
        [staticSnowFilters,'snowInches'],
        [windFilters,'windInch'],
        [rainFilters,'rainInch']
    ]
    const unit = "inches"
    makeWeatherFiltersFromRanges(baseRanges,wcSeries,unit);
    
    Object.keys(staticIceFilters).forEach((range)=>{
        snowAndIceFilters[range] = {filterFunction:(loc)=>checkSnowAndIceFilters(loc,range)}
    })
    function checkSnowAndIceFilters(location,rangeName){
        return staticIceFilters[rangeName].filterFunction(location) && staticSnowFilters[rangeName].filterFunction(location)
    }
    return {staticIceFilters,
        staticSnowFilters,
        windFilters,
        rainFilters,
        snowAndIceFilters}
 
}
export function makeWorkOrderFilters(){
    const staticWorkOrderFilters = {};
    Object.keys(workOrdersStatusMap).forEach(workOrderStatus=>{
        staticWorkOrderFilters[workOrderStatus] = {iconUrl:workOrdersStatusMap[workOrderStatus].icon,filterFunction:makeStatusFilter(workOrderStatus)}
    })
    return {staticWorkOrderFilters}
}


function makeWeatherFiltersFromRanges(baseRanges,wcSeries,unit){
    const ranges = {};
    baseRanges.forEach(range=>{
        const first = range[0];
        const second = range[1]
        if (typeof second === 'string'){
            if (first === 0 && second === ">"){
                ranges["none"] = range
            }else{
                const adj = second === ">" ? "less than" : "more than";
                ranges[`${adj} ${first} ${unit}`] = range
            }
        }else{
            ranges[`between ${first} and ${second} ${unit}`] = range;
        }
    })

    Object.keys(ranges).forEach(rangeName=>{
        wcSeries.forEach(seriesObj=>{
            const series = seriesObj[0];
            const keyName = seriesObj[1];
            const range = ranges[rangeName];
            let filterFunction;
            if(typeof range[1] === "string") {
                if (range[1] === ">"){
                    filterFunction = (loc) => loc.weatherCondition[keyName] <= range[0]
                }else {
                    filterFunction = (loc) => loc.weatherCondition[keyName] > range[0]
                }
            }else{
                filterFunction = (loc) => loc.weatherCondition[keyName] >= range[0] && loc.weatherCondition[keyName] < range[1]
            }
            series[rangeName] = {filterFunction}
        })
    })

}




function makeStatusFilter(status){
    return status!==statusList[statusList.length-1] ?
            (loc)=> {
                const workOrders = getWorkOrder(loc);
                return (workOrders && workOrders.length > 0)? workOrders.some(wo=> wo.Status.Primary === status) : false;
            }
        :
            (loc)=>Object.keys(loc.Workorders).length===0
}

const getWorkOrder = (loc)=>{
    if (loc.Workorders){
        if(Array.isArray(loc.Workorders)){
            return loc.Workorders
        }else if (typeof loc.Workorders === 'object'){
            return Object.values(loc.Workorders)
        }
    } else {
        return loc.Workorder
    }
}
