const MessageTypes ={
    "errorMessage":"errorMessage",
    "systemMessage":"systemMessage"
}
export default function Message(msg,type,timeToLive=5, internalMessage){
    this.msg = msg;
    this.timeToLive = timeToLive;
    if (!Object.keys(MessageTypes).includes(type)){
        console.warn("unknown message type")
    }
    this.type = type;
    this.internalMessage = internalMessage;
}
Message.MessageTypes = MessageTypes;
Message.dissconnectMessage = ()=>new Message("Connection error: contact your system administrator",Message.MessageTypes.errorMessage,0);