import {tileToLatLng} from "./conversions";

const _options = {

}
function CustomTiler({tileBounds ,options,getTileUrl,tileSize=256, icon,zoomLevelTriggerValues=[1,2,4,6,8,10], i=0}) {
    tileBounds = tileBounds.map(el=>Object.assign({},el));
    this.options = Object.assign({},_options,options)
    this.tileSize = tileSize,
    this.icon = icon;
    this.zoomLevelTriggerValues = zoomLevelTriggerValues.sort((a,b)=>a-b)
    this.tileBounds = tileBounds;
    if (!this.tileBounds){
        throw "must include tileBounds with CustomTiler construct ( [{x:1,y:3,z:3},{x:1,y:3,z:3}] )"
    }
    this.i =i;
    this.initialTileZoom = tileBounds[0].z
    this.turnedOn = false;
    this.currentInternalZoom=null;
    const bounds = makeTileBounds(tileBounds);
    this.bounds = bounds;
    this.bounds_ = new google.maps.LatLngBounds(
        new google.maps.LatLng(bounds.south, bounds.west),
        new google.maps.LatLng(bounds.north, bounds.east)
    )

    this.tiles={};
    this.map_ = null;
    this.div_ = null;
    if (getTileUrl){
        this.getTileUrl = getTileUrl
    }else{
        throw "must include getTileURL ( (coord,zoom)=>url )function on CustomTiler construct"
    }
    this.zoomFunc = remakeTilesAtNewZoom.bind(this)
    this.zoomChangeListener = {};

}
function remakeTilesAtNewZoom(e){
    if (this.turnedOn){
        const thisInteralZoom = this.mapToInternalZoom(this.map.getZoom())
        const newInternalZoom = Boolean(thisInteralZoom !== this.currentInternalZoom);

        if (newInternalZoom){
            this.currentInternalZoom = thisInteralZoom
            this.tiles={}
            this.div_.innerHTML="";
            this.makeTiles(this.currentInternalZoom,this.div_);
        }

    }

}
//inherit google properties
CustomTiler.prototype = new google.maps.OverlayView();
CustomTiler.prototype.onAdd = function() {
    if (this.zoomChangeListener.remove){
        this.zoomChangeListener.remove();
    }
    this.zoomChangeListener = google.maps.event.addListener(this.map_,'zoom_changed', this.zoomFunc);

    this.div_ = document.createElement("div");
    this.currentInternalZoom = this.mapToInternalZoom(this.map.getZoom())

    this.makeTiles(this.currentInternalZoom,this.div_);
    const panes = this.getPanes();
    panes.overlayLayer.appendChild(this.div_);
}
CustomTiler.prototype.draw = function() {
    const overlayProjection = this.getProjection();
    const sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    const ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    const div = this.div_;

    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
    div.style.opacity = this.options.opacity;
};
CustomTiler.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};
CustomTiler.prototype.makeTiles= function makeTiles(internalZoom,div){
    const length = Math.pow(2,internalZoom+1);
    const rows=length
    const columns = length
    div.style.position = 'absolute';
    //make row
    for (let row=0;row<rows;row++){
        const rowEl = document.createElement("span");
        rowEl.style.display="flex";
        rowEl.style.flexDirection="row";
        rowEl.style.width = '100%';
        rowEl.style.height = `${100/rows}%`;
        //make column
        for(let column=0;column<columns;column++){
            const columnEl = document.createElement('img');
            const tileCoord = this.getTileCoordinate(column,row,internalZoom)
            const url = this.getTileUrl(tileCoord,this.initialTileZoom+internalZoom, this.i);
            const tile = new TileObj(tileCoord,this.initialTileZoom+internalZoom,columnEl, this.i);
            this.tiles[[column,row]]=tile
            columnEl.src = url
            columnEl.style.width = `${100/columns}%`;
            columnEl.style.height = '100%';

            rowEl.appendChild(columnEl)
        }
        div.appendChild(rowEl);
    }
    return div
}
CustomTiler.prototype.getTileCoordinate = function (column,row,internalZoom){
    const NETile = this.tileBounds[1];
    const SWTile = this.tileBounds[0];
    const NWTile = {x:SWTile.x,y:NETile.y};
    const scale = 1<<internalZoom;
    const coord = {
        x:scale * NWTile.x+column,
        y:scale * NWTile.y+row
    }
    return coord
}
CustomTiler.prototype.mapToInternalZoom = function mapToInternalZoom(externalZoom){
    const zoomLevelsDifferenceFromInitial = externalZoom-this.initialTileZoom
    for(let i = 0; i<this.zoomLevelTriggerValues.length; i++){
        const zoomTrigger = this.zoomLevelTriggerValues[i];
        if (zoomLevelsDifferenceFromInitial<zoomTrigger){
            return i
        }
    }
    return this.zoomLevelTriggerValues.length-1;
}
CustomTiler.prototype.setI = function(i){
    this.i = i;
    this.reGetImages();
}
CustomTiler.prototype.reGetImages = function regetImages(){
    Object.values(this.tiles).forEach((tile)=>{
        const img = tile.img
        const coord = tile.coord;
        const zoom = tile.z;
        const url= this.getTileUrl(coord,zoom, this.i);
        img.src = url;
    })

}
function ZoomLevel(mapZoom,overlayZoom){
    this.mapZoom=mapZoom;
    this.overlayZoom = overlayZoom
}
function makeTileBounds(tileBoundsArr){
    const newBounds = [];
    const newSWTile = tileBoundsArr[0]
    newSWTile.y =newSWTile.y +1
    const newNETile = tileBoundsArr[1]
    newNETile.x = newNETile.x + 1
    newBounds[0]=tileToLatLng(newSWTile)
    newBounds[1]=tileToLatLng(newNETile)
    const bounds = {
        south: newBounds[0].lat(),
        west: newBounds[0].lng(),
        north: newBounds[1].lat(),
        east: newBounds[1].lng()
    }
    return bounds;
}

function TileObj(coord,z, img,i){
    this.img = img;
    this.coord = coord;
    this.z = z;
    this.i=i;
}
export default CustomTiler
