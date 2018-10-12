export const statusList = [
    "OPEN",
    "IN_PROGRESS",
    "COMPLETED",
    // "ETA_past",
    // "unscheduled",
    // "ETA_modified",
    // "first_pass",
    // "scheduled",
    // "in_progress",
    // "completed",
    "no_work_orders"
];
const workOrdersStatus = {};
statusList.forEach((status,i) =>{
    workOrdersStatus[status] = {value:i+1,icon:"./imgs/markerIcons/"+status+".svg",status}
})
export const workOrdersStatusMap = workOrdersStatus;


export function sortWorkOrders(wos,values){
    const workOrders = wos.slice();
    const valuesObj = Object.assign({},workOrdersStatusMap,values)
    return workOrders.sort((a,b)=>(valuesObj[a.Status.Primary].value-valuesObj[b.Status.Primary].value))
}

export const makeWorkOrderStatusValues = (selectObjs)=>{
    const obj = {};
    getWorkOrderStatusArr(selectObjs).forEach(status =>obj[status]={value:0});
    return obj;
}
export const getWorkOrderStatusArr = (selectObjs)=> {
    if (!selectObjs){
        return [];
    }
    const woFilter = selectObjs.filter((filter) => filter.type === "workOrderFilter")[0];
    return woFilter ? woFilter.data.seriesNames : [];
}


export function addWorkOrderToLocation(location,workOrder){
    const workOrders = location.Workorders;
    if (!location.workOrderCount){
        location.workOrderCount = {};
    }
    const count = location.workOrderCount;
   
    
    const previosWorkOrder = workOrders[workOrder.Id];
    if (previosWorkOrder){
        count[previosWorkOrder.Status.Primary] = count[previosWorkOrder.Status.Primary] -1;
    }else{
        count.sum = count.sum + 1;
    }
    workOrders[workOrder.Id] = workOrder;

    count[workOrder.Status.Primary] = count[workOrder.Status.Primary] + 1;
   

}
export function countWorkOrders(location) {
    const workOrderMap = location.Workorders;
    const count = {};
    statusList.forEach(status=>count[status]=0)
    let sum=0;
    Object.values(workOrderMap).forEach(wo=>{
        const status = wo.Status.Primary;
        if (!count[status] && count[status] !== 0){
            console.warn({err:"unknown workorder status",wo,status})
        }
        count[status] = count[status] + 1;
        sum++;
    })
    count.sum = sum;
    return count;
}


export function makeWorkOrderIconFromLocation(location,statusArr){
    return makeWorkOrderIcon(getHighestWorkOrderStatus(location,statusArr));
}
export function getHighestWorkOrderStatus(location,statusArr=[]) {
    const count = location.workOrderCount;
    if (count.sum === 0 ){
        return null;
    }
    
    statusArr.sort((a,b)=>workOrdersStatusMap[a].value - workOrdersStatusMap[b].value)
    for (let i = 0 ; i<statusArr.length; i++){
        const countNum = count[statusArr[i]]
        if (countNum && countNum>0){
            return statusArr[i];
        } 
    }
    for (let i=0;i<statusList.length;i++){
        if (count[statusList[i]] && count[statusList[i]] > 0 ){
            return statusList[i]
        }
    } 
    return null; 
    
}

function getHighestStatusFromArr(arr,filters=[]){
    return sortWorkOrders(arr,makeWorkOrderStatusValues(filters))[0].Status.Primary;
}

export function makeWorkOrderIcon(thing){
    let status;
    if (!thing){
        return workOrdersStatusMap[statusList[statusList.length-1]];
    } else if (Array.isArray(thing)) {
        if (thing.length===0){
            return workOrdersStatusMap[statusList[statusList.length-1]];
        }
        status = getHighestStatusFromArr(thing);
    }else if (typeof thing === 'object'){
        status = thing.Status.Primary;
    } else{
        status = thing;
    }
    
    const obj = workOrdersStatusMap[status];
    if (!obj){
        console.warn({"ERR":"no icon for input",obj,status,thing,workOrdersStatusMap})
    } 
    return obj;

}
