import myComponent from "./myComponent"
import{asFeaturePartial,featurePoints} from "Feature";

export default [
    asFeaturePartial(featurePoints.Main)(myComponent)
]