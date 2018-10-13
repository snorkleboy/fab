import React from 'react';
import ReactDom from 'react-dom'
export default (props)=>{
    const location = props.location

    return (
        <button onClick={props.onClick(location)} className={`greyBackground card border-bottom-light ${props.clickSelected? "activeLocation" : ""}`}>
            <span >
                <h2  className="blueLink text-big bold" >{location.name}</h2>
                <i className={"small text-lightGrey text-normal"}>{getAddress(location)}</i>
            </span>
        </button>
    )
}
function getAddress(location){
    return `${location.Address1}, ${location.City}, ${location.State}, ${location.Zip}`
}