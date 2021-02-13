const UserProfile = require('../models/userProfile');
const AddExperience = require("../models/userExperience");
const AddEducation = require("../models/userEducation")

exports.UserProfile = (req,res) =>{
    const {status,company,website,location,skills,bio
        ,twitter,facebook,youtube,linkedin,instagram} = req.body;
    const user = req.user._id;
    
    const editProfile = new UserProfile({user:user,status,company,website,location,skills,bio,
                                            social:{twitter,facebook,linkedin,youtube,instagram}});

    editProfile.save((err,response)=>{
        if(err){
            return res.status(401).json({
                err:err
            })
        }
        else{
            res.status(200).redirect("/api/user/profile");
        }
    })
}

exports.deleteAccount =(req,res) =>{

    UserProfile.findAndDelete({id:req.user._id},(err,response)=>{
        if(err){
            return res.status(400).json({msg:"failed to delete the account"})
        }
        else{
            return res.status(200).redirect("/");
        }
    })
}



exports.addExperience = (req,res) =>{
    const {title,company,location,from,to,current,description} = req.body;
    const user = req.user._id;
    const experience  = new AddExperience({user:user,title,company,location,from,to,current,description});

    experience.save((err,response)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(201).redirect('/api/user/profile')
        }
    })
}

exports.deleteExperience = async (req,res) =>{
    try {
        const id = req.params.id;
        const Experience = await AddExperience.deleteOne({_id:id});
        if(!Experience) return res.status(404).send('Customer with the given id not found');
        res.redirect('/api/user/profile');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


exports.addEducation = (req,res) =>{
    const {school,degree,fieldofstudy,from,to,current,description} = req.body;
    const user = req.user._id;
    const Education  = new AddEducation({user:user,school,degree,fieldofstudy,from,to,current,description});

    Education.save((err,response)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(201).redirect('/api/user/profile')
        }
    })
}

exports.deleteEducation = async(req,res) =>{
    try {
        const id = req.params.id;
        const Education = await AddEducation.deleteOne({_id:id});
        if(!Education) return res.status(404).send('Customer with the given id not found');
        res.redirect('/api/user/profile');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
exports.getdeleteEducation = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const Education = await AddEducation.findById(id).exec();
        res.render('deleteEducation', {
            Edu: Education
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}
exports.deleteExperienceView = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const Experience = await AddExperience.findById(id).exec();
        res.render('deleteExp', {
            Exp: Experience
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


// get user education detail

exports.getUserEducation = (req,res,next) =>{
    AddEducation.find({user:req.user._id},(err,edu)=>{
        if(err){
            return res.status(400).json({msg:'no details are found'});
        }
        req.education = edu;
        next();
    });
}

// get details of the user experience
exports.getUserExperience = (req,res,next) =>{
    AddExperience.find({user:req.user._id},(err,exp)=>{
        if(err){
            return res.status(400).json({msg:"no such details found"});
        }
         req.experience = exp;
         next();
    });
}
