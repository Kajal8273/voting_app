const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const candidateSchema = new mongoose.Schema({
    name:{
        type :String,
        required :true
    },
    
});



const Candidate = mongoose.model('Candidate',candidateSchema);
module.exports =Candidate;
