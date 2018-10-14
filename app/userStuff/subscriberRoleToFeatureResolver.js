const {subscribers,roles} = require( './data')
const filterSchemas = require("../../frontend/features/filters/schemas/schemas")
const features = []
const map = {};

const resolver = (subscriber,role)=>{
    try {
        return map[subscriber][role]
    }catch(e){
        console.log("feature resolve error",{e})
    }
}

subscribers.forEach(s=>{
    map[s] = {}
    roles.forEach(r=>map[s][r] = {})
})
map[subscribers[0]][roles[0]]  = {

}
map[subscribers[0]][roles[1]]  = {
    "tabberView":[
        {path:"list/listContainer.js",props:{}},
    ],

}
map[subscribers[0]][roles[2]]  = {
    "tabberView":[
        {path:"list/listContainer.js",props:{}},
        {path:"list/listContainer.js",props:{}}
    ],

}

map[subscribers[1]][roles[0]]  = {
    "tabberView":[
        {path:"list/listContainer.js",},
        {path:"filters/filterButtonsContainer.js",props:{schema:{...filterSchemas.defaultSchema,...filterSchemas.bvSchema}}}
    ]
}
map[subscribers[1]][roles[1]]  = {
    "tabberView":[
        {path:"filters/filterButtonsContainer.js",props:{schema:{...filterSchemas.defaultSchema,...filterSchemas.weatherSchema,...filterSchemas.bvSchema}}}
    ]
}
map[subscribers[1]][roles[2]]  = {
    "tabberView":[
        {path:"list/listContainer.js",props:{}},
        {path:"filters/filterButtonsContainer.js",props:{schema:{...filterSchemas.defaultSchema}}}
    ]
}

map[subscribers[2]][roles[0]]  = {
    "tabberView":[
        {path:"list/listContainer.js",props:{}},
        {path:"filters/filterButtonsContainer.js",props:{schema:{...filterSchemas.defaultSchema}}}
    ]
}
map[subscribers[2]][roles[1]]  = {
    "tabberView":[
        {path:"list/listContainer.js",props:{}},
    ],
}
map[subscribers[2]][roles[2]]  = {
    "tabberView":[
        {path:"list/listContainer.js",props:{}},
        {path:"filters/filterButtonsContainer.js",props:{schema:{...filterSchemas.defaultSchema,...filterSchemas.weatherSchema}}}
    ]
}
module.exports = resolver;