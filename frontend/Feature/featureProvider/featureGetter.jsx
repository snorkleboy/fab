import React from 'react';
import ReactDOM from 'react-dom'
import asyncImport from "frontend/asyncImport"
import _ from "lodash"
const featureGetter = ({featuresToLoad,loadFeatures})=> {
    if (featuresToLoad){
        console.log("FEATURE GETTER RENDER",featuresToLoad)
        const promises = [];
        Object.values(featuresToLoad).forEach(featureDescriptor=>{
            promises.push(
                asyncImport(featureDescriptor.featureDirectoryName)
                    .then(featurePackage=> {
                        featurePackage._decoratorsToUse = featureDescriptor.decorators;
                        featurePackage._name =  featureDescriptor.name;
                        return featurePackage
                    })
                    .then(featurePackage=>{console.log({featuresToLoad,featureDescriptor,featurePackage}); return featurePackage})
            )
        })
        Promise.all(promises)
            .then(featurePackages=>{
                loadFeatures(mapFeaturesToFeaturePoints(featurePackages));
            })
    }
        return null;
}


function mapFeaturesToFeaturePoints(loadedFeatures){
    const featurePointToComponentMap = {};

    loadedFeatures.forEach((feature,i)=>{
        const decoratorNames = feature._decoratorsToUse;
        feature.forEach((componentPackageWrapper,k)=>{
            const componentPackage = componentPackageWrapper.componentPackage;
            const destination = componentPackage.destinationFeaturePoint;
            componentPackage.props = {}
            
            if (componentPackage.decorators){
                componentPackage.decorators.forEach(decorator=>{
                    if (decoratorNames.includes(decorator.name)){
                        componentPackage.props = _.merge({},componentPackage.props,decorator.props)
                    }
                })
            }
            componentPackage.props.name = componentPackage.name;
            console.log({componentPackage,decoratorNames,feature});

            if(featurePointToComponentMap[destination]){
                featurePointToComponentMap[destination].push(componentPackage)
            }else{
                featurePointToComponentMap[destination] =[componentPackage];
            }
        })
        
    })

    return featurePointToComponentMap
}


export default featureGetter;