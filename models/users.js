const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4 : uuidv4 } = require('uuid');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        maxLength:150
    },
    salt:String,
    encry_password:{
        type:String,
        required:true,
        minLength:8
    },
    user_type:{
        type:Number,
        default:0
    }

},{timestamps:true})

userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.EncryptPassword(password);
})
.get(function(){
    return this._password;
});

userSchema.methods = {
    authenticatePassword:function(plainpassword){
        return this.EncryptPassword(plainpassword) === this.encry_password;
    },
    EncryptPassword:function(plainpassword){
        if(!plainpassword){
            return "";
        }
        try {
            return crypto.createHmac('sha256',this.salt).update(plainpassword).digest('hex');
        } catch (error) {
            return "";
        }
    }
}

const User = new mongoose.model('User',userSchema);
module.exports = User;