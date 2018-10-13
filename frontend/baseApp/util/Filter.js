
//Filter Class
export function Filter(type, cb, filterType, data){
    this.type = type;
    this.filterFun = cb.bind(this);
    this.filtered = 0;
    this.multiFilteredCounter={};
    this.data = data;
    this.filterType = filterType;
    this.urlable = function(){return Boolean(this.data && this.filterType);}
}

Filter.prototype.filter = function (location, defaultFilter = ()=>true){
    if (this.filterFun(location) && defaultFilter(location)){
        this.filtered = this.filtered + 1;
        return true;
    }
    return false;
}
Filter.prototype.reset = function(){
    this.filtered = 0;
    Object.keys(this.multiFilteredCounter).forEach(k=>this.multiFilteredCounter[k]=0);
}
Filter.prototype.toUrl = function(){
    if (this.urlable()){
        return `{type:${this.filterType}+name:${this.type}+data:${stringifyObj(this.data)}}`
    }
}

function stringifyObj(obj){
    if (obj.toJSON){
        obj = obj.toJSON();
    }
    const keys = Object.keys(obj);
    let strings = ["{"];
    keys.forEach((key,i)=>{
        strings.push(`${key}:`)
        strings.push(stringOrStringify(obj[key]))
        if (i!==keys.length-1){
            strings.push(",");
        }
    })
    strings.push("}")
    return strings.join('');
}
function stringOrStringify(el) {
    if (Array.isArray(el)) {
        return "[" + el.map(thing => stringOrStringify(thing)).join(",") + "]"
    }
    else if (typeof el === 'object') {
        return stringifyObj(el)
    } else if (typeof el === 'function') {
        return '';
    }else if(typeof el === 'undefined'){
        return '';
    }else{
        return el.toString()
    }
}
export default Filter;


