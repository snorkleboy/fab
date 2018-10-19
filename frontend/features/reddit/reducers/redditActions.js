export const actionTypes = {
    "receiveRedditList":"RECEIVE_REDDIT_LIST",
    "changeRedditType":"CHANGE_REDDIT_TYPE",
    "changeSubReddit":"CHANGE_SUB_REDDIT"
}
export const changeSubReddit = (payload)=>({
    payload,
    type:actionTypes.changeSubReddit
})
export const receiveRedditList = (payload)=>({
    payload,
    type:actionTypes.receiveRedditList
})
export const changeRedditType = (payload)=>({
    payload,
    type:actionTypes.changeRedditType
})

export const getRedditAction = (subreddit,type)=>(dispatch)=>fetch(`https://www.reddit.com/r/${subreddit}/${type}.json`)
    .then(res=>res.json())
    .then(res=>dispatch(receiveRedditList(res)));