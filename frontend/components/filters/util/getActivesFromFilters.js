export default function getActives(filters,filterName){
    const filter = filters.find(filter=> filter.type === filterName);
    let filtered = 0;
    let active = false;
    let data;
    if (filter){
        filtered=filter.filtered;
        data = filter.data.data || filter.data;
    }
    if (filtered && filtered>0){
        active=true;
    }
    return {filtered,data,filter}
}
