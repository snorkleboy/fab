import React from "react";
import styles from './modal.scss'
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Child =()=> this.props.modalComponent? 
                React.cloneElement(
                    this.props.modalComponent,
                    { close: this.props.close }
                )   
            :
                null;
        const open = this.props.modalComponent? "open":"closed";
        return (
            <div className={`blocker ${open}`}>
                <div className={`modal ${open}`}>
                    <Child />
                </div>       
            </div>

        )
    }
}