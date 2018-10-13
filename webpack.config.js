const productionMode = (process.argv[3] === "production")
var path = require('path');
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var plugins = [

];
var devPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }),
];

var prodPlugins = [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

plugins = plugins.concat(
    productionMode? prodPlugins : devPlugins
);


const rules = [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            cacheDirectory: false,
            presets: ['es2015', 'react', "stage-0", 'stage-2']
        }
    },
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            productionMode?  MiniCssExtractPlugin.loader : "style-loader",
            'css-loader',
            'sass-loader',
        ],
    }
]

const moduleObj = {rules}
const devtool = productionMode? "none" : 'cheap-module-eval-source-map'
const options = {
    mode: productionMode ? "production" : "development",
    watchOptions: {
        poll: true
    },
    devServer: {
        inline: true,
        hot:true,
        port: 8000,
        contentBase: path.resolve(__dirname, 'public/webpackOutput'),
        proxy: {
            "/**": {
                target: 'http://localhost:3000',
                secure: false,
            }
        }
    },
    entry: {
        weatherModule:'./frontend/index.js',
        mainApp: './frontend/baseApp/mainApp.jsx',
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: '/webpackOutput/',
        path: path.resolve(__dirname, 'public/webpackOutput'),
        chunkFilename: '[name].bundle.js',
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool,
    module:moduleObj,
    
}
console.log({productionMode,options,plugins})
module.exports = options;