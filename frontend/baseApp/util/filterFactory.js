import {Filter} from './Filter';
import * as filterObjs from './staticFilters'

function makeIncludesFilter(type,name,data){
    const filterFun = (loc)=>data.data.includes(loc[data.key]);
    return new Filter(name, filterFun, type, data);
}
makeIncludesFilter.hydrateData = function (dataString){
    const data = dataString.match(/data:\[(.*)\]/)[1].split(',')
    const key = dataString.match(/key:(.*)}}/)[1]
    return {data,key}
}

function makeBoundsFilter(type,name,data){
    let filterFun;
    if(data.shape==='circle'){
        filterFun = (loc)=>checkCircleBounds(data.bounds,data.center,data.radius,locationToLatLng(loc))
    }else if(data.shape==='square'){
        filterFun = (loc)=>data.bounds.contains(locationToLatLng(loc));
    }else{
        filterFun = (loc)=>data.bounds.contains(locationToLatLng(loc));
    }
    const newFilter =  new Filter(name, filterFun, type, data);
    return newFilter
}
makeBoundsFilter.hydrateData = function(dataString){
    const data = {};
    data.shape = dataString.match(/shape:([^,]*)/)[1];
    if (data.shape ==='circle'){
        data.radius = parseInt(dataString.match(/radius:([^,]*)/)[1]);
        const center = dataString.match(/center:({[^}]*)/)[1];
        data.center = new google.maps.LatLng(center.match(/lat:([^,]*)/)[1],center.match(/lng:([^,]*)/)[1])
    }

    const bounds = dataString.match(/bounds:{([^}]*)/)[1];
    const latLngs = [
        new google.maps.LatLng(bounds.match(/south:([^,]*)/)[1],bounds.match(/west:([^,]*)/)[1]),
        new google.maps.LatLng(bounds.match(/north:([^,]*)/)[1],bounds.match(/east:([^,]*)/)[1])
    ]
    data.bounds = new google.maps.LatLngBounds(latLngs[0],latLngs[1])
    return data;
}
function checkCircleBounds(bounds,center,radius, latLng){
    return bounds.contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(center, latLng) <= radius;
}

function makePolyLineFilter(type,name,data){
    const polygon = new google.maps.Polygon({paths: data.latLngs})
    const filterFun = (location)=>google.maps.geometry.poly.containsLocation(locationToLatLng(location),polygon )
    return new Filter(name, filterFun, type, data);
}
makePolyLineFilter.hydrateData = function(dataString) {
    const data = {};
    let latLngs = dataString.match(/latLngs:\[(.*)\]/)[1];
    const lats = latLngs.match(/lat:([^,]*)/g)
    const lngs = latLngs.match(/lng:([^,]*)/g)
    latLngs=[];
    for(let i=0;i<lats.length; i++){
        lats[i] =parseFloat(lats[i].match(/:([^,]*)/)[1]);
        lngs[i] = parseFloat(lngs[i].match(/:([^,]*)/)[1]);
        latLngs[i] = new google.maps.LatLng(lats[i],lngs[i]);
    }
    data.latLngs = latLngs;
    data.shape = dataString.match(/shape:([^}]*)/)[1];

    return data
}


function makeStaticFilter(type,name,data){
    const series = filterObjs[data.series];
    const seriesNames = data.seriesNames;
    let filterFunction;

    if (!data.multiCount){
        const filterFunctions = seriesNames.map(name=>series[name].filterFunction)
        filterFunction = function(loc){
            return filterFunctions.some(filter=>filter(loc))
        }
    }else{
        filterFunction = function(loc){
            let filtered = false;
            seriesNames.forEach(name=>{
                const filter = series[name].filterFunction;
                this.multiFilteredCounter[name] = this.multiFilteredCounter[name]? this.multiFilteredCounter[name] : 0;
                if (filter(loc)){
                    this.multiFilteredCounter[name] = this.multiFilteredCounter[name]+1
                    filtered=true;
                }
            })
            return filtered
        }
    }

    return new Filter(name,filterFunction,type,data)
}
makeStaticFilter.hydrateData = function(dataString){
    const multiCount = dataString.match(/multiCount:([^'}']*)/)[1]
    const series = dataString.match(/series:([^,]*)/)[1]
    const seriesNamesString =  dataString.match(/seriesNames:\[(.*)\]/)[1]
    const seriesNames = seriesNamesString.split(',')

    return {series,seriesNames,multiCount};
}

function makeDateRangeFilter(type,name,data){
    const smaller = (date)=>data.smaller? date>new Date(data.smaller) : true;
    const bigger = (date)=>data.bigger? date<new Date(data.bigger) : true;
    const key = data.key;
    const filterFunction = (loc)=>{
        let workOrders = Object.values(loc.Workorders)
        return workOrders.some(wo=>{
            const value=workOrders[0][key]
            return smaller(new Date(value)) && bigger(new Date(value));
        })
    }
    return new Filter(name,filterFunction,type,data)
}
makeDateRangeFilter.hydrateData = function(dataString){
    let smaller = dataString.match(/smaller:([^,}]*)/)
    smaller = smaller? smaller[1] : undefined
    let bigger = dataString.match(/bigger:([^,}]*)/)
    bigger= bigger? bigger[1] : undefined
    const key = dataString.match(/key:([^,}]*)/)[1]
    return {smaller,bigger,key};
}

function locationToLatLng(location){
    return new google.maps.LatLng(location.Latitude, location.Longitude);
}
function keyer(key, SourceObject){
    const keys = key.split('.');
    let obj = SourceObject;
    keys.forEach(key=> obj=obj[key])
    return obj;
}


const typeMaker = {
    "includesFilter": makeIncludesFilter,
    "boundsFilter": makeBoundsFilter,
    "PolyLineFilter": makePolyLineFilter,
    "staticFilter": makeStaticFilter,
    "dateRangeFilter":makeDateRangeFilter
}
function make(type,name,data) {
    if (!Object.keys(typeMaker).includes(type)){
        throw `filterFactory doesn't  have type: (${type}) registered`
    }else {
        const fun = typeMaker[type];
        if (typeof data === "string"){
            data = fun.hydrateData(data);
        }
        return typeMaker[type](type,name,data)
    }
}
function hydrate(string){
    const type = string.match(/type:([^+]*)/)[1];
    const name = string.match(/name:([^+]*)/)[1];
    let data = string.match(/data:({.*})/)[1]
    return make(type,name,data);
}
export default {
    make,
    hydrate
};

