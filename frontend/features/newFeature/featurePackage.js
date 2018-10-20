import {asFeaturePartial, featurePoints} from "Feature";

const component = ()=>"this is a react component"
const anotherComponent = ()=>"also a react component"
export default [
    asFeaturePartial(featurePoints.tabberView,"name in tab")(component),
    asFeaturePartial(featurePoints.Main,"not named")(anotherComponent),
];