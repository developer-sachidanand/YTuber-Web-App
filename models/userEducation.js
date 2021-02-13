const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userEducation = new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    school:{
        type:String,
        maxLength:100
    },
    degree:{
        type:String,
        maxLength:100
    },
    fieldofstudy:{
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
        default:false
    },
    description:{
        type:String,
        maxLength:1000
    }
});

module.exports = new mongoose.model('UserEducation',userEducation);