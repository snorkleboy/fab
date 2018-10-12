const express = require('express');
const loginController = express.Router();

loginController.post('/:subscriber/:role', (req, res,next) => {
    res.send({"loggedIn":'true'});
})

module.exports = loginController;