import React from 'react';
import { connect } from 'react-redux';
import {changeRedditType} from "../reducers/redditActions";


const ChangeTypeButton = ({currentType,changeType})=>(
    <div>
        <input value={currentType} onChange={(e)=>changeType(e.target.value)}/>
    </div>

)

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeType:(newType)=>dispatch(changeRedditType(newType))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentType:state.reddit.type
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTypeButton);