const mongoose = require('mongoose');
const schema = mongoose.Schema;

const aboutSchema = new schema({
    name:{
        type:String,
        minLength:3,
        required:true
    },
    email:{
        type:String,
        required:true,
        maxLength:255
    },
    subject:{
        type:String,
        required:true,
        maxLength:100
    },
    message:{
        type:String,
        required:true,
        maxLength:1500
    },
    Date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

module.exports = new mongoose.model('About',aboutSchema);