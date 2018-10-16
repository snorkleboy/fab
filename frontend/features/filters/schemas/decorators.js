import bvSchema from"./bvschema";
import weatherSchema from "./weatherSchema";
import defaultSchema from"./filterSchema";
import {featuresRegistrations} from "Feature";

const featureName = featuresRegistrations.filterNames.filters;
const decoratorNames = featuresRegistrations[featureName];
export default [
    {name:decoratorNames.Weather,props:{schema:weatherSchema}},
    {name:decoratorNames.BVFilters,props:{schema:bvSchema}},
    {name:decoratorNames.Default,props:{schema:defaultSchema}}
]
    