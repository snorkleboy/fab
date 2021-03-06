import DropDownFilter from "UILibrary/filterComponents/dropDownFilterer";

module.exports = {
    "Site Profile":[
        {component:DropDownFilter,props:{keys:{'Name':"Location name"}}},
        {component:DropDownFilter,props:{keys:{'OpenTime':"Site Open Time"}}},
    ],
    "Geography":[
        {component:DropDownFilter,props:{keys:{'Country':"Country"}}},
        {component:DropDownFilter,props:{keys:{'State':"State"}}},
        {component:DropDownFilter,props:{keys:{'City':"City"}}},
        {component:DropDownFilter,props:{keys:{'Zip':"Zip Code"}}},
    ]
}



