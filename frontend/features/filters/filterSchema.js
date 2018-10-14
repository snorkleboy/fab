import  {
    StaticDropDownFilterer,
    DropDownFilter,
    DatePicker,
    PrecipitationFilter,
    CheckboxFilter
} from "UILibrary/filterComponents/filterComponents";


export default {
    "Client":[
        {component:DropDownFilter,props:{keys:{'Client':"Choose Clients"}}}
    ],
    "Property Management":[
        {component:DropDownFilter,props:{keys:{'ManagementCompanyName':"Choose Property Management Companies"}}}
    ],
    "Weather Condition":[
        {component:PrecipitationFilter,props:{filterName:"precipitationFilter"}}
    ],
    "Work Order Status":[
        {component:StaticDropDownFilterer,props:{filterName:"workOrderFilter",seriesName:"staticWorkOrderFilters", displayName:"Choose Statuses"}}
    ],
    "Site Profile":[
        {component:DropDownFilter,props:{keys:{'Name':"Location name"}}},
        {component:DropDownFilter,props:{keys:{'OpenTime':"Site Open Time"}}},
        {component:DropDownFilter,props:{keys:{'TriggerValue':"Triggers"}}},
        {component:CheckboxFilter,props:{filterName:"TriggerFilter",seriesName:"staticTriggerFilters",filterSeriesName:"location trigger value exceeded", displayName:"Trigger Value Exceeded"}}

    ],
    "Geography":[
        {component:DropDownFilter,props:{keys:{'Country':"Country"}}},
        {component:DropDownFilter,props:{keys:{'State':"State"}}},
        {component:DropDownFilter,props:{keys:{'City':"City"}}},
        {component:DropDownFilter,props:{keys:{'Zip':"Zip Code"}}},
    ],
    "Start-End":[
        {component:DatePicker,props:{keys:{'country':"Country"}}}
    ],
}



