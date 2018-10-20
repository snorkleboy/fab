## how to run
- clone the repository
- npm install
- npm run webpack
- node app
- webpack should have ran and you node app should start a server on port 3000

# tutorial

### I just want to get something on the screen
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
 -To toggle it on go to ./app/userStuff/subscriberRoleToFeaturesMap. adn add a featureDesciptor to some users
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

Every featurePoint is named and registered in a featurePoints enum which you can import anywhere as ```import {featurePoints} from "Feature"```. Then when you export your components you just need to register them as going to that feature point using the handy dandy ```import {asFeaturePartial} from "Feature"```

then you create a featurePackage.js which exports an array of registered components, and finally toggle your feature name on for particular users.

This pattern also supports decorators; any-purpose full js react-props which you can pass into your components using decorator flags. You should declare the names of any decorators used is a decorators.json file to be able to accuretely reference them serverSide from the features enum. Decorators are 'themable', as in different decorators can be given the same name on different featurePartials and be activated by the same decorator toggle, or the same props can be given to differnt components under different (or same) decorator toggles. 

## getting started
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
### asFeaturePartial
asFeaturePartial helps you wrap your components properly, it is used similar to Redux' connect function or React routers withRouter:
 - connect:
```
import { connect } from 'react-redux';
export default connect(cb1, cb2)(MyLovelyComponent)
```
- withRouter
```
withRouter(connect(cb1, cb2)(MyComponent))
```
 - asFeaturePartial
```
import {asFeaturePartial,featurePoints} from "Feature"
export default asFeaturePartial(featurePoints.myFeatureName, name, decorators)(MyLovelyComponent)//can be redix component or react component, and you can do redux's connect inline like in withRouter above. 
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

##### multiple feature partials and registering reducers
a feature can be a combination of any number of components registered to any feature points. One of the availible feature points is registerReducer. This feature point allows you to register a reducer that will manage state keyed under the feature name you give it in the asFeaturePartial function. 

you inject it just like any other feature partial, but its destination has to be the registerReducer featurePoint.
```
const myReducer = (state = defaultState,action)=>{
    const newState = Object.assign({},state);
    switch (action.type){
        case actionTypes.doThing:
            newState.type = action.payload;
            return newState;
        default:
            return state
    } 
}

export default asFeaturePartial(featurePoints.registerReducers,"myReducer")(myReducer)
```

and then in the featurePackage.js
```
import MyReducer from './reducers/redditReducer';
import MyComponent from "./components/displayRedditListContainer"
export default [
    MyReducer,
    MyComponent,
]
```

if you want your components to get state from the state that that reducer manages you just have to create a redux container to inject state into your component. the state will be keyed under your reducers name
```

export const mapStateToProps = (state, ownProps) => {
    return {
        someState: state.myReducer.someState,
    }
```

### decorators an asDecoration
decorators must be an object of the form 
```
{name:string,props:{literally:anything(you).want, color:"green"}}
```
Decorators are activated by name and must be registered in a decorators.json in the root of your feature like so
```
// frontend/features/myFeature/decorators.json
{
  "decoratorName":"decoratorName"
}
```
decorators are registered to featurepartials in the asFeaturePartial function as the third parameter like so
```
export default asFeaturePartial(featurePoints.destination,"myFeaturepartial",[myDecorator1,myDecorator2])(MyComponent);
```

decorators are themable, which means that if you have multiple components receiving decorators you can coordinate them by name. For example you could have 'usa' decorators that you register to three different components and each one displays the color injected in as a prop. 
```
{name:decorators.usa,props:{color:"white"}}}
{name:decorators.usa,props:{color:"red"}}}
{name:decorators.usa,props:{color:"blue"}}}
```
decorators get merged, so if you inject the following
```
{name:decorators.colored,props:{color:"white"}}}
{name:decorators.colored,props:{backgroundColor:"red"}}}
{name:decorators.colored,props:{fetchData:"green"}}}
{name:decorators.colored,props:{fetchData:function(){}}}}

```
you should expect the props given to the final component to look like 
```
{props:{color:"white",backgroundColor:"red",fetchData:function(){}}}
```

a featurePartial itself can be made to be only rendered with a decoration flag. asFeaturePartial() returns a function, you can either call it with the component your wrapping or call asDecoration(decoratorName)(component) like so
```
export default asFeaturePartial(featurePoints.dest).asDecoration(decoratorNames.decorator)(MyComponent)
```

and then that featurePartial will only be active when its decorator flag is active. 

## putting it together tutorial 
I have already made a reddit feature which we will ad decorators to. right now it has three feature partials:
```
import RedditControls from "./components/redditControlsContainer";
import RedditReducer from './reducers/redditReducer';
import RedditListView from "./components/displayRedditListContainer"

export default [
    RedditControls,
    RedditReducer,
    RedditListView
]
```
one is a reducer which adds a list,subreddit, and type fields in state.reddit, the controls component has a  button to fetch a list of articles from reddit and the list view renders them. 

first lets add a single decorator to add a button to change the way that the controls component fetches items from reddit. For the purposes of this tutorial I will make a redux connected component, but you could just add to the container on <RedditControls> to achieve the same thing in the short term. 

lets start by making that change type button. I am going to create the container and button in one file
```
import React from 'react';
import { connect } from 'react-redux';
import {changeRedditType} from "../reducers/redditActions";

const ChangeTypeButton = ({currentType,changeType})=>(
    <div>
        <input value={currentType} onChange={(e)=>changeType(e.target.value)}/>
    </div>
)

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeType:(newType)=>dispatch(changeRedditType(newType))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentType:state.reddit.type
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTypeButton);
```
so whats going on here is that I have a ChangeTypeButton component which takes in a currentType and a changeTypeCallback. It displays an input which onChange takes the value of the inputs and calls the changeType callback with the value.

The container, the object which comes out of the connect()() invocation, will inject the currentType from the runtime redux state and a changeType which dispatches an action with data. 

now lets add a decoration. First make an enum as decorators.json
```
// frontend/features/decoratedRedditTutorial/decorators.json
{
  "typeChange":"typeChange"
}
```
then make a decorator and register it to the featurePartial:
```
/// frontend/features/decoratedRedditTutorial/components/redditControlsContainer.js
const decorator = {
    name:decoratorNames.typeChange,
    props:{changeTypeControl:true}
}
export default asFeaturePartial(featurePoints.tabberView,"reddit",[decorator])(connect(mapStateToProps, mapDispatchToProps)(RedditControls));
```
now go to redditControls.jsx, import our ChangeTypeButton and render it if changeTypeControl comes in as true. 
```
import React from 'react';
import ReactDom from 'react-dom'
import {asFeaturePartial,featurePoints} from "Feature";
import ChangeTypeButton from "../decorators/changeTypeButton"

export default ({getRedditList,subreddit,type, changeTypeControl = false})=>(
    <section >
        {changeTypeControl? <ChangeTypeButton/> : null}
        <button onClick={()=>getRedditList(subreddit,type)}>get reddit</button>
    </section>
)
```

now run webpack and run your tests. If everything is passing you have a feature decorator fully ready to go and you just need to register the decorator to a user.

go to the subscriberRolesFeatures map and add in the feature and decorator, should look something like:
```
]subscriberRoleToFeaturesMap[subscribers[0]][roles[0]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.decoratedRedditTutorial)
]
subscriberRoleToFeaturesMap[subscribers[0]][roles[1]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.decoratedRedditTutorial,
        [
            decorators.decoratedRedditTutorial.typeChange
        ]
    ),
    ]
```
so sub[0]role[1] gets the decoratatedReddit feature with a decorator, and subscriber[0]roles[0] gets the undecorated version. Make sure to restart your app and try logging in as those users. 

this works but its not very 'reacty' of us. We are injecting a string into a component to tell it whether to render another component, why not just inject the component itself?

lets change around the decorator defination and the control component:
```
...
import ChangeTypeButton from "../decorators/changeTypeButton"

const decorator = {
    name:decoratorNames.typeChange,
    props:{ControlButton:ChangeTypeButton}
}
...
export default ({getRedditList,subreddit,type, ControlButton = ()=>null})=> {
    return (
        <section>
            <ControlButton/>
            <button onClick={() => getRedditList(subreddit, type)}>get reddit</button>
        </section>
    )
}
...
```
*note that the componentName in JSX tags is capitalized. components inside JSX tags must ALWAYS BE CAPITALIZED*

try running webpack and logging in again, you should see the same results. 

Now lets move that functionality into a seperate menu.

here is a basic menu that I am sending to the header wrapped in a redux container which we will fill out next
```
import React from 'react';
import { connect } from 'react-redux';
import {asFeaturePartial,featurePoints} from "Feature";
import decorators from "../decorators.json"
import style from "./headerMenu.scss"
class HeaderMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false
        }
        this.toggleOpen = this.toggleOpen.bind(this);
    }
    toggleOpen(e) {
        this.setState({open:!this.state.open})
    }
    render() {
        return (
            <div className={"headerMenu"} >
                <div onClick={this.toggleOpen} >RedditMenu</div>
                {this.state.open? this.menuOptions():null}
            </div>
        )
    }
    menuOptions(){
        return(
            <div> 
                <div>menuOption</div>
                <div>menuOption</div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}
export default asFeaturePartial(featurePoints.HeaderMenu)(connect(mapStateToProps, mapDispatchToProps)(HeaderMenu))
```
```
/// headerMenu.scss
.headerMenu{
  background-color: white;
}
```
to get it to display all we have to do is add it to the featurePackage.json and it should display for all users that have the decoratedReddit feature toggled
```
import RedditControlsContainerPartial from "./components/redditControlsContainer";
import RedditReducer from './reducers/redditReducer';
import RedditListView from "./components/displayRedditListContainer";
import RedditMenu from "./components/headerMenu"
export default [
    RedditControlsContainerPartial,
    RedditReducer,
    RedditListView,
    RedditMenu
]
```

now lets make it so that it only appears for some clients. for that to happen we have to export Redditmenu as a decoration. Lets register a new decorator name and apply asDecoration to RedditMenu:
```
//decorators.json
{
  "typeChange":"typeChange",
  "menu":"menu"
}
...
export default asFeaturePartial(featurePoints.HeaderMenu)
.asDecoration(decorators.menu)
(connect(mapStateToProps, mapDispatchToProps)(HeaderMenu))
...
```

now run webpack to automatically register our new feature decorator and toggle it on for some users
```
subscriberRoleToFeaturesMap[subscribers[0]][roles[2]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.decoratedRedditTutorial,
        [
            decorators.decoratedRedditTutorial.typeChange,
            decorators.decoratedRedditTutorial.menu
        ]
    )
    ]
```
now restart the server and test it out.

lastly lets make one of the menu buttons open a modal. The app already has a modal component connected to redux, we just have to call setModal(componentToDisplay) and a component will display in the modal. The modal injects a onClose() into whatever it dispalys to allow it to close. 

first lets inject the props into the menu
```
import {setModalComponent} from "baseRedux/actions/uiActions/uiActions"

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openModalWith:(component)=>dispatch(setModalComponent(component)),
    }
}
```

now lets use those in the menu component, change one of the this.menuOptions() function like so
```
menuOptions(){
        const configMenu = <ConfigMenu/>
        return(
            <div> 
                <div onClick={()=>this.props.openModalWith(configMenu)}>redditConfig</div>
                <div>menuOption</div>
            </div>
        )
    }
```
now all we have to do is make that ConfigMenu component
```
import {changeSubReddit} from "features/decoratedRedditTutorial/reducers/redditActions";
import React from 'react';
import { connect } from 'react-redux';
import ChangeType from "../decorators/changeTypeButton"
const ConfigMenu = ({subreddit, changeSubReddit, close})=>{console.log({subreddit, changeSubReddit, close});return(
    <section className={"configMenu"}>
        <h1> change subreddit</h1>
        <input value={subreddit} onChange={(e)=>changeSubReddit(e.target.value)}/>
        <h1> change type</h1>
        <ChangeType/>
        <h1 onClick={close}>[x]</h1>
    </section>
)}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeSubReddit: (newSub)=>dispatch(changeSubReddit(newSub)),
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        subreddit:state.reddit.subreddit
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigMenu);
```

now import it into the menu, webpack, run tests, and check that it works.

now you have reddit features, decorators, and a featurePartial decoration.

Lets do just two more things. First lets use the ChangeType button more flexibly and replace that first input field, and then lets make the menu options for the menu come in as decorators. 

 lets also it off as a decorator of the Controls component. 
```
export default asFeaturePartial(featurePoints.tabberView,"reddit")(connect(mapStateToProps, mapDispatchToProps)(RedditControls));
```
you have to worry about unregistering it in the user=>feature map or the decorators.json file, but if you dont plan on using it it would be cleaner to scrub it. 

If you look at the changeType button, the underlying component is build to recieve a value and a callback and the redux container injects it in. lets get rid of its redux container and instead pass those props in from the ConfigMenu.
first copy its redux container properties over to the ConfigMenus container. The ConfigMenus container should now look like
```
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeSubReddit: (newSub)=>dispatch(changeSubReddit(newSub)),
        changeType:(newType)=>dispatch(changeRedditType(newType))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        subreddit:state.reddit.subreddit,
        currentType:state.reddit.type
    }
}
```
the change typeButton ( changed the names to be more semantic)
```
export default ({value,onChange})=>(
    <div>
        <input value={value} onChange={(e)=>onChange(e.target.value)}/>
    </div>
)
...
/// (when I start passing in many props I generally stop destructuring them and access them by key value on props)
const ConfigMenu = (props)=>(
    <section className={"configMenu"}>
        <h1> change subreddit</h1>
        <ChangeType value={props.subreddit} onChange={(e)=>props.changeSubReddit(e.target.value)}/>
        <h1> change type</h1>
        <ChangeType value={props.currentType} onChange={(e)=>props.changeType(e.target.value)} />
        <h1 onClick={props.close}>[x]</h1>
    </section>
)
```
and now the config menu can use it in a extensible way (altough as you can see in this case its just a wrapper around a input tag you can apply common styling and labels,etc).

now lets convert the menu options into decorators.  Right now in the menuOptions() function we declare a <Config/> component and then pass it into the openModel callback. We can easily pass it in as a component. Lets first register it in the deocrators.json and remove the now defunct typeChange.
```
// decorators.json
{
  "menu":"menu",
  "config":"config"
}
```
and now lets turn our <Config/> component into a decorator. 
```
const menuDecorator = {
    name:decorators.config,
    props:{
        menuOptions:{
            redditConfig:<ConfigMenu/>
        }
    
    }
}
    
```
if we want to register more menuOption decorators later, we can key them under menuOptions and have them merged together in the order that we register them in the user=>feature map.

add the menuDecorator as a decorator to the headerMenu
```
export default asFeaturePartial(featurePoints.HeaderMenu,"",[menuDecorator])
    .asDecoration(decorators.menu)(connect(mapStateToProps, mapDispatchToProps)(HeaderMenu))
```

Okay so now we can expect to receive a menuOptions prop, lets use that in the menuOptions method of the menu
```
menuOptions(){
    const MenuOptions = this.props.menuOptions || []; //setting a default value 
    return(
        <div>
            <div>menuOption</div>
            {Object.keys(MenuOptions).map(optionName=> (
                <div onClick={() => this.props.openModalWith(MenuOptions[optionName])}>{optionName}</div>
            ))}
        </div>
    )
}
```
were using the key of the menuOptions object to give the menu options a name and the component it comes with gets sent to the modal on click. Powerful stuff. 

webpack and toggle it on in the user=> feature map and try your tests and  
```
subscriberRoleToFeaturesMap[subscribers[0]][roles[1]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.decoratedRedditTutorial,
        [
            decorators.decoratedRedditTutorial.menu
        ]
    ),]
subscriberRoleToFeaturesMap[subscribers[0]][roles[2]] = [
    FeatureDescriptor(featureNames.list),
    FeatureDescriptor(featureNames.decoratedRedditTutorial,
        [
            decorators.decoratedRedditTutorial.config,
            decorators.decoratedRedditTutorial.menu
        ]
    ),
    FeatureDescriptor(featureNames.list)
]
```
restart the server and try it out. 