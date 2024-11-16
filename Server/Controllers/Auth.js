const User = require("../Models/User");
const Profile = require("../Models/Profile");
const OTP = require("../Models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../Utils/mailSender");
require("dotenv").config();
const { passwordUpdated } = require("../mail/templates/passwordUpdate");


// SendOTP Controller
exports.sendOTP = async(req,res) =>{
    try{
        // FETCHING EMAIL FROM REQUEST BODY
        const {email} = req.body;

        // CHECK IF USER ALREADY EXISTS
        const checkAlreadyRegistered = await User.findOne({email});

        if(checkAlreadyRegistered){
            return res.status(401).json({
                success:false,
                message:"User Already Registered",
            });
        }

        // IF USER DOES NOT EXIST
        // CREATE OPT
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        console.log("otp Generated:" ,otp);

        let result = await OTP.findOne({otp: otp});
        
        // CHECK IF OTP IS UNIQUE
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email,otp};

        // CREATE A DB ENTRY FOR OTP
        const optBody = await OTP.create(otpPayload);

        console.log("OTP DB ENTRY:",optBody);

        // SEND FINAL RESPONSE
        res.status(200).json({
            success:true,
            message:"OTP Successfully Sent",
            otp,
        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:error.message,
        }); 
    }
}

exports.signUp = async(req,res) =>{
    try{
        // FETCH DATA FROM REQ BODY
        const{firstName,lastName,
            password,confirmPassword,
            email,contactNumber,
            otp,accountType,} = req.body;

        // CHECK IF ANY FIELD IS LEFT EMPTY
        if(!firstName || !lastName || !password || !confirmPassword || !email
            ||!otp || !accountType){
                return res.status(403).json({
                    success:false,
                    message:"Some Fields are Not Filled,Please Fill all the Details",
                });
            }

        // CHECK IF PASSWORD AND CONFIRM PASSWORD FIELDS ARE SAME    
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Both Passwords Do Not Match",
            });
        }

        // CHECK FOR EXISTING USER
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists",
            });
        }
        
        // FIND MOST RECENT OTP AND VALIDATING OTP
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOTP.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP Not Found",
            });
        }
        else if(otp !== recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }
        // HASHING THE PASSWORD
        const hashedPassword = await bcrypt.hash(password,10);

        
        // CREATE ENTRY IN DB
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = false);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
        firstName,
        lastName,
        password:hashedPassword,
        email,
        contactNumber,
        accountType,
        additionalDetails:profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success:true,
            message:"User Registered!", 
            user,
            createdAt:Date.now(),
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.logIn = async(req,res) =>{
    try{

        // FETCH DATA FROM REQUEST BODY
        const {email,password} = req.body;

        // VALIDATE THE DATA
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Please Fill All the Details",
            });
        }

        // CHECK IF THE USER EXISTS
        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(403).json({
                success:false,
                message:"User Does Not Exist, Please Sign Up First",
            });
        }

        // CHECK IF PASSWORD IS CORRECT AND THEN GENERATE JWT TOKEN AND COOKIE
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = null;


            // CREATE A COOKIE AND SEND RESPONSE
            const options = {
                expiresIn:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged Inn Successfully",
            })
            console.log("Logged in sucessfully",user);
        }

        // IF PASSWORD IS NOT CORRECT
        else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Password",
            });
        }
    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }
}

exports.changePassword = async(req,res) =>{
    
   try{
        // Fetch PASSWORD AND CONFIRM PASSWORD FROM REQ BODY
        const{newPassword ,confirmNewPassword,oldPassword} = req.body;

        // GET USER DETAILS TO MATCH THE OLD PASSWORD
        const id  = req.user.id;
        const userDetails = User.findById(id);
    
    
        // COMPARE OLD PASSWORD AND ORIGINAL PASSWORD USING BCRYPT(because hashed)
    
        const isPassMatch = await bcrypt.compare(oldPassword,userDetails.password);
    
        // check if the password entered in correct
        if(!isPassMatch){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password Entered"
    
            });
        }
    
        // MATCH NEW PASSWORD AND CONFIRM NEW PASSWORD
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"new password and confirm password fields don't match",
            });
        }
    
        // UPDATE NEW PASSWORD IN DB
    
        const hashedPassword = await bcrypt.hash(newPassword,10);
    
        const newUserDetails = await User.findByIdAndUpdate(id,
            {password: hashedPassword},
            {new:true},
        );
    
        // Send Notification EMail
        try{
            const emailResponse = await mailSender(
                newUserDetails.email,
                passwordUpdated(
                    newUserDetails.email,
                    `Password Updated for ${newUserDetails.firstName} ${newUserDetails.lastName}`
                )
            );
            console.log("Email Sent SuccessFully",emailResponse.response);
        }
        catch(error){
            console.error("error while sending email",error);
            
            return res.status(500).json({
                success:false,
                message:"error Occurred",
                error:error.message,
            });
        }
    
        return res.status(200).json({
            success:true,
            message:"Password Changed Successfully",
        });
   }
   catch(error){
    console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
	    });
   }
}