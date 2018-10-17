import React from 'react';
import ReactDom from 'react-dom';
import LoginPage from './session/LoginPageContainer';
import AsyncLoader from 'frontend/asyncLoader'
import Loadable from 'react-loadable';
// import MainApp from './mainApp'
class WeatherModule extends React.Component {
    
    constructor(props){
        super(props)
        this.state={name:""};
    }
    componentDidMount(){
        fetch("./data").then(res=>res.json()).then(res=>{
            this.setState({name:res.url})
        })
    }
    render(){
        if (!this.props.loggedIn){
            return (
            <main className='main'>
                <LoginPage />
            </main>
            )
        }else{
            const Component = Loadable({
                loader: () => import(/* webpackChunkName: 'mainApp' */ `../baseApp/baseApp`).catch(e=>console.log(e)),
                loading:() => <h1> "loading" </h1>
            });
            return (
                <main className='main'>
                    <Component/>
                </main>
            )
        }
    }
}



export default  (WeatherModule);

