const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userExperience = new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        maxLength:100
    },
    company:{
        type:String,
        maxLength:100
    },
    location:{
        type:String,
        maxLength:200
    },
    from:{
        type:Date
    },
    to:{
        type:Date
    },
    current:{
        type:Boolean,
    },
    description:{
        type:String,
        maxLength:1000
    }
});

module.exports = new mongoose.model('UserExperience',userExperience);