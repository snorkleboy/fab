import {changeSubReddit} from "features/decoratedRedditTutorial/reducers/redditActions";
import React from 'react';
import { connect } from 'react-redux';
import ChangeType from "../decorators/changeTypeButton"
const ConfigMenu = ({subreddit, changeSubReddit, close})=>{console.log({subreddit, changeSubReddit, close});return(
    <section className={"configMenu"}>
        <h1> change subreddit</h1>
        <input value={subreddit} onChange={(e)=>changeSubReddit(e.target.value)}/>
        <h1> change type</h1>
        <ChangeType/>
        <h1 onClick={close}>[x]</h1>
    </section>
)}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeSubReddit: (newSub)=>dispatch(changeSubReddit(newSub)),
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        subreddit:state.reddit.subreddit
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigMenu);