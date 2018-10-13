import React from "react";

import * as lodash from 'Lodash';
import * as filters from '../../../util/filters';
import * as filterSeries from '../../../util/staticFilters';
import { Dropdown, Search,Item } from 'semantic-ui-react'
import getActives from '../util/getActivesFromFilters'

//todo use values from staticfilters.js instead of hardcoding these.                                     
const typeOptions = [
    {key:"snow and ice",value:"both",text:"snow and ice"},
    {key:"snow",value:"snow",text:"snow"},
    {key:"ice",value:"ice",text:"ice"},
]


export default class PrecipitationFilter extends React.Component{
    constructor(props){
        super(props)
        const thisFilter = this.props.selectObjs.find(filter=> filter.type === this.props.filterName);
        this.state = {
            type: "both"
        }
    }
    onChangeRange(e,obj){
        const value = obj.value
        if (value){
            const filter = filters.precipitationFilter(this.state.type,value,this.props.filterName)
            this.props.setFilter(filter,this.props.filterName)
        }else{
            this.props.setFilter(null,this.props.filterName)
        }

    }
    onChangeType(e,obj){
        const type = obj.value
        if (this.state.range){
            const filter = filters.precipitationFilter(value,this.state.range,value)
            this.props.setFilter(filter,this.props.filterName)
        }
        this.setState({type})

    }
    clear(){
        this.setState({range:null})
        this.props.unsetFilter({type:this.props.filterName, filterType:"staticFilter"})
    }
    optionObjFactory(key){
        return {
            key:key,value:key,text:key
        }
    }

    render(){
        const {filtered,data,filter} = getActives(this.props.selectObjs,this.props.filterName)
        let active = Boolean(filtered);
        const filterRanges = filterSeries['snowAndIceFilters'];
        const options = Object.keys(filterRanges).map((filterRange)=>this.optionObjFactory(filterRange))
        return(
            <div className={"dropdownFilter locationFilter precipitationFilter"}>
                <div>
                    <Dropdown
                        value={filter? filter.data.seriesNames[0]:null}
                        fluid
                        selection
                        options={options}
                        placeholder={"Choose Weather Condition Ranges"}
                        onChange={this.onChangeRange.bind(this)}
                        className= {filter ? active ? "activeFilter" : "activeFilter-empty" : null}
                        closeOnBlur
                        />
                    <Dropdown
                        value={this.state.type}
                        fluid
                        selection
                        options={typeOptions}
                        onChange={this.onChangeType.bind(this)}
                        closeOnBlur
                    />
                </div>
            </div>
        )
    }
}
