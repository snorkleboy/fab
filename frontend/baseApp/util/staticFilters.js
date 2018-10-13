import {makeWeatherFilters,makeWorkOrderFilters} from './staticFilterMakers';

export const staticTriggerFilters = {
    "location trigger value exceeded":  {filterFunction: (loc)=> loc.TriggerValue? loc.weatherCondition.snowInches >= loc.TriggerValue : false}
}

export const {staticIceFilters,
    staticSnowFilters,
    windFilters,
    rainFilters,
    snowAndIceFilters} = makeWeatherFilters()

export const {staticWorkOrderFilters}=makeWorkOrderFilters();


