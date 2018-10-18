react is a rendering and state management system.

there is one rule and two guidelines
1) Never directly mutate state, use setState(modifiedCopyOfPreviousState) or setState({sameKey:{sameKey:"new value"}})
- - most standard methods of cloning an object in javascript are shallow, be vigilant when creating nested objects in state and updating them or changes to state will unpredictably not be rendered. 
a) if you are considering modifying the dom directly reconsider it atleast once. You can probably turn something into a managed component and achieve the same affect.
b) avoid getting keys by string value, create something like an enum object and reference the values from that to avoid name mismatchn errors. there is no static type checking to help you on your way. 

React follows a MVC pattern in a component based framework. Every component has managed state as its model, some event handlers that act as controllers, and views that render based on state. Every component can render other components and inject 'props'. These props can be anything, another components state, event handlers, even other components. 

tech primer-
react uses JSX. We use es16+ js. You can use sass to style programatically. You can use jest to test.  You need webpack to transform and bundle the code into something a browser can execute. There is some code with webpack that automatically registers your features and decorators and creates sanity tests.

basic 
stateless components without props

the most basic react component is simply a string

```
    const compa = "this is a valid react component"
    const compb = ()=>"a function that returns a string is also a valid component"

```
a react component can be function that returns jsx. A react component can only return a single xml tag(<>...</>) with any number of other react components inside, so in this case I wrap compa and compb in a section tag. 
```
const compc = ()=>(
        <section>
            <compa/>
            {" to write code escape it inside of {...}"}
            <compb/>
        </section>
    )
```
stateless components with props.
- usefull for extracting view logic from the render section of other components
- just like state never modify props directly. If its supposed to be some kind of managed state its supposed to have some kind of event handler to change it. 
```
// this is a destructuring sytax 
const NameChecker = ({name,onTrue,onFalse})=>(
        <div>
            <h1>is {name} your name?</h1>
            <button onClick={onTrue}> yes</button>
            <button onClick={onFalse}> no</button>
        </div>
    )

//same as doing ,
const NameCheckerB = (props)=>{
    const (name,onTrue,onFalse) = props
    return(
        <div>
            <h1>is {name} your name?</h1>
            <button onClick={onTrue}> yes</button>
            <button onClick={onFalse}> no</button>
        </div>
    )
}
```

stateful props
- if it gets props and is a full component, remember to call super with the props
```
export default class IsArtemApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:"Artem"
            isArtem:null
        }
    }
    //you dont nessisarily need to make an entirely new class method for every button. Use higher order functions to make your life easier and your state controllers more concise
    onCheckName = (answerType)=> (clickEvent)=> this.setState({isArtem:answerType});
    render() = ()=>(
        <div>
            <IsArtem answer={this.state.isArtem}/>
            <NameCheckerC name={this.state.name} onClick={onCheckName}>
        </div>
    )
}

const NameCheckerC = ({name,onClick})=> (
        <div>
            <h1>is {name} your name?</h1>
            <button onClick={onCLick("True")}> yes</button>
            <button onClick={onCLick("False")}> no</button>
        </div>
    )
const IsArtem = ({answer = "who knows"})=> <h1>is this artem? - {answer}</h1>


2 quick note
```
* mapping through components
- you can put an array of components inside of jsx like so: <..>{arrayOfComponents}</> . You often see something like names.map(name=><h1 key={name}>{name}</h1>), where map returns an array of components based on something else. 
- need keys unique to the content of the element. Do not use the interator position, as this is unque to the array position which is likely to change for the same content. If you have an array of components displaying names, each name should recieve the same key regardless of what other components are rendered from the array.   
- - this is a side affect of reacts magic rendering system. It creates its own light weight version of the dom using component and key names to determine which actual HTMLDomElements need to be re rendered. if the components and the keys stay the same it will not rerender. If the keys get duplicated or improperly switched you may see odd results. 
```
const NameCheckerB = ({componentArray, valueArray})=>{
    return(
        <div>
            {valueArray.map(value=>(
                <div key=value>{value}</div>
            )}
            {componentArray}
        </div>
    )
}

```

higher order Components
```
```


now we have a IsArtemApp component with a state model that renders one component with an injected event handler that modifies its state and another component that renders its state. This is a very common react pattern. the IsArtemApp component is clean since it is purely a mix of state, controllers and other components. Since functionality that affects more than what any component manages itself has to be injected in in the form of handlers or state every component is fundimentally easy to to test

One weakness of this system is that as you add functionality to any app the flow of handlers and what state they change will get more and more chaotic. More importantly as you add other components in the mix you will inveriably run into this issue:

```
<div>
    <div>
            <div>{results of isArtemQuestion}</div>
    </div>

    <footer>
        <IsArtem/>
    </footer>
</div>
```
how do you get state from IsArtem to a component that is sideways to it in the reactDom tree? Standard react strategy would be to wrap everything in another component and lift IsArtems state up to that component. Over time this leads to difficult to debug chains of handlers and frequent massive refactors to lift up state from components you did not expect to have to.

Redux solves both problems of chaotic state management and prop drilling. Redux is not a mvc pattern, but flux. The principle idea behind the flux archetecture relative to MVC is to create a uni directional flow of control. Instead of data going back and forth from model to controller to view to controller to model. Flux achieves this by splitting a controller into two, Actions which atomic http-like requests to change state, and reducers which respond to actions and change state accordingly. views get rendered from state with handlers that dispatch actions, reducers get actions and change state, views get rendered with handlers that dispathc actions. 
 
 
redux provides a simple higher order component that given a fuction to resolve data and functions from the store it can wrap around your regular react component and inject redux state in as props:
```
```

reducers

actions

state init

the state is created at the beginning of the app along with the store, it is a simple js object (a hashmap). Redux is configured with a group of reducers for it to use 


