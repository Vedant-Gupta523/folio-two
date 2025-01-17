const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");
const bcrypt = require('bcrypt');
const passport = require('passport');
//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
//Register handle
router.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect: '/users/login',
    failureFlash : true
})(req,res,next)
})
//register post handle
router.post('/register',(req,res)=>{
const {name,email, password, password2, linkedin, github, personal_web, medium} = req.body;
let errors = [];
console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
if(!name || !email || !password || !password2) {
    errors.push({msg : "Please fill in all fields"})
}
//check if match
if(password !== password2) {
    errors.push({msg : "Passwords don't match"});
}

//check if password is more than 6 characters
if(password.length < 6 ) {
    errors.push({msg : 'Password at least 6 characters'})
}
if(errors.length > 0 ) {
res.render('register', {
    errors : errors,
    name : name,
    email : email,
    password : password,
    password2 : password2,
    linkedin : linkedin,
    github : github,
    personal_web : personal_web,
    medium : medium})
    } else {
    //validation passed
    User.findOne({email : email}).exec((err,user)=>{
    console.log(user);   
    if(user) {
        errors.push({msg: 'Email already registered'});
        res.render('register',{errors,name,email,password,password2,linkedin,github,personal_web,medium})  
        } else {
        const newUser = new User({
            name : name,
            email : email,
            password : password,
            linkedin : linkedin,
            github : github,
            personal_web : personal_web,
            medium : medium
        });

        //hash password
        bcrypt.genSalt(10,(err,salt)=> 
        bcrypt.hash(newUser.password,salt,
            (err,hash)=> {
                if(err) throw err;
                    //save pass to hash
                    newUser.password = hash;
                //save user
                newUser.save()
                .then((value)=>{
                    console.log(value)
                    req.flash('success_msg','You have now registered!');
                    res.redirect('/users/login');
                })
                .catch(value=> console.log(value));
                    
            }));
            }
    })
}
})

// project
router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
    })
router.post('/dashboard',(req,res)=>{
    const {url, project_url, project_name, project_desc, user_id} = req.body;
    const newProject = new Project({
        url : url,
        project_url : project_url,
        project_name : project_name,
        project_desc : project_desc,
        user_id : user_id
    });
    newProject.save()
    .then((value)=>{
        console.log(value)
        res.redirect('/dashboard');
    })
    .catch(value=> console.log(value));
})

//preview
router.get('/portfolio/:id',(req,res)=>{
    User.findById(req.params.id).exec((err,user)=>{
        Project.find({'user_id' : req.params.id}).exec((err,projects)=>{
            res.render('portfolio',{
                user: user,
                projects: projects
            });  
        })
    })
    })

//logout
router.get('/logout',(req,res)=>{
req.logout();
req.flash('success_msg','Now logged out');
res.redirect('/users/login'); 
})

    
module.exports  = router;