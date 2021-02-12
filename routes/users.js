const passport = require('passport')
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../controllers/auth");
const {signup,sendMessage} = require("../controllers/users");

// getting the signup page
router.get("/user/signup",forwardAuthenticated,(req,res)=>{
    res.render('signup');
});

// getting the login page
router.get("/user/login",forwardAuthenticated,(req,res)=>{
    res.render('login');
});

// logout
router.get("/user/logout", (req, res) => {
    req.logout();
    res.redirect('/api/user/login');
  });

// visiting the user profile
router.get("/user/profile",ensureAuthenticated,(req,res)=>{
    res.render('profile',{user:req.user})
    
});

// editing the user profile
router.get("/user/edit/profile",ensureAuthenticated,(req,res)=>{
    res.render('editProfile');
});

// editing the user profile experience 
router.get("/user/add/experience",ensureAuthenticated,(req,res)=>{
    res.render('addExperience');
});

// editing the user profile education
router.get("/user/add/education",ensureAuthenticated,(req,res)=>{
    res.render('addEducation');
});

// accessing the about page
router.get("/about",(req,res)=>{
    res.render('about');
});

// accessing the tubers page
router.get("/tubers",(req,res)=>{
    res.render('tubers');
});

// registering the user
router.post("/user/signup",signup);

// logging in the user
router.post("/user/login",(req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/api/user/profile',
      failureRedirect: 'api/users/login'
    })(req, res, next);
  });


router.post("/about",sendMessage);

module.exports = router;