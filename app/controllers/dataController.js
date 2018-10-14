const express = require('express');
const dataController = express.Router();
const data = require("../userStuff/data");

dataController.get('/', (req, res) => {
    res.send({locations:data.data})
})
module.exports = dataController;