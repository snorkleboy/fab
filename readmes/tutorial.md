# tutorial

##### I just want to get something on the screen
- create a new directory in ./frontend/features. The directory name will be your features name. 
- create a file named featurePackage.js (this file is required for any feature)
- create components
- export an array of components, each one wrapped in a 
 `asFeaturePartial(destinationFeaturePoint, name, decorators = [])(myComponent)`
(*Use the featurePoints enum from "Feature" to ensure you put the right value in)
- npm run webpack
example:
```
// ./frontend/features/myFeature/featurePackage.js
import {asFeaturePartial, featurePoints} from "Feature";

const component = ()=>"this is a react component"
const anotherComponent = "this is also a react component"
export default [
    asFeaturePartial(featurePoints.tabberView,"displayName")(component),
    asFeaturePartial(featurePoints.Main,"displayName")(anotherComponent),
];
```
- you now have a feature ready to be activated for a client. To toggle it on go to ./app/userStuff/subscriberRoleToFeaturesMap.js
- there you should see subscriberRoleToFeaturesMap being defined. In any subscriberRoleToFeaturesMap[subscriber][role] = [(...)] you can put in your feature inside a featureDescriptor. We have no decorators so we can just need to register the featureName, which should have automatically been added to the featureNames enum in "Feature/features.json" during the webpack process
example
```
subscriberRoleToFeaturesMap[subscribers[1]][roles[0]] = [
    FeatureDescriptor(featureNames.myFeature),
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.filters,
        [
            decorators.filters.Default,
        ]
    ),
]
```
if you run the server ("$ node app" from the root directory) and login as a user you toggled the feature for you should see it come up. 

if you look into the ./frontend/Feature/features.autogen.json you should see your feature registered there and if you look into your features folder you should also see some automatically generated tests.

# fuller tutorial
