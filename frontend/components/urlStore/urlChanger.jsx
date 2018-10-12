import React from 'react';
import ReactDOM from 'react-dom'
import * as filters from '../../util/filters'


const notForUrlFilters = [filters.defaultViewPort.type]
class UrlChanger extends React.Component {
    constructor(props) {
        super(props)
        this.originalUrl = window.location.href.split("#")[0];
    }
    shouldComponentUpdate(nextProps, nextState){
        let activeFilters = nextProps.activeFilters.slice();
        activeFilters = activeFilters.filter(filter=>!notForUrlFilters.includes(filter.type));
        const latlng = nextProps.latlng.latlng;
        const zoom = nextProps.latlng.zoom;
        const latlngUrl = ["{", latlng.lat(), "+", latlng.lng(),"+",zoom, "}"].join('');
        const filterUrl = "["+activeFilters.map((filter)=>filter.toUrl()).join("^")+"]";
        const addition =  ["#?", "filters=", filterUrl, "latlng=",latlngUrl ].join('').replace(/ /g,"%")
        window.location.href = this.originalUrl +addition;
        return false;
    }
    render() {
        return (<div></div>)
    }
}

export default UrlChanger;