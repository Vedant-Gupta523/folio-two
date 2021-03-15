const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
const Project = require("../models/project");

//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    Project.find({'user_id' : req.user._id}).exec((err,projects)=>{
        res.render('dashboard',{
            user: req.user,
            projects: projects
        });  
    })
})
module.exports = router; 