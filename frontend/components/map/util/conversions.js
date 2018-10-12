//https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
export function tileToLatLng(x,y,z){
    if (typeof x === "object"){
        y = x.y
        z = x.z
        x=x.x
    }
    z=z
    const latlng =  new google.maps.LatLng(
        tile2lat(y,z),
        tile2long(x,z)
    )

    return latlng
}
function tile2long(x,z) {
    return (x/Math.pow(2,z)*360-180);
}
function tile2lat(y,z) {
    var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
    return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}