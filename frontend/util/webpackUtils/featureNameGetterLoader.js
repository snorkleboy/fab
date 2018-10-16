const loaderUtils = require('loader-utils');
const features = [];
const decorators = [];

module.exports = function folderNameGetterLoader(input,map,c){
    const resourcePath = this.resourcePath
    
    let featureName = resourcePath.split("features/");
    if (!featureName[1]){
        this.emitError(new Error(resourcePath + " is not a valid feature path"))
    }
    featureName = featureName[1].split("/");
    if (!featureName[1] || featureName[1] !== "featurePackage.js"){
        this.emitError(new Error(resourcePath + " must be a featurePackage.js"))
    }
    features.push(featureName[0])
    console.log({features,resourcePath})
    return;
}