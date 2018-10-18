import { connect } from 'react-redux';
import {getRedditAction} from '../reducers/redditActions'
import DisplayReddit from './displayRedditList'
import {asFeaturePartial,featurePoints} from "Feature";

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        list:state.reddit.list
    }
}

export default asFeaturePartial(featurePoints.Main,"redditlist")(connect(mapStateToProps, mapDispatchToProps)(DisplayReddit));