import React from 'react';
import ReactDOM from 'react-dom'

// import filterSchema from '../filters/filterSchema'
// import FilterButtons from '../filters/filterButtonsContainer'
// import List from '../list/listContainer'
import Tabber from 'UILibrary/uiHOCs/tabber'
import menuStyle from './leftMenu.scss'
import style from './map.scss'

export default class TabberView extends React.Component {
    componentDidMount(){
        this.props.getLocations();
    }
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
        console.log({featureChildren:this.props.featureChildren})
        return(
            <section className="mapContainer">
                <Tabber header={this.filterTabberHeader()} css={"greyBackground mapMenu"}>
                   <DefView name="default view"/> 
                    {this.props.featureChildren}
                </Tabber>
            </section>
        )
    }

}
{/* <List displayName={`LOCATIONS`} name="Locations" /> */}
    // <FilterButtons active={true} name="FILTERS" schema={filterSchema} />