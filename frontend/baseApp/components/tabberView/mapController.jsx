import React from 'react';
import ReactDOM from 'react-dom'

// import filterSchema from '../filters/filterSchema'
// import FilterButtons from '../filters/filterButtonsContainer'
// import List from '../list/listContainer'
import Tabber from 'UILibrary/uiHOCs/tabber'
import menuStyle from './leftMenu.scss'
import style from './map.scss'

export default class MapController extends React.Component {
    filterTabberHeader = ()=> (
        <div className="flex-row leftMenuHeader">
            <div className="flex-row">
                <i className="fa fa-print" aria-hidden="true"></i>
                <h1>Print</h1>
            </div>
            <div className="flex-row">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <h1>Feedback</h1>
            </div>
            <div className="flex-row" style={{cursor:"pointer"}} onClick={this.props.resetFilters}>
                <i className="fa fa-recycle" aria-hidden="true"></i>
                <h1>Reset Map</h1>
            </div>
        </div>
    )
    render(){
        const DefView =()=> (<ul >
            <li>data</li>
            <li>promises of a better future</li>
        </ul>);
        return(
            <section className="mapContainer">
                <Tabber header={this.filterTabberHeader()} css={"greyBackground mapMenu"}>
                   <DefView name="default view"/> 
                </Tabber>
            </section>
        )
    }

}
{/* <List displayName={`LOCATIONS - (${this.props.locations ? this.props.locations.length : 0})`} name="Locations" /> */}
    // <FilterButtons active={this.props.activeFilters.length > 1} name="FILTERS" schema={filterSchema} />