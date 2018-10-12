const express = require('express');
const dataController = express.Router();
const data = require("../userStuff/data");

dataController.get('/', (req, res) => {
    res.send(data)
})
module.exports = dataController;