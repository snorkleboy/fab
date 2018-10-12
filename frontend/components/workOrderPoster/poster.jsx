import React from "react";
import { Dropdown } from 'semantic-ui-react'
import Datetime from 'react-datetime';
import Style from './poster.scss'
import UIMessage from "../messageDisplayer/Message";
import {validator,validatations} from '../../util/validator'


//not done as a react component mostly for timesake 
function Input(key,validations,displayName){
    this.key = key;
    this.errorKey = key+"error";
    this.validations = validations;
    this.displayName = displayName;
    this.errorCheckToCss = (state)=>state[key+"error"]? "input-error" : ""
}
const inputs = {
    CallerName:new Input("CallerName", [validatations.requried],"Caller*"),
    passes:new Input("passes", [],"Passes"),
    predictedHours:new Input("predictedHours",[],"Predicted Hours"),
    ScheduledDate:new Input("ScheduledDate",[validatations.requried,validatations.date,validatations.dateAfterToday],"Schedule Date*"),
    area:new Input("area",[validatations.requried],"Area*"),
    task:new Input("task",[validatations.requried],"Task*")
}
var valid = function( current ){
    return current.isAfter(  Datetime.moment().subtract( 1, 'day' ) );
};

export default class Poster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        Object.values(inputs).forEach(input=>{
            this.state[input.key] = "";
            this.state[input.errorKey]=false;
        })
        this.post = this.post.bind(this);
        this.submit = this.submit.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }
    shouldComponentUpdate(){
        return true;
    }
    submit(e){
        const results = validator(this.state,inputs);
        if(!results._error){
            this.post();
        }else{
            this.setState(results);
        }
    }
    post(e) {
        const woArr = this.props.locations.map(loc => {
            const woCopy = {};
            woCopy.lid = loc.Id;
            woCopy.CallerName = this.state.CallerName;
            woCopy.passes = this.state.passes;
            woCopy.predictedHours = this.state.predictedHours;
            woCopy.ScheduledDate = this.state.ScheduledDate;
            woCopy.area = this.state.area;
            woCopy.task = this.state.task;

            return woCopy;
        })
        this.props.post(woArr)
            .then((res) => {
                this.props.close();
                return res
            })
            .then((res) => {
                res.json()
                .then(result => {
                    if (res.status != 200) {
                        this.props.setMessage(new UIMessage(` Error: ${result.Error}  `, UIMessage.MessageTypes.errorMessage, 15))
                    }
                    else {
                        this.props.setMessage(new UIMessage(` WorkOrder Id : ${result.WorkOrderId} and Note Id : ${result.NoteId} `, UIMessage.MessageTypes.systemMessage, 15))
                    }
                })
            })
    }
    onChangeDate(key){
        const that = this;
        return function(moment){
            const obj = {};
            obj[key] = moment;
            obj[key+'error'] = false;
            that.setState(obj);
        }
    }
    handleChange(key, prevalidateRegex) {
        const that = this;
        return function(e,val){
            const value = e.target.value || (val? val.value : "");
            if (!prevalidateRegex || (prevalidateRegex && prevalidateRegex.test(value)) ){
                const obj = {};
                obj[key] = value;
                obj[key+'error'] = false;
                that.setState(obj);
            }
        }
    }
    render() {
        const locationData = this.props.locations.length === 1?
            (
                <span className="locationSummary">
                    <div><b>{this.props.locations[0].Name}</b></div>
                    <div>{this.props.locations[0].Address1}</div>
                    <div>{this.props.locations[0].City},{this.props.locations[0].State}|{this.props.locations[0].Zip}</div>
                </span>
            )
        :
            (
                <span>
                    {this.props.locations.length} locations selected
                </span>
            )  
        
        const cancelButton = this.props.close? 
                <button onClick={this.props.close} className="cancel">Cancel</button>
            :
                null
        const closeButton = this.props.close?
            <div onClick={this.props.close} className={"flex-row close"}>
                <button  >CLOSE</button>
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
            :
                null;
            
        return (
            <section className="workOrderPoster">
                <div className={"flex-row header"}>
                    <h1>Schedule Work Order</h1>
                    {closeButton}
                </div>
                <div className={"options flex-row"}>
                    <div >
                        
                        <div className={"doubleColumn padding-5px"}>
                            <h1 className="column1">Location Number*</h1>
                            <input type="text" readOnly={true} value={this.props.locations[0].Id} className="column2" />
                        </div>
                        
                        <div className={"doubleColumn padding-5px " + inputs.CallerName.errorCheckToCss(this.state)}>
                            <h1 className="column1">{inputs.CallerName.displayName}</h1>
                            <input type="text" onChange={this.handleChange(inputs.CallerName.key)} value={this.state[inputs.CallerName.key]} className="column2" />
                            {displayError(this.state,inputs.CallerName.errorKey)}
                        </div>
                        
                        <div className={"doubleColumn padding-5px " + inputs.passes.errorCheckToCss(this.state)}>
                            <h1 className="column1">{inputs.passes.displayName}</h1>
                            <input type="text" onChange={this.handleChange(inputs.passes.key,new RegExp('^[0-9]*$'))} value={this.state[inputs.passes.key]} className="column2" />
                            {displayError(this.state,inputs.passes.errorKey)}
                        </div>
                        
                        <div className={"doubleColumn padding-5px " + inputs.predictedHours.errorCheckToCss(this.state)}>
                            <h1 className="column1">{inputs.predictedHours.displayName}</h1>
                            <input type="text" onChange={this.handleChange(inputs.predictedHours.key,new RegExp('^[0-9]*$'))} value={this.state[inputs.predictedHours.key]} className="column2" />
                            {displayError(this.state,inputs.predictedHours.errorKey)}
                        </div>
                        
                        <div className={"doubleColumn padding-5px " + inputs.ScheduledDate.errorCheckToCss(this.state)}>
                            <h1 className="column1">{inputs.ScheduledDate.displayName}</h1>
                            <div className={`flex-row `}>
                                <Datetime   input={true} closeOnSelect={true} isValidDate={valid} onChange={this.onChangeDate(inputs.ScheduledDate.key)} value={this.state[inputs.ScheduledDate.key]} className="column2"/>
                                <div className={"calIcon"}>
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                            </div>
                            {displayError(this.state,inputs.ScheduledDate.errorKey)}
                        </div>    
                        
                        <div className={"doubleColumn padding-5px " + inputs.area.errorCheckToCss(this.state)}>
                            <h1 className="column1">{inputs.area.displayName}</h1>
                            <Dropdown onChange={this.handleChange(inputs.area.key)} placeholder={"Select Area"} value={this.state[inputs.area.key]} className="column2" fluid selection labeled options={areaOptions}/>
                            {displayError(this.state,inputs.area.errorKey)}
                        </div>
                        
                        <div className={"doubleColumn padding-5px " + inputs.task.errorCheckToCss(this.state)}>
                            <h1 className="column1">{inputs.task.displayName}</h1>
                            <Dropdown onChange={this.handleChange(inputs.task.key)} placeholder={"Select Task"} value={this.state[inputs.task.key]} className="column2" fluid selection labeled options={taskOptions}/>
                            {displayError(this.state,inputs.task.errorKey)}
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div className="buttons padding-5px flex-row">
                        {cancelButton}
                        <button onClick={this.submit} className="create">Schedule</button>
                    </div>
                </div>
            </section>
        )
    }
}

const displayError = (state,key)=> {
    return state[key] ?
        <h1 className={"errorMsg"}>{state[key]}</h1>
        :
        null
}

const makeOptions = (string)=>({key:string,value:string,text:string})


const taskOptions = [
    makeOptions("Stacking"),
    makeOptions("Hauling"),
    makeOptions("Misc"),    
    makeOptions("Back-up Work"),
    makeOptions("Salt"),
    makeOptions("Plow"),
    makeOptions("Calcium Application"),
    makeOptions("Pre Salt"),
    makeOptions("Partial Salt"),  
    makeOptions("Partial Plow"),
    makeOptions("Shovel")
]

const areaOptions = [
    makeOptions("Exterior")    
]


