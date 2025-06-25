const express = require('express');
const User = require('../models/user');
const router= express.Router();
const {jwtAuthMiddleware,generateToken}= require('./../jwt');
const Candidate = require('../models/candidate');
//const Person=require('./models/Person');


const checkAdmin = async(userId)=>{
    try{
        const user = await User.findById(userId);
        if(user.role ==='admin'){
           return true;
        }
    }
    catch(err){
        return false;
    }
}

//POST method to add a new candidate

router.post('/candidate',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!await checkAdmin(req.user.Id))
        {
            return res.status(403).json({message:"user does  not admin role"});
        }
        
        
        const data = req.body //assuming the request body contins the candidate data

        //create a new candidate document using mongoose model
        const newCandidate = new Candidate(data);
     
     //save the new user to database
     
     const response = await newCandidate.save();
     console.log('data saved');

     res.status(200).json({response: response});
     
     }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});

    }
})

//Login Route   ki neeed nhi hai okay 

// profile route ki need bhi nahi hai okay

 

//Profile management :

 router.put('/:candidateId',jwtAuthMiddleware,async(req,res)=>{
    try{
        
        if(!checkAdmin(req.user.Id))
        {
            return res.status(403).json({message:"user does not admin role"});
        }
        
         const candidateId = req.params.candidateId; //extract the id from the url paramter
        const updatedCandidateData = req.body; // updated data for the person

        const response = await Candidate.findByIdAndUpdate(candidateId,updatedCandidateData,{
            new : true, // return the updated document
            runValidators :true, //run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:'candidate not found'});
        }
        console.log('candidate data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});   
    }
})



router.delete('/:candidateId',jwtAuthMiddleware,async(req,res)=>{
    try{
        
        if(!checkAdmin(req.user.Id))
        {
            return res.status(403).json({message:"user does not admin role"});
        }
        
         const candidateId = req.params.candidateId; //extract the id from the url paramter
        
        const response = await Candidate.findByIdAndDelete(candidateId,updatedCandidateData,{
            
        })
        
        if(!response){
            return res.status(404).json({error:'candidate not found'});
        }
        console.log('candidate data ');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});   
    }
})


module.exports = router;
