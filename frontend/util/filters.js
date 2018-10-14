
import filterFactory from './filterFactory';
import Filter from "util/Filter";
export const viewport =(map)=>{
    const bounds = map.getBounds();
    return filterFactory.make(
        "boundsFilter",
        "viewportFilter",
        {bounds}
        );
}
const ne = typeof google !== "undefined"? new google.maps.LatLng(24.9493,-125.0011):{lat:24.9493,lng:-125.0011}
const sw = typeof google !== "undefined"? new google.maps.LatLng(49.5904,-66.9326):{lat:49.5904,lng:-66.9326}
const bounds = typeof google !== "undefined"? new google.maps.LatLngBounds(sw,ne):{north:24.9493,south:49.5904,west:-66.9326,east:-125.0011}
export const defaultViewPort = ()=>new Filter("test",()=>true,"otherName")
defaultViewPort.type = "viewportFilter";
export const shapeFilter = (shape)=> {
    let data;
    let filterType
    if (!shape){
        return {type:"shapeFilter"}
    }else if(!shape.latLngs){
        filterType="boundsFilter"
        const bounds = shape.getBounds();
        if (shape.center){
            const center = shape.getCenter();
            const radius = shape.getRadius();
            data ={shape:"circle",center, radius, bounds}
        }else{
            data ={shape:"square",bounds}
        }
    }else{
        filterType="PolyLineFilter";
        data={latLngs:shape.getPath().getArray(), shape:"polyline"}
    }
    return filterFactory.make(
        filterType,
        "shapeFilter",
        data
    )
}
shapeFilter.type = "shapeFilter";

export function dateFilter(startDate, endDate, key ="ScheduledDate"){
    const data = {smaller:startDate? startDate.toString(): undefined, bigger:endDate? endDate.toString() : undefined, key}
    return filterFactory.make("dateRangeFilter", "dateFilter", data);
}
dateFilter.type="dateFilter";

export function staticFilter(filterName,series, seriesNames, multiCount){
    const data = {series, seriesNames,multiCount};
    return filterFactory.make("staticFilter",filterName,data)
}

export function precipitationFilter(type,rangeName,name){
    if (type === "snow"){
        return staticFilter(name,"staticSnowFilters",[rangeName],false)
    }else if ( type === "ice") {
        return staticFilter(name, "staticIceFilters", [rangeName], false);
    }else if(type === 'both') {
        return staticFilter(name,'snowAndIceFilters',[rangeName],false);
    }else{
        console.warn("unknown filter type \""+type+"\" in filters.js-precipitationFilter)")
    }

}
