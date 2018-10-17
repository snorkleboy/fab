import {asFeaturePartial, featurePoints} from "Feature";

const component = ()=>"this is a react component"
const reducer = (state = {"newREDUCER":true},action)=>{
    const copy = Object.assign({},state);
    copy.thing= "thing";
    return copy;
}
const quickTest = [
    asFeaturePartial(featurePoints.HeaderMenu,"displayName")(component),
    asFeaturePartial(featurePoints.registerReducers,"newReducer")(reducer)
]
console.log({quickTest},JSON.stringify(quickTest));
export default quickTest;



