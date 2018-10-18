import React from 'react';
import { connect } from 'react-redux';
import {asFeaturePartial,featurePoints} from "Feature";
import {changeRedditType} from "../reducers/redditActions";
import decoratorNames from "../decorators.json"


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

export default {name:decoratorNames.typeChange,props:{Control:connect(mapStateToProps, mapDispatchToProps)(ChangeTypeButton)}};