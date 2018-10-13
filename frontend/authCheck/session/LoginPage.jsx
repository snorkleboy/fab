import React from "react";
import styles from './loginPage.scss'
import { Input,Button,Item, Label } from 'semantic-ui-react'
import MessageDisplayer from 'UILibrary/messageDisplayer/messageDisplayer'
import Message from 'UILibrary/messageDisplayer/Message'

import {subscribers,roles} from 'frontend/../app/userStuff/data';
export default class WeatherModule extends React.Component {
    constructor(props){
        super(props);
        this.state={
            subscriber:"",
            role:""
        }
        this.onChange = this.onChange.bind(this);
        this.post = this.post.bind(this);
    }
    onChange(e){
        const obj = {};
        obj[e.target.name]=e.target.value;
        this.setState(obj);
    }
    post(e){
        e.preventDefault();
        console.log(this.state);
        this.props.postUser(this.state)
    }
    render(){
        console.log(this.state);
        return (
            <section className="loginSection">
                {this.state.error?
                    <MessageDisplayer messageObj={this.state.error}/>
                    :
                    null
                }
                <div>
                    <img className="splashLogo" src="./imgs/sclogo.png"/>
                </div>
                <form className="login">
                    <select name="subscriber" value={this.state.subscriber} onChange={this.onChange} required>
                        <option value="" disabled selected>choose subscriber</option>
                        {subscribers.map(s=><option value={s}>{s}</option>)}
                    </select>
                    <select name="role" value={this.state.role} onChange={this.onChange} required>
                        <option value="" disabled selected>choose role</option>
                        {roles.map(r => <option value={r}>{r}</option>)}
                    </select>
                    <div className="flex-column loginSubmit">
                    {(this.state.subscriber =="" || this.state.role=="")?
                        <Button type="submit" >fill it all out</Button>
                    :
                        <Button type="submit" onClick={this.post}>login</Button>

                    }
                    </div>
                </form>
            </section>

        )
    }
}

function makeopts(data){
    return {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
}