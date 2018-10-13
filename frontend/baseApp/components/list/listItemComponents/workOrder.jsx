import React from 'react';
import ReactDom from 'react-dom'
import {
    makeWorkOrderIcon,
} from "../../../../../util/workOrder";
import style from './workOrder.scss'

const WorkOrder = ({wo,i})=>{
    const subContractor = wo.Provider;
    return (
    <li className="workOrder" key={wo.id+i+"WO"}>
        <div className="flex-row">
            <img className="markerIcon" src={makeWorkOrderIcon(wo).icon}/>
            <div className="flex-column">
                <div className="grid-row">
                    <h2>Tracking Number</h2>
                    <h1>{wo.Id}</h1>
                </div>
                <div className="grid-row">
                    <h2>Description</h2>
                    <h1>Snow Cleaning</h1>
                </div>
                <div className="grid-row">
                    <h2>Status</h2>
                    <h1>{wo.Status.Primary.replace("_"," ")}</h1>
                </div>
                {subContractor?
                    <div className={"subcontractor"}>
                        <h2>Subcontractor</h2>
                        <div className="grid-row">
                            <h2>Name:</h2>
                            <h1>{subContractor.Name}</h1>
                        </div>
                        <div className="grid-row">
                            <h2>Email:</h2>
                            <h1>{subContractor.Email}</h1>
                        </div>
                        <div className="grid-row">
                            <h2>Phone:</h2>
                            <h1>{subContractor.PhoneNumber}</h1>
                        </div>
                    </div>
                :null}
                
                
                {/*<h1>First pass must be by:</h1>*/}
                {/*<h1>{(wo.scheduledDate)}</h1>*/}
            </div>
        </div>
        <br/>

    </li>
)}

export default WorkOrder;