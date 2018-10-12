import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader';
import LoginPage from './components/session/LoginPageContainer';
import Loadable from 'react-loadable';
// import MainApp from './mainApp'
class WeatherModule extends React.Component {
    
    constructor(props){
        super(props)
    }
    render(){
        console.log("render", Date.now(), this.props, this.props.loggedIn ? true : false, { LoginPage});
        if (!this.props.loggedIn){
            return (
                <main className='main'>
                    <LoginPage />
                </main>
            )
        }else{
            const LoadableComponent = Loadable({
                loader: () => import('./mainApp'),
                loading: ()=><h1>"wadup yo"</h1>,
            });
            return (
                <main className='main'>
                    <LoadableComponent />
                </main>
                )
        }
    }
}



export default  (WeatherModule);

