const express = require('express');
const dataController = express.Router();
const data = require("../userStuff/data");

dataController.get('/', (req, res) => {
    res.send({url:"mainApp"})
})
module.exports = dataController;