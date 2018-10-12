import React from "react";
import {OVERLAYS} from './util/overlays'

import {Item, Icon} from 'semantic-ui-react'

const _state={
    frames:12,
    autoplay: false,
    i:0,
};
export default (props)=>(
    <section>
        <span className="overlayButtons flex-column">
            {Object.keys(OVERLAYS).map((overlayKey)=>makeOverlayButton(overlayKey,OVERLAYS[overlayKey],props) )}
        </span>
    </section>
)


function makeOverlayButton(key,overlay,props){
    const button = (
        <Item className={activeClasser(key,props.toggledOverlays,"overlayButton")} key={key +"overlaybutton"} onClick={props.changeOverlay(key)}>
            <Item.Image size='mini' src={overlay.icon} title={capitilize(key)}/>
        </Item>
    )
    return button
}

const capitilize = (string)=>string[0].toUpperCase() + string.substring(1,string.length);
function activeClasser(value, overlayArr, css){
    let classes = css
    if (overlayArr.includes(value)){
        classes = "activeOverlay " + css
    }
    return classes
}