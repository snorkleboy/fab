const bvSchema = require("./bvschema");
const weatherSchema = require("./weatherSchema");
const defaultSchema = require("./filterSchema");

module.exports = [
    {name:"Weather",props:{schema:weatherSchema}},
    {name:"BVFilters",props:{schema:bvSchema}},
    {name:"Default",props:{schema:defaultSchema}}
    
]
    