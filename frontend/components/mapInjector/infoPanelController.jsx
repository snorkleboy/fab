import React from 'react';
import ReactDom from 'react-dom'
import ListItem from '../list/listItemContainer'
import style from './infoWindow.scss'
const maxClusterMarkersDisplayedInInfoWindow = 10
export default class InfoPanelController extends React.Component {
    constructor(props){
        super(props);
        this.div = null;
    }
    shouldComponentUpdate(newProps,newState){
        if(!this.div && newProps.infoPanel){
            this.createDiv(newProps.infoPanel);
        }
        return true;
    }
    createDiv(infoPanel){
        this.div = document.createElement("div");
        this.div.className = "infoWindowContainer"
        infoPanel.setContent(this.div);
    }
    render(){
        if (this.div && this.props.clickSelected){

            this.props.infoPanel.open(this.props.infoPanel.map_);
            
            if (this.props.clickSelected.cluster){
                const cluster =this.props.clickSelected.cluster;
                this.props.infoPanel.setPosition(cluster.getCenter())
                return ReactDom.createPortal(
                    <MakeClustererInfoWindow cluster={cluster}/>,
                    this.div
                );
            } else{
                this.props.infoPanel.setPosition({lat:this.props.clickSelected.Latitude, lng: this.props.clickSelected.Longitude})
                return ReactDom.createPortal(
                    <ListItem location={this.props.locations[this.props.clickSelected.Id]}/>,
                    this.div
                );
            }
            
        } else{
            if (this.props.infoPanel){
                this.props.infoPanel.close();
            }
            return null;
        }
    }
}

function MakeClustererInfoWindow({cluster}){
    const markers = cluster.getMarkers();
    let names = markers
        .slice(0, maxClusterMarkersDisplayedInInfoWindow)
        .map(marker=>{ 
            return (
           `name:${marker.Name},
             ${Object.values(marker.Workorders).filter(wo=>wo.status!=="fulfilled").length} unfullfilled work orders`
        )})

    if (markers.length > maxClusterMarkersDisplayedInInfoWindow) {
        names.push(`${markers.length - maxClusterMarkersDisplayedInInfoWindow} undisplayed`)
    }
    return(
        <ul id="info window cluster">
            {names.map((string, i)=><li id={string+i}>{string}</li>)}
        </ul>
    )


}