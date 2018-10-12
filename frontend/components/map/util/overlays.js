import CustomTiler from "./customTiler";
const bounds = {
    south: 24.9493,
    west: -125.0011,
    north: 49.5904,
    east: -66.9326
}
const tileBounds = [
    {x:0,y:1,z:2},
    {x:1,y:0,z:2},
]
const overlays = {
    snow:new CustomTiler({
        tileBounds,
        tileSize:256,
        icon:"./imgs/snowflake.svg",
        options:{opacity:.8},
        zoomLevelTriggerValues:[2,3,4],
        getTileUrl:(coord, zoom,i)=>`./WeatherImage/GetImage?coordX=${coord.x}&coordY=${coord.y}&zoomLevel=${zoom}&overLay=snow&hrLevel=${i}` 
    }),
    ice:new CustomTiler({
        tileBounds,
        tileSize:256,
        icon:"./imgs/ice.svg",
        options:{opacity:.8},
        zoomLevelTriggerValues:[2,3,4],
        getTileUrl:(coord, zoom,i)=>`./WeatherImage/GetImage?coordX=${coord.x}&coordY=${coord.y}&zoomLevel=${zoom}&overLay=ice&hrLevel=${i}` 
    }),
    temperatures: new CustomTiler({
        tileBounds,
        tileSize:256,
        icon:"./imgs/thermometer.svg",
        options:{opacity:.8},
        zoomLevelTriggerValues:[2,4],
        getTileUrl:(coord, zoom,i) =>`./WeatherImage/GetImage?coordX=${coord.x}&coordY=${coord.y}&zoomLevel=${zoom}&overLay=temp&hrLevel=${i}` 
        
    })
}

Object.values(overlays).forEach(overlay => {
    overlay.turnedOn = false
})
export const OVERLAYS = overlays;

function forcastenate(url,i){
    return url + "/" + iToForecast(i) + ".png";
}
export function iToForecast(i){
    i = parseInt(i);
    switch(i){
        case 0:{
            return "current";
        }
        case 1:{
        }
        case 2:{
            return `+${6*i}hr`
        }
        case 3:{
            return `+24hr`;
        }
        case 4:{
            return `+48hr`
        }
    }
}
