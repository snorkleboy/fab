const express = require('express');
const componentController = express.Router();

componentController.get('/:component', (req, res, next) => {
    const componentName = req.params.component
    console.log("component controller", {componentName, path:req.path}, "\n\n\n");
    res.sendFile(`${componentName}`, {
        root: "public/webpackOutput/"
    },
    (err)=>{
        if (err){
            console.log(err);
            next();
        }
    });
})

module.exports = componentController;