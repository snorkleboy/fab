import React from 'react';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';


const featurePath = "features"
const featureMap = {};
function AsyncLoader (paths){
    const components = paths.map(path=>{
        const comp = Loadable({
            loader: () => import(/* webpackChunkName: 'asyncComponents/[request]' */ `./baseApp/${path}`).catch(e=>console.log(e)),
            loading:() => <h1> "loading" </h1>
        })
        loadedComponents[path] = comp;
        return comp;
    }
    );
    console.log({ components, paths, featureMap}, "BASE LOADER");

    return components.map(C=><C/>)
}

AsyncLoader.LoadFeatures = function(featureSchema){
    Object.keys(featureSchema).forEach(featureName=>{
        featureMap[featureName] = featureSchema[featureName].map(featureObj=>{
            const props = featureObj.props || {};
            
            let tempTabberName = featureObj.path.split("/");
            tempTabberName = tempTabberName[tempTabberName.length-1];
            tempTabberName = tempTabberName.split(".js")[0];
            tempTabberName = tempTabberName.toUpperCase().split("CONTAINER")[0];

            props.name = tempTabberName;
                
            console.log("feature component FETCHING",{featureSchema,featureName,featureObj})
            const Component = Loadable({
                loader: () => import(
                    /* 
                    webpackChunkName: 'asyncComponents/[request]',
                    webpackMode: "eager", 
                    */
                    `./features/${featureObj.path}`
                    )
                    .then(Component=>{console.log("feature component loaded",{Component,featureSchema,featureName,featureObj});return Component;})
                    .catch(e=>console.log(e)),
                loading:() => <h1> "loading" </h1>
            })
            return {Component,props};
        })
    })
}
let key = 0;
AsyncLoader.getFeature = (name)=>{
    return featureMap[name]? featureMap[name]: [];//.map(C=><C key={key++ + Date.now()} name={"loader "+key}/>) 
}

export default AsyncLoader;