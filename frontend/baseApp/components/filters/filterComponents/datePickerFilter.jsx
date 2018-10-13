import React from "react";
import TimePicker from 'react-time-picker';
import {dateFilter} from '../../../util/filters'
import Datetime from 'react-datetime';
import getActives from '../util/getActivesFromFilters'

export default class DatePickerFilter extends React.Component{
    constructor(props){
        super(props)
        this.state= {}
    }
    handleDateChange(dateType){
        return function(date){
            const state = Object.assign({},this.state);
            state[dateType] = date;
            this.setState(state);
            const filter = state.startDate || state.endDate ? dateFilter(state.startDate,state.endDate) : null
            this.props.setFilter(filter)
        }
    }
    handleChangeTime(period){
        return function(date){
            const thisState = Object.assign({},this.state[period])
            thisState[period] = date;
            this.setState(thisState);
        }
    }
    clearTime(period){
        return function(date){
            const thisState = Object.assign({},this.state[period])
            thisState[period] = null;
            this.setState(thisState);
            this.props.setFilter(null,dateFilter.type)
        }
    }
    render() {
        const {filtered,data,filter} = getActives(this.props.selectObjs,dateFilter.type)
        const dateValues = data? {startDate:data.smaller, endDate:data.bigger} : {};
        const activeClass = (this.state.startDate || this.state.endDate)  ? filtered > 0 ? "activeFilter" : "activeFilter-empty" : ""
        return (
            <section className={`calendar flex-row  ${activeClass}`}>
                {/*<button onClick={this.clearTime("startDate").bind(this)}> clear</button>*/}
                <div className={`flex-row `}>
                    <h1>Start Date</h1>
                    <div  className={`flex-row `}>
                        <Datetime  className={`leftDate`} value={filter? dateValues.startDate : null} onChange={this.handleDateChange("startDate").bind(this)}/>
                        <div className={"calIcon"}>
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                    </div>

                </div>
                <div className={`flex-row `}>
                    <Datetime  className={`rightDate`} value={filter? dateValues.endDate : null} onChange={this.handleDateChange("endDate").bind(this)}/>
                    <h1>EST</h1>
                </div>
                {/*<button onClick={this.clearTime("endDate").bind(this)}> clear</button>*/}
            </section>
        );
    }
}
function getDateFilterValues(data){
    return data? {startDate:data.smaller, endDate:data.bigger} : undefined
}