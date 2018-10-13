import * as apiCalls from '../../../util/apiCalls'

export const actionTypes = {
    'receiveUser':'RECEIVE_USER',
    'logout':"LOGOUT"
}
export const receiveUser = (user)=>({
    payload:user,
    type:actionTypes['receiveUser']
})
export const logoutUser = ()=>({
    type:actionTypes.logout
})
export const postUser = (user)=>(dispatch)=>apiCalls.postUser(user)
    .then(res=>{
        if (!res || res.error){
            throw ("POSTUSER ERROR",{user,res});
        }else{
            console.log("dispathcing user",user);
            dispatch(receiveUser(user))
        }
});
export const deleteUser = ()=>(dispatch)=>apiCalls.deleteUser()
    .then(res=>{
        if (res.error){
            console.warn("logout request error");
        }
});