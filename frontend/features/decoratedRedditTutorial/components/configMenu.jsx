import {changeRedditType, changeSubReddit} from "features/decoratedRedditTutorial/reducers/redditActions";
import React from 'react';
import { connect } from 'react-redux';
import ChangeType from "../decorators/changeTypeButton"
const ConfigMenu = (props)=>(
    <section className={"configMenu"}>
        <h1> change subreddit</h1>
        <ChangeType value={props.subreddit} onChange={(e)=>props.changeSubReddit(e.target.value)}/>
        <h1> change type</h1>
        <ChangeType value={props.currentType} onChange={(e)=>props.changeType(e.target.value)} />
        <h1 onClick={props.close}>[x]</h1>
    </section>
)
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeSubReddit: (newSub)=>dispatch(changeSubReddit(newSub)),
        changeType:(newType)=>dispatch(changeRedditType(newType))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        subreddit:state.reddit.subreddit,
        currentType:state.reddit.type
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigMenu);