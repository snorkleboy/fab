import React from 'react';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

const loadedComponents = {};
function AsyncLoader (paths){
    const components = paths.map(path=>{
        const comp = Loadable({
            loader: () => import(/* webpackChunkName: 'asyncComponents/[request]' */ `./baseApp/${path}`).catch(e=>console.log(e)),
            loading:() => <h1> "loading" </h1>
        })
        loadedComponents[path] = comp;
        return comp;
    }
    );
    console.log({ components, paths, loadedComponents}, "ASYNC LOADER");

    return components.map(C=><C/>)
}
export default AsyncLoader;