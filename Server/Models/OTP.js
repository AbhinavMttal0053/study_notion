const mongoose = require("mongoose");
const mailSender = require("../Utils/mailSender");
const emailTemplate  = require("../mail/templates/emailVerificationTemplate")


const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expiresIn:5*60,
    }
});

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,
            "verification Email from StudyNotion",
            emailTemplate(otp)
        );
        console.log("email sent successfully",mailResponse);

    }catch(error){
        console.log("error occurred while sending email",error);
    }

}

OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});



module.exports = mongoose.model("OTP",OTPSchema)