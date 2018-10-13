import React from 'react';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

const AsyncLoader = (paths)=>{
    const components = paths.map(path=>{
        // path = "../baseApp/mainApp";
        // path = "mainApp.bundle.js"

        // path = "webpackOutput/mainApp.bundle.js"
        // import(`${path}`).catch(e=>console.log(e));
        console.log({ path });
        return Loadable({
            loader: () => import(/* webpackChunkName: 'asyncComponents/[request]' */ `./baseApp/${path}`).catch(e=>console.log(e)),
            loading:() => <h1> "loading" </h1>
        })
    }
    );
    console.log({ components }, "ASYNC LOADER");

    return components
}

export default AsyncLoader;