import {actionTypes} from "./redditActions"
import {asFeaturePartial, featurePoints} from "Feature";

const _redditReducer = ()=>({
    list:[],
    subreddit:"all",
    type:"hot"
})
const redditReducer = (state = _redditReducer(),action)=>{
    const newState = Object.assign({},state);
    console.log({state,action,actionTypes});
    switch (action.type){
        case actionTypes.receiveRedditList:
            console.log({action});
            const list = action.payload.data.children.map(child=>({
                author:child.data.author,
                sub:child.data.subreddit,
                thumbnail:child.data.thumbnail,
                title:child.data.title,
                url:child.data.url,
                score:child.data.score
            }))
            newState.list = list;
            return newState;
        case actionTypes.changeRedditType:
            newState.type = action.payload;
            return newState;
        case actionTypes.changeSubReddit:
            newState.subreddit = action.payload;
            return newState;
        default:
            return state
    }
}

export default asFeaturePartial(featurePoints.registerReducers,"reddit")(redditReducer)
