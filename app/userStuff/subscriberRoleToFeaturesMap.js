const {subscribers,roles} = require( './data')
const subscriberRoleToFeaturesMap = {};
subscribers.forEach(s=>{
    subscriberRoleToFeaturesMap[s] = {}
    roles.forEach(r=>subscriberRoleToFeaturesMap[s][r] = {})
})


const featuresAndDecorators = require("../../frontend/Feature/features.autogen.json");
const featureNames = featuresAndDecorators._featureNames;
const decorators = featuresAndDecorators;
console.log("HERE",{featuresAndDecorators})


//this is what gets sent to the front end as a description of what to load. 
const FeatureDescriptor = (featureDirectoryName,decorators)=>({featureDirectoryName,decorators})


///
////////subscriber1
subscriberRoleToFeaturesMap[subscribers[0]][roles[0]] = [

]
subscriberRoleToFeaturesMap[subscribers[0]][roles[1]] = [
    FeatureDescriptor(featureNames.list)
]
subscriberRoleToFeaturesMap[subscribers[0]][roles[2]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.list)
]


///
////////subscriber2
subscriberRoleToFeaturesMap[subscribers[1]][roles[0]] = [
    FeatureDescriptor(featureNames.tutorialStartingOut),
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.filters,
        [
            decorators.filters.Default,
        ]
    ),
]
subscriberRoleToFeaturesMap[subscribers[1]][roles[1]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.filters,
        [
            decorators.filters.Default,
            decorators.filters.Weather,
            decorators.filters.randomDec
        ]
    ),
]
subscriberRoleToFeaturesMap[subscribers[1]][roles[2]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.filters,
        [
            decorators.filters.Default,
            decorators.filters.Weather
        ]
    ),
]


///
////////subscriber3
subscriberRoleToFeaturesMap[subscribers[2]][roles[0]] = [
    FeatureDescriptor(featureNames.filters,
        [
            decorators.filters.Default,
            decorators.filters.BVFilters,
            decorators.filters.Weather
        ]
    ),
]
subscriberRoleToFeaturesMap[subscribers[2]][roles[1]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.filters,
        [
            decorators.filters.Weather
        ]
    ),
]
subscriberRoleToFeaturesMap[subscribers[2]][roles[2]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.filters,
        [
            decorators.filters.BVFilters,
        ]
    ),
]

module.exports = subscriberRoleToFeaturesMap;