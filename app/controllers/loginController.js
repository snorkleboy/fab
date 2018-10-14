const express = require('express');
const loginController = express.Router();
const featureResolver = require("../userStuff/subscriberRoleToFeaturesResolver")


loginController.post('/:subscriber/:role', (req, res,next) => {
    const obj = {};
    const subscriber = req.params["subscriber"];
    const role = req.params["role"];
    
    obj["subscriber"] = role + subscriber
    obj["role"] = role + subscriber
    obj["featureSchema"] = featureResolver(subscriber,role);
    console.log(featureResolver(subscriber,role))
    
    res.send(obj);
})

module.exports = loginController;