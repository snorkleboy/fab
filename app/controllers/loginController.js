const express = require('express');
const loginController = express.Router();

loginController.post('/:subscriber/:role', (req, res,next) => {
    const obj = {};
    obj["subscriber"] = req.params["subscriber"]
    obj["role"] = req.params["role"]
    
    
    
    if (req.params["subscriber"] == "skelitor"){
        obj["featureSchema"] = {
        }
    }else if (req.params["subscriber"] == "diana"){
        obj["featureSchema"] = {
            "tabberView":[{path:"list/listContainer.js",props:{}}]
        }
    }else if (req.params["subscriber"] == "bubblegum"){
        obj["featureSchema"] = {
            "tabberView":[{path:"list/listContainer.js",props:{}},{path:"list/listContainer.js",props:{}}]
        }
    }
    
    res.send(obj);
})

module.exports = loginController;