# tutorial

##### I just want to get something on the screen
- create a new directory in ./frontend/features. The directory name will be your features name. 
- create a file named featurePackage.js (this file is required for any feature)
- create components
- export an array of components, each one wrapped in a 
 `asFeaturePartial(destinationFeaturePoint, name, decorators = [])(myComponent)`
(*Use the featurePoints enum from "Feature" to ensure you put the right value in)
- npm run webpack
```
// ./frontend/features/myFeature/featurePackage.js
import {asFeaturePartial, featurePoints} from "Feature";

const component = ()=>"this is a react component"
const anotherComponent = ()=>"also a react component"
export default [
    asFeaturePartial(featurePoints.tabberView,"name in tab")(component),
    asFeaturePartial(featurePoints.Main,"not named")(anotherComponent),
];
```
 you now have a feature ready to be activated for a client. 
 -To toggle it on go to ./app/userStuff/subscriberRoleToFeaturesMap.js
- In any subscriberRoleToFeaturesMap[subscriber][role] = [(...)] you can put in your feature inside a featureDescriptor. We have no decorators so we just need to register the featureName(same as the directory name of your feature), which should have automatically been added to the featureNames enum in "Feature/features.json" during the webpack process:
```
/// ./app/userStuff/subscriberRoleToFeaturesMap.js

//during webpack your feature should have been automatically registered in features.json and imported as featureNames in this file, your intellisense should be able to help you out here. 

subscriberRoleToFeaturesMap[subscribers[1]][roles[0]] = [
    FeatureDescriptor(featureNames.myFeature),
    FeatureDescriptor(featureNames.list),
]
```
if you run the server ("$ node app" from the root directory) and login as a user you toggled the feature for you should see it come up. 

if you look into the ./frontend/Feature/features.autogen.json you should see your feature registered there and if you look into your features folder you should also see some automatically generated tests (run them as 'npm run test' or 'npm run test featurename' to get just your tests).

# fuller tutorial
### intro
I hope for this pattern to be as close to designing regular react apps as possible. In the regular react flow you would create a file with a component in it, export it, import it in some component being rendered in the app, and register your component there to be rendered. If that component was behind some kind of feature flag you would need to toggle it.

This is very similar, but instead of having the regular tree like structure of a react app where top level components render children, The app has a set list of 'featurePoints' which you register your features components to.

the code behind a feature points looks more or less like:
```
 const SimpleFeaturePoint = ({featurePointName})=>(
    <FeatureProvider featurePointName={featurePointName}>
        <SimpleFeaturePartialRenderer/>
    </FeatureProvider>
)
const SimpleFeaturePartialRenderer = ({FeaturePointChildren})=>(
    <section className={"flex-column"}>
        {FeaturePointChildren.map(C=><C.component {...C.props}/>)}
    </section>
)
...
    <SimpleFeaturePoint featurePointName={featurePoints.Main}/>
...
```
where FeatureProvider is a redux connected component which injects dynamically loaded components and some props which can act as decorators. 

Every featurePoint is named and registered in a featurePoints enum which you can import anywhere as ```import {featurePoints} from "Feature"```. Then when you export your components you just need to register them as going to that feature point using the handy dandy ```{import {asFeaturePartial} from "Feature"```

then you create a featurePackage.js which exports an array of registered components, and finally toggle your feature name on for particular users.

This pattern also supports decorators; any-purpose full js react-props which you can pass into your components using decorator flags. You should declare the names any decorators used is a decorators.js file to be able to accuretely reference them serverSide from the features enum. Decorators are 'themable', as in different decorators can be given the same name on different featurePartials and be activated by the same decorator toggle, or the same props can be given to differnt components under different (or same) decorator toggles. 

# getting started
lets start out by creating a directory for your feature, I will use tutorialStartingOut.
create a file with a component and export it, for example 
```
// ./frontend/features/tutorialStartingOut
import React from 'react';
import ReactDom from 'react-dom'

export default ()=>"hello friends"
```
now run webpack. You should immediately see a warning (although webpack should complete successfully):
```
Warning: feature:tutorialStartingOut - Feature must have featurePackage.js to be loaded but './frontend/features/tutorialStartingOut/featurePackage.js' does not exist
```
follow webpacks sage advice and create a featutePackage.js file and import your component and export it like so:
```
import myComponent from "./myComponent"
export default myComponent
```

run webpack, you should see no errors. Go to ./frontend/Feature/features.autogen.json, you should see your featureName in the featureNames part. Look into your features directory, you should see a tests folder. You can run the automatically genereated test by running "npm run test featureName". All the tests should *fail*. 

change your file to export an array of components like so 
```
import myComponent from "./myComponent"
export default [
    myComponent
]
```
and run the tests. You should now be passing the first test. All we need to do now is register the component to a featurePoint
###### asFeaturePartial
asFeaturePartial helps you wrap your components properly, it is used similar to Redux' connect function:
 - connect:
```
import { connect } from 'react-redux';
export default connect(cb1, cb2)(MyLovelyComponent)
```
 - asFeaturePartial
```
import {asFeaturePartial,featurePoints} from "Feature"
export default asFeaturePartial(featurePoints.myFeatureName, name, decorators)( MyLovelyComponent)
```

to get our first feature to work we have to export an array of feature partials which together become a feature. 
```
import myComponent from "./myComponent"
import{asFeaturePartial,featurePoints} from "Feature";

export default [
    asFeaturePartial(featurePoints.Main)(myComponent)
]
```
now run webpack, run your tests. You should see no warnings or errors. Your feature should be registered in the features.autogen.json file, You now have a feature ready to go. If you start the app with 'node app yourPort' (from the root directory, port defaults to 3000) and navigate to localhost:yourPort, you should see the app. But regardless of who you log in as you will not see your feature.  Last thing we must do is register our feature to some users. 

the server has as simple subscriber=>role=>return arrayofFeatures map. You just need to add your feature inside of a client feature array. There is a FeatureDescriptor factory and a featureNames enum imported from the features.autogen.json files. 
```
/// ./app/userStuff/subscriberRoleToFeaturesMap.js

//during webpack your feature should have been automatically registered in features.json and imported as featureNames in this file, your intellisense should be able to help you out here. 

subscriberRoleToFeaturesMap[subscribers[1]][roles[0]] = [
    FeatureDescriptor(featureNames.tutorialStartingOut),
    FeatureDescriptor(featureNames.list),
]
```

now if you restart the app and login as the user you registed your feature for(they are in the same order as thier array positions) you should see your feature!
