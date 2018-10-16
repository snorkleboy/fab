
export const actionTypes = {
    'receiveFeaturePointToComponentMap':"RECIEVE_FEATUREPOINT_TO_COMPONENT_MAP",
}
export const receiveFeaturePointToComponentMap = (featurePackages)=>({
    payload:featurePackages,
    type:actionTypes['receiveFeaturePointToComponentMap']
})
