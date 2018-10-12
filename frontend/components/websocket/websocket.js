import React from "react";
import * as filters from "../../util/filters"
import {ensure} from "../../../util/translateAPI";
import * as actions from '../../store/actions/mapActions/mapActions'
import UIMessage from '../messageDisplayer/Message' 
//import SockJS from "sockjs-client"
export default class Websocket extends React.Component{
    constructor(props){
        super(props)
        this.state={
            websocket:null
        }
        this.dissConnectMessage = UIMessage.dissconnectMessage;
    }

    componentDidMount(){
        this.makeSockets();
    }
    makeSockets(){
        return this.makeSocket()
            .then(websocket=>this.setState({websocket}))
          
    }
    render(){
        return <div style={{"display":"none"}}></div>
    }
    makeSocket(){
        return new Promise((resolve,rej)=>{
            
            const sock = new WebSocket(window.location.origin.replace(/http/,'ws') + `/ws/info/`)
            let num =0;
            const that = this;
            sock.onclose = function close(){
                setTimeout(()=>{
                    that.makeSockets()
                        .catch(()=>that.props.setMessage(that.dissConnectMessage()))
                },1500)
                
            }
            sock.onopen = ()=>{
                that.props.setDevMessage( new UIMessage("websocket connected",UIMessage.MessageTypes.systemMessage,5));
                sock.send(this.props.numberOfLocations)
                resolve(sock);
            }
            sock.onerror = (e)=>{
                that.props.setDevMessage(new UIMessage("websocket error",UIMessage.MessageTypes.systemMessage,5,e) );
                console.warn("websocket error",e)
            }
            sock.onmessage = this.handleMessage.bind(this)
        })
    }
    handleMessage(e) {
        const action = JSON.parse(e.data);
        this.props.dispatch(ensure(action));
    };
}

