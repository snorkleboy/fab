
function CoordMapType({tileSize, maxZoom,getTileURL}) {
    if (typeof tileSize === "object"){
        this.tileSize = tileSize
    }else{
        this.tileSize ={width:tileSize,height:tileSize} ;
    }
    this.maxZoom = maxZoom;
    this.getTileUrl = getTileURL;
    this.prototype = google.maps.OverlayView();
}
CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    if (coord.x % 2 === 0 && coord.y % 2 === 0){
        //scale = 2^zoom
        const scale = 1 << zoom;

        const div = ownerDocument.createElement('div');
        const img = ownerDocument.createElement("img");
        // const newX = coord.x * this.tileSize.width / scale;
        // const newY = coord.y * this.tileSize.height / scale;
        const newX = Math.floor(coord.x/2)
        const newY = Math.floor(coord.y/2)
        const newzoom = zoom-1 >=0 ? zoom-1 : 0;
        const newCoord = {x:newX,y:newY}
        img.src = this.getTileUrl(newCoord,newzoom)

        img.style.width = '100%';
        img.style.height = '100%';
        div.style.width = this.tileSize.width * 2+ 'px';
        div.style.height = this.tileSize.height * 2+ 'px';
        // div.style.backgroundColor = 'red'
        div.style.fontSize = '10';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px';
        div.style.borderColor = '#AAAAAA';
        // div.style.opacity = ".8"
        div.appendChild(img);
        return div;
    } else{
    }
};


export default CoordMapType;