import  {
    DropDownFilter,
    PrecipitationFilter,
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

    "Site Profile":[
        {component:DropDownFilter,props:{keys:{'Name':"Location name"}}},
        {component:DropDownFilter,props:{keys:{'OpenTime':"Site Open Time"}}},
        {component:DropDownFilter,props:{keys:{'TriggerValue':"Triggers"}}},

    ],
    "Geography":[
        {component:DropDownFilter,props:{keys:{'Country':"Country"}}},
        {component:DropDownFilter,props:{keys:{'State':"State"}}},
        {component:DropDownFilter,props:{keys:{'City':"City"}}},
        {component:DropDownFilter,props:{keys:{'Zip':"Zip Code"}}},
    ]
}



