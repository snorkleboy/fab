import React from 'react';
import ReactDOM from 'react-dom';
import style from './list.scss'

import ListLink from './listItemLink'
export default class WeatherModule extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            index:0,
            itemsPerPage:10,
        }
        this.section = React.createRef();
        this.handleScroll=this.handleScroll.bind(this);
        console.log("construct list",this.props)

    }
    componentDidMount(){
        //during testing jest apperently does not handle refs well
        if (this.section.current){
            this.section.current.scrollTop =  this.section.current.scrollHeight/2
        }
    }
    maxIndex(){
        return parseInt(this.props.locations.length-this.state.itemsPerPage);
    }
    shouldComponentUpdate(nextProps,nextState){
        if (Object.keys(nextProps.locations).length !== Object.keys(this.props.locations).length){
            this.section.current.scrollTop = this.section.current.cleintHeight;
            this.setState({index:0});
        }
        return true;
    }
    handleScroll(e,...args){
        if(Boolean(this.section && this.section.current)){
            const current = this.section.current;
            const getTotalHeight = ()=>(current.scrollHeight - current.clientHeight)
            const percentage = this.section.current.scrollTop/getTotalHeight();
            if (percentage >= .7){
                let index;
                if(this.state.index >= this.maxIndex()){
                    index=index;
                }else{
                    index = this.state.index+1;
                    this.section.current.scrollTop = getTotalHeight()/1.5
                    this.setState({index})
                }
            }
            if (percentage <= .3){
                let index;
                if(this.state.index === 0){
                    index=this.state.index;
                } else{
                    index=this.state.index-1;
                    this.section.current.scrollTop = getTotalHeight()/3
                    this.setState({index})
                }
            }
        }
    }
    checkItemsPerPage(){
        if (this.section.current){
            if (this.section.current.scrollHeight < this.section.current.clientHeight*1.5 && this.props.locations.length>this.state.itemsPerPage){
                this.setState({
                    itemsPerPage:this.state.itemsPerPage+10
                })
            }
        }

    }
    onClick(location){
        const handler= function(e){
            if( this.props.clickSelected && location.Id === this.props.clickSelected.Id){
                this.props.unClickSelect();
            }else{
                this.props.clickSelect(location);
            }
        }
        return handler.bind(this);
    }
    render(){
        const index = this.state.index
        const itemsPerPage = this.state.itemsPerPage;
        const that = this;
        console.log("render list",this.props)
        this.checkItemsPerPage();
        return(
            <section className="locationList greyBackground ">
                <ul ref={this.section} onWheel={this.handleScroll} onScroll={this.handleScroll} className="leftMenuHeight scrollable">
                    {
                        this.props.locations
                            .slice(index,index+itemsPerPage)
                            .map((location,i)=> <ListLink key={location.Name + i}  clickSelected={this.props.clickSelected?  this.props.clickSelected.Id === location.Id : false} onClick={this.onClick.bind(this) } location={location}/> )
                    }
                </ul>
                {/*<button className="scheduleButton" onClick={()=>that.props.setModalComponent(<Poster locations={that.props.locations}/>)}>+Schedule</button>*/}
            </section>
        )

    }
}

