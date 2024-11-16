const User = require("../Models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// AUTH MIDDLEWARE
exports.auth = async(req,res,next) =>{
    try{
        // EXTRACT TOKEN
        const token = req.cookies.token || req.body
        || req.header("Authorization").replace("bearer", "");


        // CHECK IF TOKEN EXISTS
        if(!token){
            res.status(400).json({
                success:false,
                message:"Token Not Found",
            });
        }

        // VERIFY THE TOKEN
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
        next();
    }catch(error){
        console.log(error);

        res.status(401).json({
            success:false,
            message:"something went wrong",error,
        });
    } 
}

// isStudent MIDDLEWARE

exports.isStudent = async(req,res,next) =>{
     try{

        if(req.user.accountType !== "Student"){
            res.status(400).json({
                success:false,
                message:"this is Protected Route for Student Only",
            });
        }
        next();

     }catch(error){
        console.log(error);

        res.status(400).json({
            success:false,
            message:"User Role Could Not be Verified Please Try Again",
        });
     }

}

// isAdmin MIDDLEWARE

exports.isAdmin = async(req,res,next) =>{
    try{

       if(req.user.accountType !== "Admin"){
           res.status(400).json({
               success:false,
               message:"this is Protected Route for Admin Only",
           });
       }
       next();

    }catch(error){
       console.log(error);

       res.status(400).json({
           success:false,
           message:"User Role Could Not be Verified Please Try Again",
       });
    }

}

// isInstructor MIDDLEWARE
exports.isInstructor = async(req,res,next) =>{
    try{

       if(req.user.accountType !== "Admin"){
           res.status(400).json({
               success:false,
               message:"this is Protected Route for Instructor Only",
           });
       }
       next();

    }catch(error){
       console.log(error);

       res.status(400).json({
           success:false,
           message:"User Role Could Not be Verified Please Try Again",
       });
    }
}
