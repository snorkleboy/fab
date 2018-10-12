
function CoordMapType({tileSize, maxZoom,getTileURL}) {
    if (typeof tileSize === "object"){
        this.tileSize = tileSize
    }else{
        this.tileSize ={width:tileSize,height:tileSize} ;
    }
    this.maxZoom = maxZoom;
    this.getTileUrl = getTileURL;
}
CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        const div = ownerDocument.createElement('div');
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.backgroundColor = 'red'
        div.style.fontSize = '10';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px';
        div.style.borderColor = '#AAAAAA';
        div.style.opacity = ".5"
        div.innerHTML = coord;
        return div;
};
CoordMapType.prototype.setMap = function(map){
    this.map = map;
}
export default CoordMapType;