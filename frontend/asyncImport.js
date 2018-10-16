export default function (featureDirectoryPath){
    import(
        /* 
        webpackChunkName: 'features/[request]',
        webpackMode: "eager",
        webpackPrefetch: true 
        */
        `./features/${featureDirectoryPath}/featurePackage.js`
    )
}