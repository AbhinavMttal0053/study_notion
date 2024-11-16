const bcrypt = require("bcrypt");
const User = require("../Models/User");
const mailSender = require("../Utils/mailSender");
const crypto = require("crypto");


// CONTROLLER FOR CREATING TOKEN FOR RESETTING PASSWORD
exports.resetPasswordToken = async(req,res) =>{
    try{
        
        //FETCHING DATA FROM REQUEST
        const email = req.body.email;

        // CHECK IF USER EXISTS OR NOT
        const user = await User.findOne({email : email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Your Email is Not Registered with Us ",
            });
        }

        // GENERATE TOKEN\\ AND UPDATE TOKEN INTO USER SCHEMA
        const token = crypto.randomBytes(20).toString("hex")

        const updatedUser = await User.findOneAndUpdate({email : email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            {new:true});

            console.log("DETAILS", updatedUser);

        // CREATE URL

        const url = `http://localhost:3000/update-password/${token}`;

        // Send MAIL 
        await mailSender(email,
            "Password Reset Link",
            `Password Reset Link: ${url} \n Click Here To Reset Your Password`,
        );

        return res.json({
            success:true,
            message:"Email Sent Successfully to Registered Email",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:"Something Went Wrong while Sending Email",
        })
    }
}


// RESET PASSWORD CONTROLLER
exports.resetPassword = async(req,res) =>{
    try{
        // FETCH DATA FROM BODY
        const{password,confirmPassword,token} = req.body;

        // VALIDATION
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"BOTH FIELDS ARE NOT SAME",
            });
        }

        // SEARCH FOR TOKEN IN USER DB
        const userDetails = await User.findOne({token : token});

        // IF NO ENTRY - MEANS NO TOKEN
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"No Token",
            })
        }

        // CHECK FOR TOKEN EXPIRY
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(403).json({
                success:false,
                message:"Token Expired",
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password,10);

        // PASSWORD UPDATE
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );

        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully",
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Error while changing Password",
        });
    }
}