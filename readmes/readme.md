react is a rendering and state management system.

there is one rule and two guidelines
1) Never directly mutate state, use setState(modifiedCopyOfPreviousState) or setState({sameKey:{sameKey:"new value"}})
- - most standard methods of cloning an object in javascript are shallow, be vigilant when creating nested objects in state and updating them or changes to state will unpredictably not be rendered. 
a) if you are considering modifying the dom directly reconsider it atleast once. You can probably turn something into a managed component and achieve the same affect.
b) pay attention to unique key warnings. The potential bugs from that are generally not worth the cost

React follows a MVC pattern in a component based framework. Every component has managed state as its model, some event handlers that act as controllers, and views that render based on state. Every component can render other components and inject 'props'. These props can be anything, another components state, event handlers, even other components. 

tech primer-
react uses JSX. We use es16+ js. You can use sass to style programatically. You can use jest to test.  You need webpack to transform and bundle the code into something a browser can execute.

basic 
stateless components without props
- pure functions(stateless)

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
const NameChecker = ({name,onTrue,onFalse})=>(
        <div>
            <h1>is {name} your name?</h1>
            <button onClick={onTrue}> yes</button>
            <button onClick={onFalse}> no</button>
        </div>
    )

//same as doing to 
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


two more quick notes
```
* mapping thing
- need keys unique to the content of the element. Do not use the interator position, as this is unque to the array position which is likely to change for the same content. 
- this is a side affect of reacts magic rendering system. It creates its own light weight version of the dom using component and key names to determine which actual HTMLDomElements need to be re rendered. if the components and the keys stay the same it will not rerender. If the keys get duplicated or improperly switched you may see odd results. 
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

* render children
```
const Wrapper = ({children})=>{
    return(
        <div>
            {children}
        </div>
    )
}
const Basic = ()=><h1>"hello"</h1>;'
return
<Wrapper>
    <Basic>
    <Basic>
</Wrapper>
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
how do you get state from IsArtem to a component that is sideways to it in the reactDom tree? 

putting shared state in a global scope object that you modify willy nilly:0
making a singleton object with getters and setters that can be imported : 1
wrapping everything in a single component that injects its state and handlers into components beneath it:2
wrapping everything in a component that accesses a singleton object and can inject state and handlers into any component: 99


