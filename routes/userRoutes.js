const express = require('express');
const User = require('../models/user');
const router= express.Router();
const {jwtAuthMiddleware,generateToken}= require('./../jwt');
//const Person=require('./models/Person');

//POST method to add a new Person

router.get('/signup',async(req,res)=>{
    try{
        
        const data = req.body //assuming the request body contins the user data

        //create a new user document using mongoose model
        const newUser = new User(data);
     
     //save the new user to database
     
     const response = await newUser.save();
     console.log('data saved');

     const payload ={
        id:response.id
        // we dont need the username here 
       // username:response.username
     }
     
     console.log(JSON.stringify(payload));
     const token = generateToken(payload);
     console.log("Token is :",token);
     res.status(200).json({response: response,token : token});
     
     }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});

    }
})

//Login Route

router.post('/login',async(req,res)=>{
    try{
        //Extract username and password from request body;
        const {aadharNumber,password} =req.body;

        //Find user by aadharNumber
        const user = await User.findOne({aadharNumber:aadharNumber});
        
        //If user doesnt exist or password doesnt match
        if(!user ||!(await user.comparePassword(password))){
            return res.status(401).json({error:"invalid usernaem or password"});

        }
        // NOW genterate token
        const payload ={
            id : user.id
             // we dont need the username here
            //username:user.username
        }
        const token = generateToken(payload);
        
        // return token as response
        res.json({token})
    }
    catch(err){
         console.error(err);
         res.status(500).json({error:"internal server rrror"});
    }
});

// profile route 

 router.get('/profile', jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData = req.user; // it is fetech by jwt file decode method  i.e by token
        //console.log("user data :" , userData);
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});

    }catch(err){
        console.error(err);
         res.status(500).json({error:"internal server rrror"});
    }
 })


 router.put('/profile/password',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userId = req.user; //extract the id from the token
        const {currentPassword,newPassword} = req.body; // extract  current and new passwords from requets body
        
        ////Find user by userid
        const user = await User.findById({userId});
        
        //if password doesnt match  return error
        if(!user ||!(await user.comparePassword(password))){
            return res.status(401).json({error:"invalid usernaem or password"});
        }
        //update the user  password
        user.password = newPassword;
        await user.save();

        
        console.log('passwor updated');
        res.status(200).json({message:"password updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});   
    }
})



module.exports = router;
