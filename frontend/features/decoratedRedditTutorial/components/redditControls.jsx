import React from 'react';
import ReactDom from 'react-dom'
import {asFeaturePartial,featurePoints} from "Feature";


export default ({getRedditList,subreddit,type, color, Control = ()=>""})=>(
    <section style={{backgroundColor:color || "red"}}>
        <Control/>
        <button onClick={()=>getRedditList(subreddit,type)}>get reddit</button>
    </section>
)