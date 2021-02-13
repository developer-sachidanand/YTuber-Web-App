const passport = require('passport')
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../controllers/auth");
const {signup,sendMessage} = require("../controllers/users");
const {UserProfile,addExperience,addEducation
,deleteEducation,deleteAccount,deleteExperience,deleteExperienceView,getUserEducation,
 getUserExperience,getdeleteEducation} = require("../controllers/userProfile");


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
router.get("/user/profile",ensureAuthenticated,getUserEducation,getUserExperience,(req,res)=>{

    res.render('profile',{user:req.user,Exp:req.experience,Edu:req.education})
    
});
// deleting the user account
router.delete("/user/profile",ensureAuthenticated,deleteAccount);

// editing the user profile
router.get("/user/edit/profile",ensureAuthenticated,(req,res)=>{
    res.render('editProfile');
});

//updating the user profile
router.post("/user/edit/profile",ensureAuthenticated,UserProfile);

// editing the user profile experience 
router.get("/user/add/experience",ensureAuthenticated,(req,res)=>{
    res.render('addExperience');
});
 
router.post("/user/add/experience",ensureAuthenticated,addExperience);

// deleting the user experience information
router.get("/user/deleteExp/:id",ensureAuthenticated,deleteExperienceView);
router.post("/user/deleteExp/:id",ensureAuthenticated,deleteExperience);

// editing the user profile education
router.get("/user/add/education",ensureAuthenticated,(req,res)=>{
    res.render('addEducation');
});

router.post("/user/add/education",ensureAuthenticated,addEducation);

// deleting the user education  details
router.get("/user/delete/:id",ensureAuthenticated,getdeleteEducation);
router.post("/user/delete/:id",ensureAuthenticated,deleteEducation);

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
