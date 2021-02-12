const User  = require('../models/users');
const nodemailer = require('nodemailer');
const About = require('../models/about');

exports.signup = (req,res) =>{
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    newUser.save((err,user)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })
        }

        return res.status(201).redirect("/api/user/login")
    })
}

exports.sendMessage = async(req,res) =>{

    const newMessage = new About(req.body);

    newMessage.save((err,suc)=>{
        if(err){
            return res.status(400).json({msg:'message not sent successfully'})
        }
        else{
            return res.status(200).render('about',{msg:"Thanks for contacting us. We will reach you soon"});
        }
    })
    

}
