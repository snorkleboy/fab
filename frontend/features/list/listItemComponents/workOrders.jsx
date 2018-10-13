import React from 'react';
import ReactDom from 'react-dom'
import {
    sortWorkOrders,
    workOrdersStatusMap,
    makeWorkOrderStatusValues,
    makeWorkOrderIcon,
    getWorkOrderStatusArr,
} from "../../../../../util/workOrder";
import Poster from '../../workOrderPoster/poster';
import WorkOrder from './workOrder'
export default class Workorders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }

    }
    onExpand(e) {
        this.setState({
            expanded: !this.state.expanded
        })
    }
    shouldComponentUpdate(newProps){
        if(newProps.location.Id !== this.props.location.Id){
            this.setState({
                expanded: !this.state.expanded
            })
        }
        return true;
    }
    render() {
        const location = this.props.location;
        const filters = this.props.filters;
        const sortValues = makeWorkOrderStatusValues(filters);
        let workOrderArr=Object.values(location.Workorders)
        workOrderArr = sortWorkOrders(workOrderArr,sortValues);
        const selectedStatusArr = getWorkOrderStatusArr(filters);
        const {selected,rest} = splitWorkOrders(workOrderArr,selectedStatusArr);
        const props = this.props;
        return (
            location.Workorders && Object.keys(location.Workorders).length > 0 ?
                <span className="flex-row">
                    <span >
                        <ul className="flex-column">
                            {makeWorkOrders(selected)}
                        </ul>
                        <div className="devider flex-row">
                            <div></div>
                            {Object.keys(location.Workorders).length > 1 ?
                                <i className={`fas fa-chevron-${this.state.expanded ? "up" : "down"}`}
                                   onClick={this.onExpand.bind(this)}></i>
                                :
                                null
                            }
                            <div></div>
                        </div>
                        {this.state.expanded?
                            <ul className="flex-column">
                                {makeWorkOrders(rest)}
                            </ul>
                            :
                            null
                        }
                    </span>
                    <div className={this.state.expanded? "scrollBarInfoWindowFix-smaller" : "scrollBarInfoWindowFix"}/>
                </span>
                    
                :
                    null

        )
    }
}
const makeWorkOrders = (Workorders)=> Workorders.map((wo,i)=> <WorkOrder wo={wo} i={i}/> )
function splitWorkOrders(wos,splitStatusArr){

    const selected = [];
    const rest = [];
    if(wos.length === 0){
        return {selected,rest}
    }
    wos.forEach(wo=>{
        if (splitStatusArr.includes(wo.status)){
            selected.push(wo);
        }else{
            rest.push(wo);
        }
    })
    if (selected.length === 0 ){
        selected.push(rest.shift());
    }
    return {selected,rest}
}

