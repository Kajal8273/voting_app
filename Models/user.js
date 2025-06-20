const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required :true
    },
    age:{
        type:Number,
        required: true
    },
     email:{
        type:String,
    },
   
    mobile:{
        type :String,
        required :true
    },
    address:{
        type:String
    },
   
    aadharNumber:{
        reuired : true,
        type : Number,
        unique: true
    },
    
    password:{
        required : true,
        type:String
    },
    role:{
        type:String,
        enum :['voter','admin'],
        default : 'voter'
    },
    isVoted:{
        type: boolean,
        default: false
    }
});



const User = mongoose.model('User',userSchema);
module.exports =User;
