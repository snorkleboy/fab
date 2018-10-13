import React from 'react';
import ReactDom from 'react-dom';
import LoginPage from './baseApp/components/session/LoginPageContainer';
import AsyncLoader from './asyncLoader'
import Loadable from 'react-loadable';

// import MainApp from './mainApp'
class WeatherModule extends React.Component {
    
    constructor(props){
        super(props)
    }
    render(){
        console.log("render", Date.now(), this.props, this.props.loggedIn ? true : false, { LoginPage});
        if (this.props.loggedIn){
            return (
                <main className='main'>
                    <LoginPage />
                </main>
            )
        }else{
            const path = "./baseApp/mainApp"
            return (
            <main className='main'>
                    {AsyncLoader([path]).map(C=><C/>)}
            </main>
            )
        }
    }
}



export default  (WeatherModule);

