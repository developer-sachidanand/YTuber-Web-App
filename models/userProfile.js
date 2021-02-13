const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userProfile = new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    status:{
        type:String,
        required:true
    },
    company:{
        type:String
    },
    skills:{
        type:[String]
    },
    bio:{
        type:String,
        maxLength:1000
    },
    location:{
        type:String
    },
    website:{
        type:String
    },
    social:{
        twitter:{
            type:String,
            maxLength:400
        },
        facebook:{
            type:String,
            maxLength:400
        },
        youtube:{
            type:String,
            maxLength:400
        },
        linkedin:{
            type:String,
            maxLength:400
        },
        instagram:{
            type:String,
            maxLength:400
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = new mongoose.model('UserProfile',userProfile);