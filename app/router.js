const express = require('express');
const router = express.Router();

const dataController = require("./controllers/dataController");
const loginContoller = require("./controllers/loginController");
const componentController = require("./controllers/componentController");

router.use('/data', dataController);
router.use('/login', loginContoller);
router.use('/webpackOutput',(req,res,next)=>{
    console.log("\n\n",req.path, "js?:"+ req.path.includes(".js"), "going to component Controller")
    if(req.path.includes(".js")){
        componentController(req, res, next);
    }else{
        next();
    }
});

module.exports = router;