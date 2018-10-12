
export function Validation(callback, msg){
    this.validate = callback;
    this.errorMsg = msg;
}

export const validatations = {
    requried: new Validation((val)=>val && val.toString().length>0,"Must enter a value"),
    date: new Validation(val=>new Date(val.toString()).toString() !== "Invalid Date","Must be valid Date"),
    dateAfterToday: new Validation(val=>new Date(val.toString()) >= new Date(),"Must be Today or later")
}
export function validator(keyValueMap, KeyValidationMap){
    const results = {};
    Object.keys(KeyValidationMap).forEach(key=>{
        const validations = KeyValidationMap[key].validations;
        const value = keyValueMap[key];
        for(let i=0;i<validations.length;i++){
            const validation =validations[i]

            if(!validation.validate(value)){
                results._error = true;
                results[KeyValidationMap[key].errorKey || key+"error"] = validation.errorMsg || "error"
                break;
            }else{
                results[key] =value;
            }
        }

    })
    
    return results;
}

