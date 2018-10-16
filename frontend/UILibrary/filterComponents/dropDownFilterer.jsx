import React from "react";
import { Dropdown, Search,Item } from 'semantic-ui-react'
import * as lodash from 'lodash';
import Fuse from 'fuse.js'
import filterFactory from "util/filterFactory";
import {dateFilter} from "util/filters";
import getActives from "util/getActivesFromFilters";
var fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "text"
    ]
};
let maxItemsInDropdown = 10;
export default class DropDownFilter extends React.Component{
    constructor(props){
        super(props)
        maxItemsInDropdown = this.props.maxItemsInDropdown || maxItemsInDropdown;
        this.state = {searchQuery:false};
    }
    changeFormState(key){
        const that = this;
        return function(e,obj){
            const newState = {}
            newState[key]=obj.value
            const filterName = filterNamer(key)
            const data = {data:newState[key],key};
            const filter = filterFactory.make("includesFilter",filterName,data);
            if (newState[key].length>0){
                that.props.setFilter(filter)
            }else{
                that.props.unsetFilter(filter);
            }
        }
    }
    handleSearchChange(event,data){
        this.setState({searchQuery:data.searchQuery},);
    }
    render(){
        return(
            <div className={"dropdownFilter"}>
                {Object.keys(this.props.keys).map(key=>(
                    <DropDownWrapper
                        name={this.props.keys[key]}
                        locKey={key}
                        locations={this.props.locations}
                        searchquery={this.state.searchQuery}
                        filters={this.props.selectObjs}
                        handleSearch={this.handleSearchChange.bind(this)}
                        onChange={this.changeFormState.bind(this)}
                        
                    />
                ))}
            </div>
        )
    }
}
const DropDownWrapper = ({locKey,name,locations,searchquery,filters,handleSearch,onChange})=>{
    {
        const key = locKey;
        let {data,filter} = getActives(filters,filterNamer(key))
        if (!data) data = [];
        const options = getOptionsFromLocations(locations,data,key);

        let optionsSlice;
        if (!searchquery){
            optionsSlice = options[key]
        }else{
            const fuse = new Fuse(options[key], fuseOptions);
            optionsSlice = fuse.search(searchquery)
        }

        optionsSlice = optionsSlice
            .slice(0,maxItemsInDropdown)
            .concat(data.map(val=>optionObjFactory(val,false)));

        return  (
            <div id={key+"dropdown"} key={key+"dropdown"} >
                <Dropdown
                    key={key}
                    fluid
                    multiple
                    selection
                    search
                    placeholder={name}
                    onSearchChange={handleSearch}
                    lazyLoad={true}
                    onChange={onChange(key)}
                    options={optionsSlice}
                    value={data}
                    renderLabel={renderLabel}
                    closeOnBlur
                />
            </div>
        )
    }
}
export function getOptionsFromLocations(locations,values=[],key){
    const options = {}
    options[key]={};

    locations.forEach(location=>{
        const value = location[key]
        options[key][value] = optionObjFactory(value,true)
    })
    values.forEach(value=>{
        const seen = options[key][value]? true : false;
        options[key][value] = optionObjFactory(value,seen)
    })
    options[key] = Object.values(options[key]).sort(sortOpts);
    return options
}




const filterNamer =(key)=>(key+"filter");

function optionObjFactory(value, active = true){
    return {
        key:(value),value:value,text:value,active
    }
}
const renderLabel = label => ({
    color:label.active ? "activeFilter" : "activeFilter-empty",
    content: label.text,
})


function sortOpts(a,b){
    const vala = parseFloat(a.text);
    const valb = parseFloat(b.text);
    let compare = 0;
    if (Number.isNaN(vala) || Number.isNaN(valb)){
        compare = a.text === b.text? 0 : a.text > b.text ? 1 : -1
    }else{
        compare = vala === valb ? 0 : vala > valb ? 1 : -1
    }
    return compare;
}