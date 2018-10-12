const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const router = require('./app/router');

const port = process.env.PORT || process.argv[2] || '3000';
function listenHandler() {
    console.log(`bound to port ${port} and listening`)
}
app.use(cookieParser());

app.use(cookieParser());
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use('/',router);
app.use("/", (req, res, next) => {
    console.log("going to static server, path:", req.path);
    next();
})
app.use(express.static('public'))
app.set('port', port);
const server = app.listen(port, listenHandler);