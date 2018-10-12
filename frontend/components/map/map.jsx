import React from 'react';
import ReactDOM from 'react-dom'

import MarkerClusterer from './google/markerclusterer'
import {OVERLAYS} from './util/overlays'
import {viewport,shapeFilter} from '../../util/filters'
import ListItem from '../../components/list/listItemContainer'
import _ from "lodash"
import {workOrdersStatusMap,makeWorkOrderIconFromLocation,statusList} from "../../../util/workOrder";
require("./google/customGoogleMethods.js");

const bounds = {
    south: 24.9493,
    west: -125.0011,
    north: 49.5904,
    east: -66.9326
}
const tileBounds = [
    {x:1,y:3,z:3},
    {x:2,y:2,z:3},
]
const  polylineOptions = {
    fillColor: '#ffff00',
    fillOpacity: .1,
    strokeWeight: 2,
    clickable: false,
    editable: false,
    zIndex: 1
}
const circleOptions= {
    fillColor: '#ffff00',
    fillOpacity: .1,
    strokeWeight: 2,
    clickable: false,
    editable: false,
    zIndex: 1
}
const rectangleOptions = {
    fillColor: '#ffff00',
    fillOpacity: .1,
    strokeWeight: 2,
    clickable: false,
    editable: false,
    zIndex: 1
}
const markerIconStyle = {
    scaledSize: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
}
const clusterStyle = {width:35,height:35}
const clusterStyles = [
    // {name:"ETA_past",url:"./imgs/clusterIcons/ETA_past.svg", textColor: 'white',...clusterStyle},
    // {name:"ETA_modified",url:"./imgs/clusterIcons/ETA_modified.svg", textColor: 'white',...clusterStyle},
    // {name:"unscheduled",url:"./imgs/clusterIcons/unscheduled.svg", textColor: 'white',...clusterStyle},
    // {name:"first_pass",url:"./imgs/clusterIcons/first_pass.svg", textColor: 'white',...clusterStyle},
    // {name:"scheduled",url:"./imgs/clusterIcons/scheduled.svg", textColor: 'white',...clusterStyle},
    // {name:"in_progress",url:"./imgs/clusterIcons/in_progress.svg", textColor: '#565656',...clusterStyle},
    // {name:"completed",url:"./imgs/clusterIcons/completed.svg", textColor: 'white',...clusterStyle},
    {name:"no_work_orders",url:"./imgs/clusterIcons/no_work_orders.svg", textColor: '#565656',...clusterStyle},
    {name:"OPEN",url:"./imgs/clusterIcons/OPEN.svg", textColor: 'white',...clusterStyle},
    {name:"COMPLETED",url:"./imgs/clusterIcons/COMPLETED.svg", textColor: 'white',...clusterStyle},
    {name:"IN_PROGRESS",url:"./imgs/clusterIcons/IN_PROGRESS.svg", textColor: 'white',...clusterStyle},
]

const clusterOptions = {
    zoomOnClick: false,
    maxZoom: 9,
    minimumClusterSize: 10,
    gridSize:50,
    styles:clusterStyles
}
const clusterStatusToIndexMap = {
    // "ETA_past":0,
    // "ETA_modified":1,
    // "unscheduled":2,
    // "first_pass":3,
    // "scheduled":4,
    // "in_progress":5,
    // "completed":6,
    "no_work_orders":0,
    "OPEN":1,
    "COMPLETED":2,
    "IN_PROGRESS":3
}
class Map extends React.Component {
    constructor(props){
        super(props)
        this.makeClusterer = this.makeClusterer.bind(this)
        this.makeMarkers = this.makeMarkers.bind(this)
        this.toggleOverlay = this.toggleOverlay.bind(this)
        this.makeMap = this.makeMap.bind(this);
        this.tilesLoaded = false;
        this.markers={}
        this.drawnShape = null;

        this.OVERLAYS = OVERLAYS
    }
    componentDidMount(){
        this.makeMap(this.props.center)

        if (this.props.shapeFilters){
            this.drawnShape = this.hydrateShapes(this.props.shapeFilters);
            this.drawnShape.setMap(this.map);
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        //if different list of locations make and remove the appropriate markers
        if (this.props.locations.length !== nextProps.locations.length || !arraysEqualByIndex(this.props.locations,nextProps.locations)){
            const {toAdd,toRemove,toKeep} = this.processLocations(nextProps.locations)
            const markers = this.makeMarkers(toAdd)
            this.markerClusterer.removeMarkers(toRemove,false)
            this.markerClusterer.addMarkers(markers,false);

        }
        // if work order filter should change icon
        const newWOfilter = (nextProps.workOrderFilter && !this.props.workOrderFilter);
        const removedWOFilter = (!nextProps.workOrderFilter && this.props.workOrderFilter)
        const modifiedWOFilter = (nextProps.workOrderFilter && this.props.workOrderFilter && !arraysEqualByIndex(nextProps.workOrderFilter.data.seriesNames,this.props.workOrderFilter.data.seriesNames));
        if (newWOfilter || removedWOFilter || modifiedWOFilter){
            const status = "";
            this.refreshIcons(this.markers,nextProps.workOrderFilter);
        }
        //if a different overlay is coming in toggle it on
        if (different(this.props.overlays,nextProps.overlays)){
            Object.keys(this.OVERLAYS).forEach(overlayKey=>{
                const overlay = this.OVERLAYS[overlayKey]
                if (overlay.turnedOn !== nextProps.overlays.includes(overlayKey)){
                    this.toggleOverlay(this.map,overlay);
                }
            })
        }
        //if a new animation frame comes in notify the overlay
        if(this.props.i !== nextProps.i){
            Object.values(this.OVERLAYS).forEach(overlay=>{
                overlay.setI(nextProps.i);
            })
        }

        return false
    }
    processLocations(newLocations) {
        const toRemove = []
        const toAdd = []
        const toKeep = {}

        newLocations.forEach(loc => {
            if (!this.markers[loc.Id]) {
                toAdd.push(loc);
            }else{
                if(_.isEqual(loc.Workorders,this.markers[loc.Id].Workorders) && _.isEqual(loc.weatherCondition,this.markers[loc.Id].weatherCondition)){
                    toKeep[loc.Id] = this.markers[loc.Id];
                }else{
                    toRemove.push(this.markers[loc.Id]);
                    delete this.markers[loc.Id];
                    toAdd.push(loc);
                }
            }
        })
        Object.keys(this.markers).forEach(key=>{
            if (!toKeep[key]){
                toRemove.push(this.markers[key]);
                delete this.markers[key];
            }
        })
        return {toAdd,toRemove,toKeep}
    }
    refreshIcons(markerMap,woFilter){
        Object.values(markerMap).forEach(marker =>{
            marker.setIcon(makeIcon(marker.location,woFilter));
        })
        this.markerClusterer.getClusters().forEach(cluster=>cluster.updateIcon_());

    }
    makeMap(center){

        const that = this;

        const mapEl = ReactDOM.findDOMNode(this.refs.map);
        this.mapEl = mapEl;

        this.map = new google.maps.Map(mapEl, {
            zoom: center.zoom,
            center: center.latlng,
            mapTypeId: 'roadmap',
            minZoom: 3,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT
            }
        });
        this.infoWindow = new google.maps.InfoWindow({
            pixelOffset:{width:10,height:-18},
        });
        this.infoWindow.addListener('closeclick', function() {
            that.props.unClickSelect();
        });

        this.infoWindow.open();
        this.infoWindow.close();
        this.infoWindow.map_ = this.map;
        this.props.setInfoPanel(this.infoWindow);
        this.props.setUIController({
            controls:this.map.controls,
            controlPositions:google.maps.ControlPosition
        })

        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['circle', 'polyline', 'rectangle']
            },
            circleOptions,
            rectangleOptions,
            polylineOptions
        });

        const deleteShapesDiv = document.createElement('div');
        deleteShapesDiv.classList.add('googleMapControlButton');
        deleteShapesDiv.title = 'delete shapes';
        deleteShapesDiv.onclick = deleteShapeHandler.bind(this);
        const innderDiv = document.createElement("img");
        const url = "https://png.icons8.com/metro/1600/delete.png"
        innderDiv.src = url;
        deleteShapesDiv.appendChild(innderDiv)

        this.drawingManager.setMap(this.map);
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(deleteShapesDiv)


        const tilesLoadedCB = function(){
            if (!this.tilesLoaded){
                const latlng = this.map.getCenter()
                const zoom = this.map.getZoom();
                const mapLocation = {latlng,zoom}
                this.updateViewPortFilter()
                this.props.setLatLng(mapLocation)
            }
            this.tilesLoaded = true;
        }
        const idleCb = function(){
            ////idle is sometimes fired before tilesloaded and getbounds() returns undefined....for some reason
            if (this.tilesLoaded){
                    this.updateViewPortFilter()
                    const latlng = this.map.getCenter()
                    const zoom = this.map.getZoom();
                    const mapLocation = {latlng,zoom}
                    this.props.setLatLng(mapLocation)
                }
        }

        google.maps.event.addListener(this.map, 'click', keepScrollWheel.bind(this));
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', handleDrawnShape.bind(this));
        google.maps.event.addListener(this.map, 'tilesloaded',tilesLoadedCB.bind(this) );
        google.maps.event.addListener(this.map, 'idle',idleCb.bind(this) );

        const markers = this.makeMarkers((this.props.locations || []));
        this.makeClusterer(markers);
    }
    makeClusterer(markers){
        const that = this;

        const infoWindow = this.infoWindow;
        const markerClusterer = new MarkerClusterer(this.map,markers,{
            ...clusterOptions
        });
        let i =0;
        markerClusterer.setCalculator((markers,numStyles)=>{
            let highestPriority = statusList[statusList.length-1];
            markers.forEach(marker=>{
                const status = marker.icon.status;
                if (workOrdersStatusMap[status].value < workOrdersStatusMap[highestPriority].value){
                    highestPriority=status
                }
            })
            return {
                index:clusterStatusToIndexMap[highestPriority]+1,
                text:markers.length
            }
        })
        //check if info window is open and if its marker has been clustered, if so close it. 
        google.maps.event.addListener(
            markerClusterer,
            'clusteringend',
            (clusterer)=>checkClustersForLocation(clusterer,that.props.clickSelected,that.map,()=>that.props.clickSelect(null))
        );
        //this is used instead of the auto clickzoom feature becuase of some  glitchyness I noticed where zom changes of >3 dont animate
        markerClusterer.addListener('clusterclick', (cluster)=>{
            //to show cluster view clickselect the cluster
            // that.props.clickSelect({cluster})
            const currentZoom = this.map.getZoom();
            const maxZoom = clusterOptions.maxZoom + 1;
            const diff =  maxZoom - currentZoom;
            if (diff > 0 && diff < 3){
                this.map.setCenter(cluster.getCenter())
                this.map.setZoom(clusterOptions.maxZoom+1);
            }else if (diff >=3){
                this.map.setCenter(cluster.getCenter())
                this.map.setZoom(currentZoom+3);
            }
        })
        this.markerClusterer = markerClusterer
    }
    makeMarkers(locations){
        const markerObj = {};
        const markers = locations.map(location=> {
            const marker =  makeMarker(location,this.props.workOrderFilter)
            const that = this;
            marker.addListener("click", () => {
                that.props.clickSelect(location)
            })
            markerObj[location.Id]=marker;
            return marker;
        })
        this.markers = Object.assign({},this.markers,markerObj);
        return markers;
    }
    hydrateShapes(shapeFilter){
        const shape = shapeFilter? shapeFilter.data.shape : false;
        if(shape==="circle") {
            return new google.maps.Circle(Object.assign({},{
                radius:shapeFilter.data.radius,
                center:shapeFilter.data.center,
            },circleOptions));
        }else if (shape==="square"){
            return new google.maps.Rectangle(Object.assign({},{
                bounds:shapeFilter.data.bounds,
            },rectangleOptions));
        }else if (shape==="polyline") {
            return new google.maps.Polygon(Object.assign({},{
                paths:shapeFilter.data.latLngs
            },polylineOptions));
        }else if (shape){
            console.warn("UNKOWN SHAPE", shapeFilter);
        }
    }
    updateViewPortFilter(){
        this.props.updateLocationsFilter(viewport(this.map));
    }
    toggleOverlay(map,overlay){
        overlay.turnedOn = !overlay.turnedOn
        overlay.map_ = map;
        toggleOverlay(map,overlay);
    }
    render(){
        return(
            <div>
                <div id='map' ref='map'/>
            </div>
        )
    }
}
const checkClustersForLocation = (clusterer,location,map,callback)=> {
    if (location && map.getZoom() < clusterOptions.maxZoom) {
        const clusters = clusterer.getClusters();
        for (let i = 0; i < clusters.length; i++) {
            const currentClustersMarkers = clusters[i].getMarkers();
            for (let j = 0; j < currentClustersMarkers.length; j++) {
                if (currentClustersMarkers[j].location.Id === location.Id) {
                    if (currentClustersMarkers.length >= clusterOptions.minimumClusterSize) {
                        callback();
                    }
                    return;
                }
            }
        }
    }
}
function deleteShapeHandler(){
    if (this.drawnShape){
        this.drawnShape.setMap(null);
        this.drawnShape=null;
        this.props.unsetFilter(shapeFilter());
        this.drawingManager.setOptions({
            drawingMode: null,
        });

    }

}
function keepScrollWheel(event) {
    this.map.setOptions({
        scrollwheel: true
    });
}
function handleDrawnShape(event) {
    const shape = event.overlay;
    this.props.updateLocationsFilter(shapeFilter(shape));
    let bounds= shape.getBounds();
    if (this.drawnShape){
        this.drawnShape.setMap(null);
    }
    this.drawnShape = shape;
    this.map.fitBounds(bounds);
    this.drawingManager.setOptions({
        drawingMode: null,
    });
}
function clearClickSelection(e){
    const isClickInside = this.mapEl.contains(event.target);

    if (this.props.clickSelected && !isClickInside) {
        this.props.clearClickSelect();
    }
}


function makeMarker(location,workOrderFilter){
    const icon = makeIcon(location,workOrderFilter);
    return new google.maps.Marker({
        position: {lat: location.Latitude, lng: location.Longitude},
        location,
        Name: location.Name,
        weatherCondition: location.weatherCondition,
        Workorders: location.Workorders,
        icon,
        zIndex:location.workOrderCount.sum>0? 2:1
    });
}
function makeIcon(location,workOrderFilter){
    let statusList = [];

    if (workOrderFilter) {
        statusList=workOrderFilter.data.seriesNames;
    }
    const obj = makeWorkOrderIconFromLocation(location,statusList);
    const url = obj.icon;
    const status = obj.status;
    return Object.assign({},{
        url,
        status,
    },markerIconStyle)
}


function toggleOverlay(map, overlay) {
    if (!overlay.map) {
        overlay.setMap(map);
    } else {
        overlay.setMap(null);
    }
}
function different(arrA,arrB){
    if (arrA.length !== arrB.length){
        return true
    }
    for(let i = 0; i<arrA.length; i++){
        if (!arrB.includes(arrA[i])){
            return true
        }
    }
    return false;
}
function arraysEqualByIndex(a,b){
    if (a.length !== b.length){
        return false;
    }
    for(let i =0;i<a.length;i++){
        if (b[i] != a[i]){
            return false;
        }
    }
    return true;
}

export default Map;