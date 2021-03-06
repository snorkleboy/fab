
export function fetchLocations(){
    return fetch(`./data`)
        .then(res=>res.json())
        .then(res=> {return res})
}
export function fetchResetLocations(){
    return fetch(`./admin/reset`)
        .then(res=>res.json())
        .then(res=> {return res})
}
export function postUser(user){
    const options = makeopts(user,"POST");
    return fetch(`./login/${user.subscriber}/${user.role}`,options)
        .then((res) => {
            return res.json()
        })
       
}
export function deleteUser(){
    const options = makeopts("","DELETE");
    return fetch(`./users/`,options)        
        .then(window.location.replace(window.location.origin + "/login") )
}
export function postWorkOrders(workOrders){
    const opts = makeopts(workOrders[0],"POST");
    const url = "/admin/workOrders"
    return fetch(url, opts)
        
}
function makeopts(data, method){
    return {
        body: JSON.stringify(data),
        method: method,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
}


