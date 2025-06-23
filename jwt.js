const jwt = require('jsonwebtoken');
const nodemon = require('nodemon');

const jwtAuthMiddleware=(req,res,next)=>{
    //Extract jwt token from the request header
     const token = req.headers.authorization.split(' ')[1];
     if(!token) 
        return res.status(401).json({error: 'unauthroized'});
    try{
       // verify the token
       const decode = jwt.verify(token,process.env.JWT_SECRET,{expiresIn : 40});
       
       //attach user info to the request objeect
       req.user =decode
       next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({error:'invalid token'});
    } 
}




//functioin to generate  token
const generateToken=(userData)=>{
    //generate a new JWT token
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
}

module.exports = {jwtAuthMiddleware,generateToken};