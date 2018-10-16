const subscriberRoleToFeaturesMap = require("./subscriberRoleToFeaturesMap")
//
// console.log(JSON.stringify(subscriberRoleToFeaturesMap));

const resolver = (subscriber,role)=>{
    try {
        const features = subscriberRoleToFeaturesMap[subscriber][role];
        return featureMap;
    }catch(e){
        console.log("feature resolve error",{subscriber,role,e})
    }
}


module.exports = resolver;