import React from 'react';
import ReactDom from 'react-dom'
import {
    sortWorkOrders,
    workOrdersStatusMap,
    makeWorkOrderStatusValues,
    makeWorkOrderIcon,
    getWorkOrderStatusArr,
} from "../../../util/workOrder";
import WorkOrders from './listItemComponents/workOrders'
import Poster from '../workOrderPoster/posterContainer'
import style from './listItem.scss'
export default (props)=>{
    const location = props.location
    const hasWorkOrders = Object.keys(location.Workorders).length>0;
    const cssClass = hasWorkOrders? "hasworkOrders":"emptyWorkOrders"
    return (
        <section className={`locationList-item flex-column greyBackground ${cssClass}`}>
            <h1>{location.Name}</h1>
            <span  className="locationData">
                <div className={"grid-row"}>
                    <h2>Address</h2>
                    <h1>{getAddress(location)}</h1> 
                </div>
                
                <br/>
                <br/>
                
                {location.mainContact ?
                    <div className={"grid-row"}>
                        <h2>Market Manager</h2>
                        <h1>{location.mainContact}</h1>
                    </div>
                    :
                    null
                }
            </span>
            {displayWeatherConditions(location)}
            <button className="scheduleButton" onClick={()=>props.setModalComponent(<Poster locations={[props.location]}/>)}>Schedule Work Order</button>
            <WorkOrders location={location} setModalComponent={props.setModalComponent} filters={props.filters}/>
        </section>

)}

const displayWeatherConditions = (location)=>(
    (location.weatherCondition && location.weatherCondition.snowInches !== undefined )?       
        <span className="weatherCondition">
            <label >Weather Conditions</label>
            <div className="flex-column ">
            {location.weatherCondition.snowInches!== undefined ?
                <h2>{location.weatherCondition.snowInches} inches of snow</h2> : null}
                {location.weatherCondition.iceInches!== undefined ?
                    <h2>{location.weatherCondition.iceInches} inches of ices</h2> : null}
            </div>
        </span>
    :
        null
)

function getAddress(location){
    return `${location.Address1}, ${location.City}, ${location.State}, ${location.Zip}`
}

