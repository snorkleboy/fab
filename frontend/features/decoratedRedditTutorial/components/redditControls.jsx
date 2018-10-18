import React from 'react';
import ReactDom from 'react-dom'
import {asFeaturePartial,featurePoints} from "Feature";


export default ({getRedditList,subreddit,type, color, ChangeTypeButton = ()=>""})=>(
    <section style={{backgroundColor:color || "red"}}>
        <ChangeTypeButton/>
        <button onClick={()=>getRedditList(subreddit,type)}>get reddit</button>
    </section>
)