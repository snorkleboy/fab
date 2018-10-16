
export const actionTypes = {
    'receiveFeaturePackages':"RECEIVE_FEATURE_PACKAGES",
    
}
export const receiveFeaturePackages = (featurePackages)=>({
    payload:featurePackages,
    type:actionTypes['receiveFeatures']
})
