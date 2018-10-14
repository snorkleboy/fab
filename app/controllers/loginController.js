const express = require('express');
const loginController = express.Router();
const featureResolver = require("../userStuff/subscriberRoleToFeatureResolver")


loginController.post('/:subscriber/:role', (req, res,next) => {
    const obj = {};
    const subscriber = req.params["subscriber"];
    const role = req.params["role"];
    
    obj["subscriber"] = subscriber
    obj["role"] = role
    obj["featureSchema"] = featureResolver(subscriber,role);
    console.log(featureResolver(subscriber,role))
    console.log(obj);
    
    res.send(obj);
})

module.exports = loginController;