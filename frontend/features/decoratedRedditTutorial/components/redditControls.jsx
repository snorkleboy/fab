import React from 'react';
import ReactDom from 'react-dom'
import {asFeaturePartial,featurePoints} from "Feature";

export default ({getRedditList,subreddit,type, ControlButton =()=>null})=>{
    return (
        <section>
            <ControlButton/>
            <button onClick={() => getRedditList(subreddit, type)}>get reddit</button>
        </section>
    )
}