import bvSchema from"./bvschema";
import weatherSchema from "./weatherSchema";
import defaultSchema from"./filterSchema";
import decoratorNames from "../decorators.json"

export default [
    {name:decoratorNames.Weather,props:{schema:weatherSchema}},
    {name:decoratorNames.BVFilters,props:{schema:bvSchema}},
    {name:decoratorNames.Default,props:{schema:defaultSchema}}
]
    