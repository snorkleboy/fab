const express = require('express');
const componentController = express.Router();

componentController.get('/:component', (req, res, next) => {
    const componentName = req.params.component
    console.log("\n\n\n", "HERE!!!!!!!", {componentName, path:req.path}, "\n\n\n");
    res.sendFile(`${componentName}`, {
        root: "public/webpackOutput/"
    });
})

module.exports = componentController;