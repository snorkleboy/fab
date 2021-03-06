import React from "react";

import CollapsibleLabel from 'UILibrary/uiHOCs/collapsibleFilterLabel/CollapsibleFilterLabel'
import style from './filters.scss'
import dateStyle from './datepicker.scss'
import {DropDownFilter, PrecipitationFilter} from "UILibrary/filterComponents/filterComponents"
const componentMap =  {
    PrecipitationFilter:PrecipitationFilter,
    DropDownFilter:DropDownFilter
};

const maxItemsInDropdown = 15;
export default class FilterButtons extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const componentMap = this.props.schema;
        return(
            <section className="mainFilters leftMenuHeight greyBackground scrollable grid-row">
                {Object.keys(componentMap).map(displayName=>{
                    const entries = componentMap[displayName]
                    return (
                        <span id={displayName.replace(/ /g,"")}>
                            <CollapsibleLabel label={displayName}>
                                {entries.map(entry=>{
                                    const Component = entry.component
                                    return (
                                        <Component
                                            selectObjs={this.props.selectObjs}
                                            locations={this.props.locationArr}
                                            setFilter={this.props.setFilter}
                                            unsetFilter={this.props.unsetFilter}
                                            maxItemsInDropdown={maxItemsInDropdown}
                                            {...entry.props}
                                        />
                                    )
                                })}
                            </CollapsibleLabel>
                        </span>
                    )
                })}
            </section>
        )
    }
}
