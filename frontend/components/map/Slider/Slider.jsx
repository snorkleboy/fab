import React from "react";
import ReactDOM from 'react-dom'
import {iToForecast} from "../util/overlays";
import styles from './slider.scss'


// min={0}
// max={this.state.options.frames-1}
// value={this.state.animationFrame}
// iToLabel={iToForecast}
// onChange={this.handleChangeI.bind(this)}
export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.range=[];
        for(let i=props.min;i<props.max+1;i++){
            this.range.push(i);
        }
        this.onClick = this.onClick.bind(this)
    }
    onClick(e){
        this.props.onChange(e.target.value);
    }
    render(){
        return(
            <section className="slider">
                <Buttons
                    onChange={this.onClick}
                    range={this.range}
                    active={this.props.value}
                    iToLabel={this.props.iToLabel}
                />
            </section>
        )
    }
}

const Buttons = ({range,active,iToLabel,onChange})=>{
    return (
    <span>
        {range.map(i=>(
                <button key={iToLabel(i)}  value={i} className={parseInt(i)===parseInt(active)? "activeSlider":null} onClick={onChange}>
                    {i===0? "current" : "next " + iToLabel(i).replace("+","")}
                </button>
        ))}
    </span>)}

