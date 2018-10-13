
export const actionTypes = {
    setGoogleUiControlObj : "SET_GOOGLE_UI_CONTROL",
    setGoogleInfoPanelObj : "SET_GOOGLE_INFO_PANEL",
    clickSelect:"CLICK_SELECT",
    clearClickSelect:"CLEAR_CLICK_SELECT",
    setModalComponent:"SET_MODAL_COMPONENT",
    setMessage:"SET_MESSAGE"
};


export const setGoogleUiControlObj = (obj)=>({
    type:actionTypes.setGoogleUiControlObj,
    payload: obj
})
export const setGoogleInfoPanelObj = (obj)=>({
    type:actionTypes.setGoogleInfoPanelObj,
    payload: obj
})

export const clickSelect=(locations)=>({
    type:actionTypes.clickSelect,
    payload:locations
})
export const clearClickSelect=()=>({
    type:actionTypes.clearClickSelect,
    payload:[]
})

export const setModalComponent = (component)=>({
    type:actionTypes.setModalComponent,
    payload:component
})

export const setMessage = (msg)=>({
    type:actionTypes.setMessage,
    payload:msg
})

export const setDevMessage = (dispatch,msg)=>{
    if (process.env.NODE_ENV !== 'production'){
        msg.msg = "[DEV-MODE]" + msg.msg;
        msg.dev = true;
        dispatch(setMessage(msg));
    }else{
        return null
    }
}


    

