const {subscribers,roles} = require( './data')
const subscriberRoleToFeaturesMap = {};
subscribers.forEach(s=>{
    subscriberRoleToFeaturesMap[s] = {}
    roles.forEach(r=>subscriberRoleToFeaturesMap[s][r] = {})
})
const filterSchemas = require("../../frontend/features/filters/schemas/schemas")
const baseFeatures = require("./features").baseFeatures;
const featureToMap = require("./Feature").featureToMap;

subscriberRoleToFeaturesMap[subscribers[0]][roles[0]] = []
subscriberRoleToFeaturesMap[subscribers[0]][roles[1]] = [baseFeatures.listView]
subscriberRoleToFeaturesMap[subscribers[0]][roles[2]] = [baseFeatures.listView, baseFeatures.listView]

subscriberRoleToFeaturesMap[subscribers[1]][roles[0]] = [baseFeatures.filterView.withDefault().withWeather()]
subscriberRoleToFeaturesMap[subscribers[1]][roles[1]] = [baseFeatures.listView,baseFeatures.filterView.withDefault()]
subscriberRoleToFeaturesMap[subscribers[1]][roles[2]] = [baseFeatures.listView]

subscriberRoleToFeaturesMap[subscribers[2]][roles[0]] = [baseFeatures.listView,baseFeatures.filterView.withDefault().withWeather().withBVFilters()]
subscriberRoleToFeaturesMap[subscribers[2]][roles[1]] = [baseFeatures.listView,baseFeatures.filterView.withBVFilters()]
subscriberRoleToFeaturesMap[subscribers[2]][roles[2]] = [baseFeatures.listView,baseFeatures.filterView.withWeather()]

console.log(JSON.stringify(subscriberRoleToFeaturesMap));

const resolver = (subscriber,role)=>{
    try {
        const features = subscriberRoleToFeaturesMap[subscriber][role];
        const featureMap = featureToMap(features);
        console.log("FEATURES::::",JSON.stringify(featureMap));
        return featureMap;
    }catch(e){
        console.log("feature resolve error",{subscriber,role,e})
    }
}


module.exports = resolver;