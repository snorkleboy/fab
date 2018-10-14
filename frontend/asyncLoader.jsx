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
            const props = featureObj.props;
            const comp = Loadable({
                loader: () => import(/* webpackChunkName: 'asyncComponents/[request]' */ `./features/${featureObj.path}`)
                    .then(Component=>{console.log("feature component loaded",{Component,featureSchema,featureName,featureObj});return Component;})
                    .catch(e=>console.log(e)),
                loading:() => <h1> "loading" </h1>
            })
            return comp;
        })
    })
}
// AsyncLoader.LoadFeatures = function(featureSchema){
//     Object.keys(featureSchema).forEach(featureName=>{
//         featureMap[featureName] = [];
//         featureSchema[featureName].map((featureObj,i)=>{
//             const props = featureObj.props;
//             import(/* webpackChunkName: 'asyncComponents/[request]' */ `./features/${featureObj.path}`)
//                 .then(Component=>{console.log("feature component loaded",{Component,featureMap,featureSchema,featureName,featureObj});return Component;})
//                 .then(Component=>{
//                     featureMap[featureName][i] = {Component ,props}
//                 })
//                 .catch(e=>console.log(e));
//         })
//     })
// }
AsyncLoader.getFeature = (name)=>{
    return featureMap[name]? featureMap[name].map(C=><C name={"loader"}/>) : [];
}
export default AsyncLoader;