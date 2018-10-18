import { connect } from 'react-redux';
import React from 'react';
import {getRedditAction} from '../reducers/redditActions'
import RedditControls from './redditControls'
import {asFeaturePartial,featurePoints} from "Feature";

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getRedditList:(subreddit,type)=>dispatch(getRedditAction(subreddit,type)),
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        subreddit: state.reddit.subreddit,
        type: state.reddit.type
    }
}

export default asFeaturePartial(featurePoints.tabberView,"reddit")(connect(mapStateToProps, mapDispatchToProps)(RedditControls));