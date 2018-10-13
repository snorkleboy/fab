import React from "react";

import * as lodash from 'Lodash';
import * as filters from '../../../util/filters';
import * as filterSeries from '../../../util/staticFilters';
import { Dropdown, Search,Item } from 'semantic-ui-react'
import getActives from "../util/getActivesFromFilters";

export default class DropDownStaticFilter extends React.Component{
    constructor(props){
        super(props);
    }
    changeFormState(e,obj){
        const filterNames = obj.value
        let filter;
        if (obj.value.length>0){
            filter = filters.staticFilter(this.props.filterName, this.props.seriesName,obj.value, true)
        }else{
            filter=null;
        }
        if(filter){
            this.props.setFilter(filter);
        }else{
            this.props.unsetFilter({type:this.props.filterName, filterType:"staticFilter"})
        }
    }
    render(){
        let {data,filter,} = getActives(this.props.selectObjs,this.props.filterName)
        const value = data? data.seriesNames :[];        
        const allFilters = filterSeries[this.props.seriesName];
        const options = Object.keys(allFilters).map((filterKey)=>optionObjFactory(filterKey,filter,allFilters[filterKey].iconUrl))
        return(
            <div className={"dropdownFilter"}>
                <Dropdown
                    fluid
                    multiple
                    selection
                    value={value}
                    onChange={this.changeFormState.bind(this)}
                    options={options}
                    placeholder={this.props.displayName}
                    renderLabel={renderLabel}
                    closeOnBlur
                />
            </div>
        )
    }

}
function optionObjFactory(key,existingFilter,iconUrl){
    let filtered;
    let active
    if (existingFilter){
        filtered = existingFilter.multiFilteredCounter[key];
        active =  existingFilter.data.seriesNames.includes(key) && filtered>0;
    }else{
        active = false;
    }

    filtered = filtered && filtered>0 ? filtered : 0
    const hasFiltered = Boolean(filtered>0)
    let text = key.replace(/_/g," ");
    if(hasFiltered){
        text+=" -[" + filtered+"]"
    }
    const obj = {
        key:key,value:key,text,active,
    }
    if (iconUrl){
        obj["image"]={ avatar: true, src: iconUrl }
    }
    return obj
}
const renderLabel = label => ({
    color:label.active ? "activeFilter" : "activeFilter-empty",
    content: <h1>{label.text}</h1>,
    image:label.image
})