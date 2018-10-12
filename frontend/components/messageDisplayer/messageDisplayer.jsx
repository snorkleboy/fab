import React from 'react';
import ReactDom from 'react-dom'
import style from './messageDisplayer.scss'
import Message from './Message'
export default class messageDisplayer extends React.Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.clearTimeoutes = this.clearTimeoutes.bind(this);
        this.transitionNewMessage = this.transitionNewMessage.bind(this);
        this.disappear = this.disappear.bind(this);

    }
    componentDidMount(){
        if (this.props.messageObj) {
            this.transitionNewMessage(this.props.messageObj);
        }
    }
    
    componentWillUnmount(){
        this.clearTimeoutes()
    }
    shouldComponentUpdate(newProps){
        if (newProps.messageObj && (!this.props.messageObj || newProps.messageObj.msg !== this.props.messageObj.msg || newProps.messageObj.internalMessage !== this.props.messageObj.internalMessage)){
            this.clearTimeoutes()
            this.transitionNewMessage(newProps.messageObj)
        }
        return true;
    }
    transitionNewMessage(messageObj){
        const that = this;
        if (!that.myRef.current.classList.contains("notVisible")){
            that.myRef.current.classList.add("notVisible")
        }
        if(that.myRef.current.classList.contains("displayNone")){
            that.myRef.current.classList.remove("displayNone");
        }

        this.comeIn = setTimeout(()=>{that.myRef.current.classList.remove("notVisible");},0);
        if (messageObj.timeToLive){
            that.disappear(messageObj);
        }
    }
    disappear(messageObj){
        const that = this;
        function diss(){
            return new Promise((res)=>{
                that.comeOut = setTimeout(
                    ()=>{that.myRef.current.classList.add("notVisible"); res()},
                    messageObj.timeToLive*1000
                );
            })
        }
        diss().then(()=>that.comeOut = setTimeout(()=>that.myRef.current.classList.add("displayNone"),1000))
    }
    clearTimeoutes(){
        clearTimeout(this.comeIn);
        clearTimeout(this.comeOut);
    }
    
    render(){
        const msgObj = this.props.messageObj
        return(
            <div ref={this.myRef} className={"messageContainer notVisible"}>
                {msgObj?<Msg msgObj={msgObj} disappear={this.disappear}/> :null}
            </div>
        )
        
    }
}
const Msg = ({msgObj,disappear})=>{
    return (
        <div className={`${msgObj.type} flex-row ${msgObj.dev? "dev" : ""}`}>
            <h1>{msgObj.msg}</h1>
            <DisappearButton msgObj={msgObj} disappear={disappear}/>
        </div>
    )
}

const DisappearButton = ({msgObj,disappear})=>!msgObj.timeToLive?
    (
        <button className={"disappear"} onClick={disappear}>
            <i className="fa fa-times" aria-hidden="true"></i>
        </button>
    )
:
    null