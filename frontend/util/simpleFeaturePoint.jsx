import React from 'react';
import ReactDom from 'react-dom'
import {FeatureProvider} from "featureLoader";

const SimpleFeaturePartialRenderer = ({FeaturePointChildren})=>(
    <section className={"flex-column"}>
        {FeaturePointChildren.map(C=><C.component {...C.props}/>)}
    </section>
)


export default ({featurePointName})=>(
    <FeatureProvider featurePointName={featurePointName}>
        <SimpleFeaturePartialRenderer/>
    </FeatureProvider>
)

