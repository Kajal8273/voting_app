const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required : true,
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
        type: Boolean,
        default: false
    }
});

userSchema.pre('save',async function(next){
    const person = this;
    //hash the passsword only if it has been modified (or it is new user)
     if(!person.isModified('password')) return next();
    try{
        //hash password generator 
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword =await bcrypt.hash(person.password,salt);

        //override the plain password with the hashed one
        person.password = hashedPassword;
       next();
    }
    catch(err){
           return next(err); 
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const User = mongoose.model('User',userSchema);
module.exports =User;
