import React from "react";

import * as filters from '../../../util/filters';
import * as filterSeries from '../../../util/staticFilters';
import filterFactory from "../../../util/filterFactory";
import getActives from "../util/getActivesFromFilters";


export default class checkBoxFilter extends React.Component{
    constructor(props){
        super(props)
    }
    onClick(e){
        const filter = filters.staticFilter(this.props.filterName,this.props.seriesName,[this.props.filterSeriesName])
        if (e.target.checked){
            this.props.setFilter(filter);
        }else{
            this.props.unsetFilter(filter);
        }
    }
    render(){
        let {data,filter,filtered} = getActives(this.props.selectObjs,this.props.filterName)
        return(
            <div className={"flex-row checkbox"}>
                <input type="checkbox" checked={filter} onClick={this.onClick.bind(this)}/>
                <h2>{this.props.displayName}</h2>
            </div>
        )
    }
}
